import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { learnContentRoute, learnRoute } from '@/lib/shared';

const { rewrite: rewriteLearn } = rewritePath(
  `${learnRoute}{/*path}`,
  `${learnContentRoute}{/*path}`,
);

export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLearn(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}
