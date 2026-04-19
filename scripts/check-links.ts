#!/usr/bin/env tsx
// Scan every MDX file under content/docs and verify:
// - Relative links resolve to an existing .mdx (or index.mdx)
// - Image references resolve to an existing asset
// - Absolute /docs/... links resolve to an existing page
// External URLs (http/https) are skipped.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const CONTENT = join(ROOT, 'content/docs');

type Problem = {
  file: string;
  line: number;
  link: string;
  reason: string;
};

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.mdx')) out.push(p);
  }
  return out;
}

// All known page paths (absolute, without extension). e.g.
// /docs/starting-conversations/llm-basics/llm-fundamentals
function buildPageIndex(files: string[]): Set<string> {
  const pages = new Set<string>();
  for (const file of files) {
    let rel = file.slice(CONTENT.length + 1).replace(/\.mdx$/, '');
    if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
    if (rel === 'index') rel = '';
    const url = rel ? `/docs/${rel}` : '/docs';
    pages.add(url);
  }
  return pages;
}

function resolveRelLink(fileDir: string, href: string): string | null {
  // Strip hash/query
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return null; // pure anchor
  // Resolve relative path to absolute-under-content
  const resolved = resolve(fileDir, clean);
  return resolved;
}

function toUrl(abs: string): string {
  // abs is an absolute filesystem path under content/
  let rel = abs.slice(CONTENT.length + 1);
  rel = rel.replace(/\.mdx$/, '');
  if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
  if (rel === 'index') rel = '';
  return rel ? `/docs/${rel}` : '/docs';
}

const LINK_RE = /(!?)\[([^\]]*)\]\(([^)]+)\)/g;

function scan(file: string, pages: Set<string>, problems: Problem[]): void {
  const rel = file.slice(CONTENT.length + 1);
  const fileDir = dirname(file);
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s{0,3}```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    let m: RegExpExecArray | null;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(line))) {
      const isImage = m[1] === '!';
      const href = m[3].trim().replace(/^<|>$/g, '');
      if (!href) continue;
      if (href.startsWith('http://') || href.startsWith('https://')) continue;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      if (href.startsWith('#')) continue;

      if (isImage) {
        // Image: must exist as file (relative) or under /public (absolute)
        if (href.startsWith('/')) {
          // absolute — allow (static assets in public/)
          continue;
        }
        const abs = resolveRelLink(fileDir, href);
        if (!abs || !existsSync(abs)) {
          problems.push({ file: rel, line: i + 1, link: href, reason: 'missing image file' });
        }
        continue;
      }

      // Text link
      if (href.startsWith('/')) {
        // absolute URL
        const cleanUrl = href.split('#')[0].split('?')[0];
        if (cleanUrl.startsWith('/docs')) {
          if (!pages.has(cleanUrl.replace(/\/$/, ''))) {
            problems.push({ file: rel, line: i + 1, link: href, reason: 'unknown /docs URL' });
          }
        }
        // Other /foo urls skipped (may be public assets or routes we don't enumerate)
        continue;
      }
      // Relative path → must resolve to an mdx file
      const abs = resolveRelLink(fileDir, href);
      if (!abs) continue;
      const withExt = abs + '.mdx';
      const withIndex = join(abs, 'index.mdx');
      if (existsSync(abs) || existsSync(withExt) || existsSync(withIndex)) continue;
      problems.push({ file: rel, line: i + 1, link: href, reason: 'unknown relative target' });
    }
  }
}

function main() {
  const files = walk(CONTENT);
  const pages = buildPageIndex(files);
  const problems: Problem[] = [];
  for (const file of files) {
    scan(file, pages, problems);
  }

  if (problems.length === 0) {
    console.log(`✓ All links valid across ${files.length} pages.`);
    process.exit(0);
  }

  console.log(`✗ ${problems.length} link issue(s) across ${files.length} pages:\n`);
  for (const p of problems) {
    console.log(`  ${p.file}:${p.line}  ${p.link}`);
    console.log(`    → ${p.reason}`);
  }
  process.exit(1);
}

main();
