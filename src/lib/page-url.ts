import { learnImageRoute, learnRoute } from './shared';

type PageLike = { slugs: string[] };

export function getPageImage(page: PageLike) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${learnImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: PageLike) {
  const segments = page.slugs;
  const path = segments.length > 0 ? `/${segments.join('/')}` : '';

  return {
    segments,
    url: `${learnRoute}${path}.mdx`,
  };
}
