import { describe, expect, it } from 'vitest';
import { getPageMarkdownUrl } from './page-url';

const mockPage = (slugs: string[]) => ({ slugs });

describe('getPageMarkdownUrl', () => {
  it('단일 슬러그를 /learn/<slug>.mdx URL로 변환', () => {
    const result = getPageMarkdownUrl(mockPage(['starting-conversations']));
    expect(result.segments).toEqual(['starting-conversations']);
    expect(result.url).toBe('/learn/starting-conversations.mdx');
  });

  it('중첩 슬러그를 /learn/<...>/<slug>.mdx URL로 변환', () => {
    const result = getPageMarkdownUrl(
      mockPage(['extending-claude', 'execution-control', 'hooks']),
    );
    expect(result.segments).toEqual([
      'extending-claude',
      'execution-control',
      'hooks',
    ]);
    expect(result.url).toBe(
      '/learn/extending-claude/execution-control/hooks.mdx',
    );
  });

  it('빈 슬러그(root index)는 /learn.mdx 반환', () => {
    const result = getPageMarkdownUrl(mockPage([]));
    expect(result.segments).toEqual([]);
    expect(result.url).toBe('/learn.mdx');
  });

  it('segments에 "content.md" 트레일링 마커가 없어야 함 (regression guard)', () => {
    const result = getPageMarkdownUrl(mockPage(['foo', 'bar']));
    expect(result.segments).not.toContain('content.md');
    expect(result.url).not.toContain('content.md');
  });
});
