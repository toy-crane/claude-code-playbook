#!/usr/bin/env tsx
// One-time migration: source/ (Obsidian-style Markdown) → content/docs/ (Fumadocs MDX).
// Usage:
//   bun scripts/migrate.ts                 # migrate everything
//   bun scripts/migrate.ts --part=starting-conversations
//   bun scripts/migrate.ts --part=extending-claude
//   bun scripts/migrate.ts --part=completing-projects

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import matter from 'gray-matter';

const ROOT = new URL('..', import.meta.url).pathname;
const SOURCE = join(ROOT, 'source');
const DEST = join(ROOT, 'content/docs');

const PART_DIRS = [
  'part-01-starting-conversations',
  'part-02-extending-claude',
  'part-03-completing-projects',
];

// Top-level content files (from source/ root) → destination (under content/docs/)
const TOPLEVEL_MAP: Record<string, string> = {
  'overview.md': 'index',
  'prerequisites.md': 'prerequisites',
  'references.md': 'references',
  'wrap-up.md': 'wrap-up',
};

// Fallback titles for top-level files that lack frontmatter titles.
const TOPLEVEL_TITLES: Record<string, string> = {
  'references.md': '참고 자료',
};

// Obsidian/Publish frontmatter keys we don't need in Fumadocs
const DROP_FM = new Set(['status', 'aliases', 'tags', 'permalink', 'date']);

// Strip "part-NN-" / "chapter-NN-" / "lesson-NN-" numeric prefix for SEO-friendly slugs.
function seoSlug(name: string): string {
  return name.replace(/^(part|chapter|lesson)-\d+-/, '');
}

type LessonEntry = {
  srcPath: string;      // absolute path to source .md
  destPath: string;     // "starting-conversations/llm-basics/llm-fundamentals" (no extension, relative to content/docs)
  oldSlug: string;      // "lesson-02-tool-use-and-agent" (filename without .md)
  title: string;
};

function loadFrontmatter(srcPath: string): Record<string, unknown> {
  const { data } = matter(readFileSync(srcPath, 'utf8'));
  return data;
}

function buildIndex(): Map<string, LessonEntry> {
  const index = new Map<string, LessonEntry>();

  // Lessons inside parts/chapters
  for (const partDir of PART_DIRS) {
    const partFull = join(SOURCE, partDir);
    if (!existsSync(partFull)) continue;
    const partSlug = seoSlug(partDir);
    for (const chapDir of readdirSync(partFull)) {
      const chapFull = join(partFull, chapDir);
      if (!statSync(chapFull).isDirectory()) continue;
      if (chapDir === 'attachments') continue;
      const chapSlug = seoSlug(chapDir);
      for (const file of readdirSync(chapFull)) {
        if (!file.endsWith('.md')) continue;
        const srcPath = join(chapFull, file);
        const oldSlug = file.replace(/\.md$/, '');
        const newSlug = seoSlug(oldSlug);
        const destPath = `${partSlug}/${chapSlug}/${newSlug}`;
        const fm = loadFrontmatter(srcPath);
        index.set(oldSlug, { srcPath, destPath, oldSlug, title: String(fm.title ?? newSlug) });
      }
    }
  }

  // Top-level content files
  for (const [src, destName] of Object.entries(TOPLEVEL_MAP)) {
    const srcPath = join(SOURCE, src);
    if (!existsSync(srcPath)) continue;
    const oldSlug = src.replace(/\.md$/, '');
    const fm = loadFrontmatter(srcPath);
    const title = String(fm.title ?? TOPLEVEL_TITLES[src] ?? destName);
    index.set(oldSlug, { srcPath, destPath: destName, oldSlug, title });
  }

  return index;
}

