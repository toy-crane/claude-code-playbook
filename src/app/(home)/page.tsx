import type { Metadata } from 'next';
import { appName } from '@/lib/shared';
import { Hero } from './_components/hero';
import { Pillars } from './_components/pillars';
import { Projects } from './_components/projects';
import { Subscribe } from './_components/subscribe';

const description = '손으로 익히는 Claude Code 실전 가이드';

export const metadata: Metadata = {
  title: appName,
  description,
  openGraph: {
    title: appName,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Projects />
      <Subscribe />
    </>
  );
}
