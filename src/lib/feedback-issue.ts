const LEARN_PREFIX = '/learn/';

function shortenPath(url: string): string {
  if (url === '/learn') return '/';
  if (url.startsWith(LEARN_PREFIX)) return url.slice(LEARN_PREFIX.length);
  return url;
}

export function buildIssueTitle(url: string, title: string): string {
  return `[피드백] ${shortenPath(url)} — ${title}`;
}

export function buildIssueBody(url: string, title: string, message: string): string {
  return [
    '> Forwarded from user feedback.',
    '>',
    `> Page: \`${url}\``,
    `> Title: ${title}`,
    '',
    message,
  ].join('\n');
}
