# Claude Code, 제대로 배우기

한국어 Claude Code 강의 사이트. [Fumadocs](https://fumadocs.dev) (Next.js + MDX) 기반 자가 호스팅.

- Production: https://docs.claude-hunt.com
- Content: `content/docs/` (MDX)
- 상세 컨벤션 / 폴더 구조 / 커밋 정책: [`CLAUDE.md`](./CLAUDE.md)

## 개발

```bash
bun install
bun run dev       # localhost:3000/learn
```

## 주요 스크립트

| 명령                              | 설명                                                |
| --------------------------------- | --------------------------------------------------- |
| `bun run dev`                     | 개발 서버                                           |
| `bun run build`                   | 프로덕션 빌드                                       |
| `bun run types:check`             | `fumadocs-mdx` 생성 + `next typegen` + `tsc --noEmit` |
| `bun run lint`                    | ESLint                                              |
| `bun run lint:links`              | MDX 내부 링크 검증 (pre-push hook 에서 자동 실행)     |
| `bunx playwright test`            | E2E 전수 검사 + 스크린샷                             |

## 핵심 파일

- `content/docs/` — 강의 콘텐츠 MDX (편집 주 장소)
- `src/lib/source.ts` — Fumadocs loader, `public: false` 필터
- `src/lib/shared.ts` — `siteUrl` / `appName` / 라우트 상수 SSOT
- `source.config.ts` — MDX frontmatter 스키마
- `src/app/learn/[[...slug]]/page.tsx` — 문서 페이지 + metadata
- `src/app/og/learn/[...slug]/route.tsx` — OG 이미지 동적 생성
