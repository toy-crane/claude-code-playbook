#!/usr/bin/env bun
// One-time cleanup: remove the first body-level `# title` line from every MDX.
// Fumadocs already renders <h1> from frontmatter `title`; keeping it in the
// body causes the title to render twice. Safe only when frontmatter `title`
// matches the H1 text exactly — otherwise skip and warn for manual review.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Glob } from 'bun';
import matter from 'gray-matter';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content/docs');

const files = [...new Glob('**/*.mdx').scanSync({ cwd: CONTENT })].sort();

let modified = 0;
let skipped = 0;
const warnings: string[] = [];

// Split `---\n...\n---\n` frontmatter from the body while preserving the exact
// frontmatter bytes (gray-matter's stringify would re-serialize and produce a
// noisy diff).
function splitFrontmatter(raw: string): { head: string; body: string } {
  if (!raw.startsWith('---\n')) return { head: '', body: raw };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { head: '', body: raw };
  return { head: raw.slice(0, end + 5), body: raw.slice(end + 5) };
}

for (const rel of files) {
  const abs = join(CONTENT, rel);
  const raw = readFileSync(abs, 'utf8');
  const { head, body } = splitFrontmatter(raw);
  const title = matter(raw).data.title;

  const lines = body.split('\n');
  let idx = 0;
  while (idx < lines.length && lines[idx].trim() === '') idx++;

  if (idx >= lines.length) {
    skipped++;
    continue;
  }

  const firstLine = lines[idx];
  if (!firstLine.startsWith('# ')) {
    skipped++;
    continue;
  }

  const h1Text = firstLine.slice(2).trim();
  if (h1Text !== title) {
    warnings.push(`${rel}: H1 "${h1Text}" != title "${title}" — skipped`);
    continue;
  }

  // Remove the H1 line and one trailing blank line if present.
  lines.splice(idx, 1);
  if (lines[idx] !== undefined && lines[idx].trim() === '') {
    lines.splice(idx, 1);
  }

  writeFileSync(abs, head + lines.join('\n'));
  modified++;
}

console.log(`Modified ${modified} files, skipped ${skipped} files.`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
