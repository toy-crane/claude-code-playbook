import { execSync } from 'node:child_process';
import { Octokit } from 'octokit';
import { gitConfig } from '../src/lib/shared';
import { buildIssueTitle } from '../src/lib/feedback-issue';

function getGhToken(): string {
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch (e) {
    throw new Error(
      'Failed to read `gh auth token`. Run `gh auth login` first.\n' +
        (e as Error).message,
    );
  }
}

async function getOctokit(): Promise<Octokit> {
  return new Octokit({ auth: getGhToken() });
}

const DOCS_CATEGORY = 'Docs Feedback';
const FEEDBACK_LABEL = 'feedback';
const MIGRATED_LABEL = 'migrated';

interface DiscussionComment {
  id: string;
  body: string;
  createdAt: string;
  author: { login: string } | null;
}

interface Discussion {
  id: string;
  number: number;
  title: string;
  body: string;
  url: string;
  createdAt: string;
  author: { login: string } | null;
  comments: { nodes: DiscussionComment[] };
}

interface DiscussionsPage {
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  nodes: Discussion[];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
  return { dryRun, limit };
}

async function findCategoryId(octokit: Awaited<ReturnType<typeof getOctokit>>) {
  const result: {
    repository: { discussionCategories: { nodes: { id: string; name: string }[] } };
  } = await octokit.graphql(`
    query {
      repository(owner: "${gitConfig.user}", name: "${gitConfig.repo}") {
        discussionCategories(first: 25) {
          nodes { id name }
        }
      }
    }
  `);

  const category = result.repository.discussionCategories.nodes.find(
    (c) => c.name === DOCS_CATEGORY,
  );
  if (!category) {
    throw new Error(`Category "${DOCS_CATEGORY}" not found.`);
  }
  return category.id;
}

async function* iterateDiscussions(
  octokit: Awaited<ReturnType<typeof getOctokit>>,
  categoryId: string,
): AsyncGenerator<Discussion> {
  let cursor: string | null = null;
  while (true) {
    const result: { repository: { discussions: DiscussionsPage } } = await octokit.graphql(
      `
      query($categoryId: ID!, $cursor: String) {
        repository(owner: "${gitConfig.user}", name: "${gitConfig.repo}") {
          discussions(first: 50, after: $cursor, categoryId: $categoryId, states: OPEN) {
            pageInfo { hasNextPage endCursor }
            nodes {
              id
              number
              title
              body
              url
              createdAt
              author { login }
              comments(first: 100) {
                nodes {
                  id
                  body
                  createdAt
                  author { login }
                }
              }
            }
          }
        }
      }
      `,
      { categoryId, cursor },
    );

    for (const node of result.repository.discussions.nodes) {
      yield node;
    }

    if (!result.repository.discussions.pageInfo.hasNextPage) break;
    cursor = result.repository.discussions.pageInfo.endCursor;
  }
}

function pageIdFromTitle(title: string): string | null {
  const match = title.match(/^Feedback for (.+)$/);
  return match ? match[1] : null;
}

function buildMigratedIssueTitle(discussion: Discussion): string {
  const pageId = pageIdFromTitle(discussion.title);
  if (pageId) {
    return `${buildIssueTitle(pageId, '(legacy)')} (migrated)`;
  }
  return `[피드백] ${discussion.title} (migrated)`;
}

function buildMigratedIssueBody(discussion: Discussion): string {
  const pageId = pageIdFromTitle(discussion.title);
  const meta = [
    `> Migrated from Discussion ${discussion.url}`,
    `> Originally created at ${discussion.createdAt} by @${discussion.author?.login ?? 'unknown'}`,
  ];
  if (pageId) {
    meta.push(`> Page: \`${pageId}\``);
  }
  return [...meta, '', discussion.body || '_(no body)_'].join('\n');
}

function buildMigratedCommentBody(comment: DiscussionComment): string {
  const header = `> @${comment.author?.login ?? 'unknown'} commented on ${comment.createdAt} (migrated)`;
  return `${header}\n\n${comment.body}`;
}

async function ensureLabel(
  octokit: Awaited<ReturnType<typeof getOctokit>>,
  name: string,
) {
  try {
    await octokit.rest.issues.getLabel({
      owner: gitConfig.user,
      repo: gitConfig.repo,
      name,
    });
  } catch (e: unknown) {
    if ((e as { status?: number }).status === 404) {
      await octokit.rest.issues.createLabel({
        owner: gitConfig.user,
        repo: gitConfig.repo,
        name,
      });
    } else {
      throw e;
    }
  }
}

async function migrateOne(
  octokit: Awaited<ReturnType<typeof getOctokit>>,
  discussion: Discussion,
  dryRun: boolean,
): Promise<{ issueUrl?: string; commentCount: number }> {
  const title = buildMigratedIssueTitle(discussion);
  const body = buildMigratedIssueBody(discussion);
  const comments = discussion.comments.nodes;

  if (dryRun) {
    console.log(`  [dry-run] would create issue: ${title}`);
    console.log(`  [dry-run] would migrate ${comments.length} comment(s)`);
    console.log(`  [dry-run] would close discussion ${discussion.url}`);
    return { commentCount: comments.length };
  }

  const { data: issue } = await octokit.rest.issues.create({
    owner: gitConfig.user,
    repo: gitConfig.repo,
    title,
    body,
    labels: [FEEDBACK_LABEL, MIGRATED_LABEL],
  });

  for (const comment of comments) {
    await octokit.rest.issues.createComment({
      owner: gitConfig.user,
      repo: gitConfig.repo,
      issue_number: issue.number,
      body: buildMigratedCommentBody(comment),
    });
  }

  await octokit.graphql(`
    mutation {
      closeDiscussion(input: { discussionId: "${discussion.id}", reason: OUTDATED }) {
        discussion { id }
      }
    }
  `);

  return { issueUrl: issue.html_url, commentCount: comments.length };
}

async function main() {
  const { dryRun, limit } = parseArgs();
  console.log(`Migration mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  if (Number.isFinite(limit)) console.log(`Limit: ${limit}`);

  const octokit = await getOctokit();
  const categoryId = await findCategoryId(octokit);
  console.log(`Found category "${DOCS_CATEGORY}" (id: ${categoryId})`);

  if (!dryRun) {
    await ensureLabel(octokit, FEEDBACK_LABEL);
    await ensureLabel(octokit, MIGRATED_LABEL);
  }

  let processed = 0;
  let totalComments = 0;
  for await (const discussion of iterateDiscussions(octokit, categoryId)) {
    if (processed >= limit) break;
    processed++;
    console.log(`\n[${processed}] ${discussion.title}  (${discussion.url})`);
    try {
      const { issueUrl, commentCount } = await migrateOne(octokit, discussion, dryRun);
      totalComments += commentCount;
      if (issueUrl) console.log(`  → ${issueUrl}`);
    } catch (e) {
      console.error(`  failed: ${(e as Error).message}`);
    }
  }

  console.log(`\nDone. Discussions: ${processed}, comments migrated: ${totalComments}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
