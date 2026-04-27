import { describe, expect, it } from 'vitest';
import { getPageMarkdownUrl } from './page-url';

const mockPage = (slugs: string[]) => ({ slugs });

describe('getPageMarkdownUrl', () => {
  it('단일 슬러그를 /learn/<slug>.mdx URL로 변환', () => {
    const result = getPageMarkdownUrl(mockPage(['starting-conversations']));
    expect(result.url).toBe('/learn/starting-conversations.mdx');
  });

  it('중첩 슬러그를 /learn/<...>/<slug>.mdx URL로 변환', () => {
    const result = getPageMarkdownUrl(
      mockPage(['extending-claude', 'execution-control', 'hooks']),
    );
    expect(result.url).toBe(
      '/learn/extending-claude/execution-control/hooks.mdx',
    );
  });

  it('빈 슬러그(root index)는 /learn.mdx 반환', () => {
    const result = getPageMarkdownUrl(mockPage([]));
    expect(result.url).toBe('/learn.mdx');
  });
});
