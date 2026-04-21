import { readFile } from 'node:fs/promises';
import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
import { source } from '../src/lib/source';

type Page = ReturnType<typeof source.getPages>[number];

async function getFiles(pages: Page[]): Promise<FileObject[]> {
  return Promise.all(
    pages
      .filter((page): page is Page & { absolutePath: string } =>
        Boolean(page.absolutePath),
      )
      .map(async (page) => ({
        path: page.absolutePath,
        content: await readFile(page.absolutePath, 'utf8'),
        url: page.url,
        data: page.data,
      })),
  );
}

function getHeadings(page: Page): string[] {
  const toc = (page.data.toc ?? []) as Array<{ url: string }>;
  return toc.map((item) => item.url.replace(/^#/, ''));
}

async function checkLinks() {
  const pages = source.getPages();

  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      'docs/[[...slug]]': pages.map((page) => ({
        value: { slug: page.slugs },
        hashes: getHeadings(page),
      })),
    },
  });

  const errors = await validateFiles(await getFiles(pages), {
    scanned,
    checkRelativePaths: 'as-url',
  });

  printErrors(errors, true);
}

checkLinks().catch((err) => {
  console.error(err);
  process.exit(1);
});
