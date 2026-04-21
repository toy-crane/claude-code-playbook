import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Noto_Sans_KR } from 'next/font/google';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/shared';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={notoSansKR.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
