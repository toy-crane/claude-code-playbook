import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { appName } from '@/lib/shared';
import { loadOGFonts } from '@/lib/og/font';
import { LessonOG } from '@/lib/og/lesson';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? '';
  const fonts = await loadOGFonts(`${appName}${title}${description}`);

  return new ImageResponse(
    <LessonOG brand={appName} title={title} description={description} />,
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
