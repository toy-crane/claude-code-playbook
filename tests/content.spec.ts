// Per-page E2E verification for every lesson.
// - Status 200
// - <h1> matches frontmatter title
// - All original `##`/`###` headings appear in rendered HTML
// - No console errors
// - No horizontal overflow at 1280px
// - Screenshot saved under .playwright/screenshots/<slug>.png

import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import matter from 'gray-matter';

const CONTENT = join(process.cwd(), 'content/docs');

type Page = {
  slugs: string[];       // e.g. ["starting-conversations", "llm-basics", "llm-fundamentals"]
  url: string;           // e.g. "/docs/starting-conversations/llm-basics/llm-fundamentals"
  title: string;
  description?: string;
  isPublic: boolean;
  headings: string[];    // "## " / "### " headings from body
  imageCount: number;    // ![]() occurrences pointing to local assets
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

function extractHeadings(body: string): string[] {
  const lines = body.split('\n');
  const headings: string[] = [];
  let inCodeFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const m = line.match(/^(##+)\s+(.+?)\s*$/);
    if (m) headings.push(m[2].replace(/`/g, ''));
  }
  return headings;
}

function countImages(body: string): number {
  return (body.match(/!\[[^\]]*\]\(\.?\/?attachments\//g) ?? []).length;
}

function discover(): Page[] {
  const files = walk(CONTENT);
  return files.map((file) => {
    const rel = relative(CONTENT, file).replace(/\.mdx$/, '');
    const parts = rel.split(sep);
    const slugs = parts[parts.length - 1] === 'index' ? parts.slice(0, -1) : parts;
    const url = `/docs${slugs.length ? '/' + slugs.join('/') : ''}`;
    const raw = readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    return {
      slugs,
      url,
      title: String(data.title ?? ''),
      description: data.description as string | undefined,
      isPublic: data.public !== false,
      headings: extractHeadings(content),
      imageCount: countImages(content),
    };
  }).filter((p) => p.isPublic);
}

const pages = discover();

test.describe('Content pages', () => {
  for (const page of pages) {
    const testName = page.url;
    test(testName, async ({ page: browser }) => {
      const consoleErrors: string[] = [];
      browser.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      const pageErrors: string[] = [];
      browser.on('pageerror', (err) => pageErrors.push(err.message));

      const resp = await browser.goto(page.url, { waitUntil: 'domcontentloaded' });
      expect(resp?.status(), 'HTTP status').toBe(200);

      if (page.title) {
        const h1Text = (await browser.locator('h1').first().textContent())?.trim();
        expect(h1Text, '<h1> text').toBe(page.title);
      }

      // Check all body headings appear visibly on the page
      for (const heading of page.headings) {
        const first = browser.getByText(heading, { exact: false }).first();
        await expect(first, `heading "${heading}" visible`).toBeVisible({ timeout: 5_000 });
      }

      // Image count: rendered <img> (local) >= expected count
      if (page.imageCount > 0) {
        const imgLocators = browser.locator('img[src*="/_next/image"], img[src*="/assets/"]');
        const count = await imgLocators.count();
        expect(count, 'local image count').toBeGreaterThanOrEqual(page.imageCount);
      }

      // No horizontal overflow at 1280px viewport
      const overflow = await browser.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, 'horizontal overflow').toBe(false);

      // Screenshot
      const shotPath = `.playwright/screenshots/${page.slugs.join('/') || 'index'}.png`;
      await browser.screenshot({ path: shotPath, fullPage: true });

      expect(consoleErrors, 'console errors').toEqual([]);
      expect(pageErrors, 'page errors').toEqual([]);
    });
  }
});
