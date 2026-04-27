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
  const path = page.slugs.length > 0 ? `/${page.slugs.join('/')}` : '';

  return {
    url: `${learnRoute}${path}.mdx`,
  };
}
