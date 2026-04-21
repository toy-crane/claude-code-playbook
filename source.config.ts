import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      public: z.boolean().default(true),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // CommonMark 의 flanking delimiter 규칙은 `**영문(한글)**조사` 패턴에서
    // 닫는 `**` 가 ASCII 구두점 뒤 + CJK 문자 앞에 오면 강조를 닫지 못한다.
    // CommonMark-next 에 제안된 CJK emphasis 확장을 적용해 전역 해결.
    // 참고: https://github.com/tats-u/markdown-cjk-friendly
    remarkPlugins: (v) => [
      remarkCjkFriendly,
      remarkCjkFriendlyGfmStrikethrough,
      ...v,
    ],
  },
});
