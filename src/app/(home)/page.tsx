import Link from 'next/link';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

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
    <div className="flex flex-col justify-center text-center flex-1 px-4 py-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{appName}</h1>
      <p className="text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/docs"
          className="inline-flex items-center px-6 py-3 rounded-md bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          강의 시작하기
        </Link>
        <Link
          href="/docs/prerequisites"
          className="inline-flex items-center px-6 py-3 rounded-md border border-fd-border font-medium hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          사전 준비사항
        </Link>
      </div>
    </div>
  );
}
