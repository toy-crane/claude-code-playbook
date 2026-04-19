#!/usr/bin/env tsx
// Generate content/docs/**/meta.json based on the original source/ ordering.
// Produces Korean titles for parts/chapters. Lesson order preserved from
// filename numeric prefix (lesson-01 < lesson-02 ...).

import { readdirSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SOURCE = join(ROOT, 'source');
const DEST = join(ROOT, 'content/docs');

const PART_TITLES: Record<string, string> = {
  'starting-conversations': 'Part 1 · 대화 시작하기',
  'extending-claude': 'Part 2 · Claude 확장하기',
  'completing-projects': 'Part 3 · 프로젝트 완성하기',
};

const CHAPTER_TITLES: Record<string, string> = {
  'llm-basics': 'Chapter 1 · LLM 기초',
  'getting-started': 'Chapter 2 · 시작하기',
  'context-management': 'Chapter 3 · 컨텍스트 관리',
  'todo-app': 'Chapter 4 · Todo 앱 만들기',
  'plan-task': 'Chapter 5 · Plan과 Task',
  'adding-knowledge': 'Chapter 6 · 지식 더하기',
  'external-connection': 'Chapter 7 · 외부 연결',
  'execution-control': 'Chapter 8 · 실행 제어',
  'spec-driven-development': 'Chapter 9 · 스펙 주도 개발',
  'parallel-work': 'Chapter 10 · 병렬 작업',
  'personal-project': 'Chapter 11 · 개인 프로젝트',
};

const PART_SOURCE: Record<string, string> = {
  'starting-conversations': 'part-01-starting-conversations',
  'extending-claude': 'part-02-extending-claude',
  'completing-projects': 'part-03-completing-projects',
};

function seoSlug(name: string): string {
  return name.replace(/^(part|chapter|lesson)-\d+-/, '');
}

// Sort by the original numeric prefix so lesson order matches the source.
function orderedNames(dir: string, isLesson: boolean): string[] {
  return readdirSync(dir)
    .filter((name) => {
      const p = join(dir, name);
      if (isLesson) return name.endsWith('.md');
      return statSync(p).isDirectory() && name !== 'attachments';
    })
    .sort();
}

function writeJSON(path: string, data: unknown): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(`  ✓ ${path.replace(ROOT, '')}`);
}

function main() {
  // Root meta.json
  writeJSON(join(DEST, 'meta.json'), {
    title: 'Claude Code 강의',
    pages: [
      'index',
      'prerequisites',
      '---Part 1 · 대화 시작하기---',
      'starting-conversations',
      '---Part 2 · Claude 확장하기---',
      'extending-claude',
      '---Part 3 · 프로젝트 완성하기---',
      'completing-projects',
      'wrap-up',
      'references',
    ],
  });

  // Per-part meta.json
  for (const [partSlug, srcName] of Object.entries(PART_SOURCE)) {
    const partSrcDir = join(SOURCE, srcName);
    const chapters = orderedNames(partSrcDir, false);
    const orderedChapSlugs = chapters.map(seoSlug);
    writeJSON(join(DEST, partSlug, 'meta.json'), {
      title: PART_TITLES[partSlug],
      pages: orderedChapSlugs,
    });

    // Per-chapter meta.json
    for (const chap of chapters) {
      const chapSrcDir = join(partSrcDir, chap);
      const chapSlug = seoSlug(chap);
      const lessons = orderedNames(chapSrcDir, true).map((f) => seoSlug(f.replace(/\.md$/, '')));
      writeJSON(join(DEST, partSlug, chapSlug, 'meta.json'), {
        title: CHAPTER_TITLES[chapSlug] ?? chapSlug,
        pages: lessons,
      });
    }
  }
}

main();