function relLink(from: string, to: string): string {
  // from and to are paths like "starting-conversations/llm-basics/llm-fundamentals"
  const fromDir = dirname(from);
  let rel = relative(fromDir, to).split(sep).join('/');
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

function convertBody(body: string, index: Map<string, LessonEntry>, currentDest: string, srcDir: string, warnings: string[]): string {
  let out = body;

  // 1. Wikilinks with alias: [[target|text]] → [text](./path)
  out = out.replace(/\[\[([^\]|\n]+)\|([^\]\n]+)\]\]/g, (_, target, text) => {
    const entry = index.get(target.trim());
    if (!entry) {
      warnings.push(`[${currentDest}] missing wikilink target: ${target.trim()}`);
      return `[${text.trim()}](./${target.trim()})`;
    }
    return `[${text.trim()}](${relLink(currentDest, entry.destPath)})`;
  });

  // 2. Plain wikilinks: [[target]] → [title](./path)
  out = out.replace(/\[\[([^\]\n]+)\]\]/g, (_, target) => {
    const entry = index.get(target.trim());
    if (!entry) {
      warnings.push(`[${currentDest}] missing wikilink target: ${target.trim()}`);
      return `[${target.trim()}](./${target.trim()})`;
    }
    return `[${entry.title}](${relLink(currentDest, entry.destPath)})`;
  });

  // 3. Obsidian callouts: > [!note] → > [!NOTE]
  out = out.replace(/^(\s*>\s*)\[!(\w+)\]/gm, (_, p, tag) => `${p}[!${tag.toUpperCase()}]`);

  // 4. Image paths: attachments/foo.png → ./attachments/foo.png (with existence check)
  out = out.replace(/!\[([^\]]*)\]\(attachments\/([^)]+)\)/g, (match, alt, imgPath) => {
    const imgFull = join(srcDir, 'attachments', imgPath);
    if (!existsSync(imgFull)) {
      warnings.push(`[${currentDest}] missing image: attachments/${imgPath}`);
      return `{/* MISSING IMAGE: attachments/${imgPath} */}`;
    }
    return `![${alt}](./attachments/${imgPath})`;
  });

  return out;
}

function cleanFrontmatter(fm: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fm)) {
    if (!DROP_FM.has(k)) cleaned[k] = v;
  }
  if (cleaned.public === undefined) cleaned.public = true;
  return cleaned;
}

function convertFile(entry: LessonEntry, index: Map<string, LessonEntry>, warnings: string[]): void {
  const raw = readFileSync(entry.srcPath, 'utf8');
  const { data, content } = matter(raw);
  const cleaned = cleanFrontmatter(data);
  // Fumadocs requires `title`; fall back to a sensible default if missing.
  if (!cleaned.title) {
    cleaned.title = entry.title || entry.oldSlug;
  }
  const srcDir = dirname(entry.srcPath);
  const body = convertBody(content, index, entry.destPath, srcDir, warnings);
  const output = matter.stringify(body, cleaned);
  const destFull = join(DEST, `${entry.destPath}.mdx`);
  mkdirSync(dirname(destFull), { recursive: true });
  writeFileSync(destFull, output);
}

function copyAttachments(filter?: string): void {
  // Top-level attachments (referenced by overview/prerequisites/references/wrap-up) — always copy
  const rootAttSrc = join(SOURCE, 'attachments');
  if (existsSync(rootAttSrc)) {
    const rootAttDest = join(DEST, 'attachments');
    mkdirSync(rootAttDest, { recursive: true });
    for (const file of readdirSync(rootAttSrc)) {
      copyFileSync(join(rootAttSrc, file), join(rootAttDest, file));
    }
  }

  // Per-chapter attachments
  for (const partDir of PART_DIRS) {
    const partFull = join(SOURCE, partDir);
    if (!existsSync(partFull)) continue;
    const partSlug = seoSlug(partDir);
    if (filter && partSlug !== filter) continue;
    for (const chapDir of readdirSync(partFull)) {
      const chapFull = join(partFull, chapDir);
      if (!statSync(chapFull).isDirectory()) continue;
      if (chapDir === 'attachments') continue;
      const attDir = join(chapFull, 'attachments');
      if (!existsSync(attDir)) continue;
      const chapSlug = seoSlug(chapDir);
      const destAtt = join(DEST, partSlug, chapSlug, 'attachments');
      mkdirSync(destAtt, { recursive: true });
      for (const file of readdirSync(attDir)) {
        copyFileSync(join(attDir, file), join(destAtt, file));
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  const partArg = args.find((a) => a.startsWith('--part='))?.slice(7);

  const index = buildIndex();
  console.log(`Indexed ${index.size} pages.\n`);

  const warnings: string[] = [];
  let count = 0;
  for (const entry of index.values()) {
    if (partArg && !entry.destPath.startsWith(partArg + '/') && !isTopLevel(entry.destPath)) continue;
    convertFile(entry, index, warnings);
    count++;
    console.log(`  ✓ ${entry.destPath}.mdx`);
  }

  copyAttachments(partArg);

  console.log(`\nMigrated ${count} pages.`);
  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`  • ${w}`));
  }
}

function isTopLevel(destPath: string): boolean {
  return !destPath.includes('/');
}

main();
