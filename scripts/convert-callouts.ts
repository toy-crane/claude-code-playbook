#!/usr/bin/env bun
// One-time conversion: Obsidian/GFM `> [!TYPE]` blockquote callouts →
// Fumadocs `<Callout>` JSX. The current source.config.ts does not wire a GFM
// alert plugin, so `[!TYPE]` currently leaks as literal text. Fumadocs ships
// its own `<Callout>` (auto-registered via src/components/mdx.tsx), which is
// the official pattern used throughout Fumadocs' own docs.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content/docs');

function findMdx(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.mdx'))
    .map((d) => relative(CONTENT, join(d.parentPath, d.name)))
    .sort();
}

// GFM / Obsidian source type → Fumadocs <Callout type="..."> value.
// See node_modules/fumadocs-ui/dist/components/callout.d.ts:5 for the
// allowed values: 'info' | 'warn' | 'error' | 'success' | 'warning' | 'idea'.
const TYPE_MAP: Record<string, string> = {
  NOTE: 'info',
  INFO: 'info',
  TIP: 'idea',
  WARNING: 'warn',
};

const CALLOUT_HEAD = /^>\s*\[!([A-Z]+)\]\s*(.*)$/;
const FENCE = /^```/;

function escapeJsxAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

function convertFile(raw: string, rel: string): { out: string; converted: number; warnings: string[] } {
  const lines = raw.split('\n');
  const out: string[] = [];
  const warnings: string[] = [];
  let converted = 0;
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (FENCE.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    const m = line.match(CALLOUT_HEAD);
    if (!m) {
      out.push(line);
      continue;
    }

    const rawType = m[1];
    const title = m[2].trim();
    const mapped = TYPE_MAP[rawType];

    if (!mapped) {
      warnings.push(`${rel}:${i + 1}: unknown callout type [!${rawType}] — left untouched`);
      out.push(line);
      continue;
    }

    // Collect continuation body lines (must start with `>`).
    const body: string[] = [];
    let j = i + 1;
    while (j < lines.length) {
      const next = lines[j];
      if (!next.startsWith('>')) break;
      // Strip leading `> ` or `>` prefix.
      body.push(next.replace(/^>\s?/, ''));
      j++;
    }

    // Build JSX.
    const typeAttr = `type="${mapped}"`;
    const titleAttr = title ? ` title="${escapeJsxAttr(title)}"` : '';
    const bodyText = body.join('\n').replace(/\s+$/, '');

    if (bodyText === '') {
      out.push(`<Callout ${typeAttr}${titleAttr} />`);
    } else {
      out.push(`<Callout ${typeAttr}${titleAttr}>`);
      out.push(bodyText);
      out.push('</Callout>');
    }

    converted++;
    i = j - 1; // continue after the consumed body lines
  }

  return { out: out.join('\n'), converted, warnings };
}

const files = findMdx(CONTENT);

let totalConverted = 0;
let filesModified = 0;
const allWarnings: string[] = [];

for (const rel of files) {
  const abs = join(CONTENT, rel);
  const raw = readFileSync(abs, 'utf8');
  const { out, converted, warnings } = convertFile(raw, rel);
  allWarnings.push(...warnings);

  if (converted > 0 && out !== raw) {
    writeFileSync(abs, out);
    filesModified++;
    totalConverted += converted;
  }
}

console.log(`Converted ${totalConverted} callouts across ${filesModified} files.`);
if (allWarnings.length) {
  console.log(`\nWarnings (${allWarnings.length}):`);
  for (const w of allWarnings) console.log(`  - ${w}`);
}
