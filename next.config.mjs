import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/docs/:path*', destination: '/learn/:path*', permanent: true },
      { source: '/og/docs/:path*', destination: '/og/learn/:path*', permanent: true },
      { source: '/llms.mdx/docs/:path*', destination: '/llms.mdx/learn/:path*', permanent: true },
    ];
  },
};

export default withMDX(config);
