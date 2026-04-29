import { describe, expect, it } from 'vitest';
import { buildIssueBody, buildIssueTitle } from './feedback-issue';

describe('buildIssueTitle', () => {
  it('/learn/ 접두사를 제거하고 경로 + 제목을 결합', () => {
    const result = buildIssueTitle(
      '/learn/starting-conversations/context-management/memory',
      'Claude가 스스로 쓰는 관찰 노트 | Memory',
    );
    expect(result).toBe(
      '[피드백] starting-conversations/context-management/memory — Claude가 스스로 쓰는 관찰 노트 | Memory',
    );
  });

  it('단일 segment 경로도 처리', () => {
    const result = buildIssueTitle('/learn/intro', '시작하기');
    expect(result).toBe('[피드백] intro — 시작하기');
  });

  it('/learn/ 접두사가 없으면 경로를 그대로 사용', () => {
    const result = buildIssueTitle('/docs/foo/bar', '문서');
    expect(result).toBe('[피드백] /docs/foo/bar — 문서');
  });

  it('루트 /learn 경로는 빈 path로 표시', () => {
    const result = buildIssueTitle('/learn', '메인');
    expect(result).toBe('[피드백] / — 메인');
  });

  it('frontmatter title의 파이프(|) 같은 특수문자를 그대로 유지', () => {
    const result = buildIssueTitle(
      '/learn/foo',
      'Claude가 스스로 쓰는 관찰 노트 | Memory',
    );
    expect(result).toContain('Claude가 스스로 쓰는 관찰 노트 | Memory');
  });
});

describe('buildIssueBody', () => {
  it('메타데이터와 사용자 메시지를 분리해 본문 구성', () => {
    const body = buildIssueBody(
      '/learn/starting-conversations/context-management/memory',
      'Claude가 스스로 쓰는 관찰 노트 | Memory',
      '이 부분 설명이 부족합니다.',
    );

    expect(body).toContain('> Forwarded from user feedback.');
    expect(body).toContain(
      '> Page: `/learn/starting-conversations/context-management/memory`',
    );
    expect(body).toContain('> Title: Claude가 스스로 쓰는 관찰 노트 | Memory');
    expect(body).toContain('이 부분 설명이 부족합니다.');
  });

  it('메타 블록과 메시지 사이에 빈 줄이 들어감', () => {
    const body = buildIssueBody('/learn/foo', '제목', '메시지');
    expect(body).toMatch(/> Title: 제목\n\n메시지/);
  });
});
