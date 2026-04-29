import { App, Octokit } from 'octokit';
import {
  pageFeedback,
  type ActionResponse,
  type PageFeedback,
} from '@/components/feedback/schema';
import { gitConfig } from './shared';
import { buildIssueBody, buildIssueTitle } from './feedback-issue';

const FEEDBACK_LABEL = 'feedback';

let instance: Octokit | undefined;

export async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!appId || !privateKey) {
    throw new Error('No GitHub keys provided for Github app, docs feedback feature will not work.');
  }

  const app = new App({ appId, privateKey });

  const { data } = await app.octokit.request('GET /repos/{owner}/{repo}/installation', {
    owner: gitConfig.user,
    repo: gitConfig.repo,
    headers: { 'X-GitHub-Api-Version': '2022-11-28' },
  });

  instance = await app.getInstallationOctokit(data.id);
  return instance;
}

export async function onPageFeedbackAction(feedback: PageFeedback): Promise<ActionResponse> {
  'use server';
  const parsed = pageFeedback.parse(feedback);
  return createFeedbackIssue(parsed.url, parsed.title, parsed.message);
}

async function createFeedbackIssue(url: string, title: string, message: string) {
  const octokit = await getOctokit();

  const { data } = await octokit.rest.issues.create({
    owner: gitConfig.user,
    repo: gitConfig.repo,
    title: buildIssueTitle(url, title),
    body: buildIssueBody(url, title, message),
    labels: [FEEDBACK_LABEL],
  });

  return { githubUrl: data.html_url };
}
