import { docs } from 'collections/server';
import { type InferPageType, loader, update } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { learnRoute } from './shared';

export { getPageImage, getPageMarkdownUrl } from './page-url';

// `public: false` frontmatter hides a page entirely (build, nav, search, URL).
const filteredSource = update(docs.toFumadocsSource())
  .files((files) =>
    files.filter((file) => {
      if (file.type === 'meta') return true;
      return file.data.public !== false;
    }),
  )
  .build();

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: learnRoute,
  source: filteredSource,
  plugins: [lucideIconsPlugin()],
});

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
