# Claude Code Lecture — Fumadocs Site

## 개요

한국어 Claude Code 강의 사이트. Fumadocs (Next.js + MDX) 기반 자가 호스팅. Obsidian Publish 를 대체.

## 강의 타겟

개발자 2년차 이상, Cursor/Copilot 정도 다뤄 봄.

## 문체

한국어 prose 는 **합니다체** (`~합니다`, `~입니다`) 로 통일.

- 대상: frontmatter `description`, 본문 단락, 콜아웃(`<Callout>`) 내부, 서술형 리스트 항목
- 예외 (해라체 허용): heading, frontmatter `title`, 코드 펜스, 블록쿼트, 기능 요구사항 명세 리스트 ("사용자가 ~하면, ~된다" 형식)

## 폴더 구조

```
/
├── content/docs/     # Fumadocs 최종 콘텐츠 (MDX). 편집 주 장소.
│   ├── index.mdx     # 강의 개요
│   ├── meta.json     # 루트 네비 순서
│   ├── starting-conversations/   # Part 1
│   ├── extending-claude/         # Part 2
│   └── completing-projects/      # Part 3
├── scripts/          # 유틸 스크립트 (링크 검증 등)
├── src/              # Next.js src dir (Fumadocs 기본)
├── tests/            # Playwright E2E
└── .playwright/      # 테스트 스크린샷 (gitignored)
```

## 주요 명령

- `bun run dev` — 개발 서버 (`localhost:3000/docs`)
- `bun run build` — 프로덕션 빌드
- `bun run types:check` — 타입 검사 (`fumadocs-mdx` + `tsc`)
- `bunx playwright test` — E2E 전수 검사 + 스크린샷 생성
- `bunx playwright test --grep starting-conversations` — 파트별 실행

## 노출 관리

사이트에 노출하지 않을 페이지는 frontmatter 에 `public: false` 추가. `src/lib/source.ts` 의 Loader 필터가 input 레벨에서 차단 (빌드/네비/검색/URL 전부).

기본 `public: true`. 필드 없으면 공개.

사이드바 순서/숨김은 `meta.json` 의 `pages` 배열로 제어.

## SEO 슬러그 규칙

폴더/파일명에서 번호 접두사 제거:
- ✅ `starting-conversations/llm-basics/llm-fundamentals.mdx`
- ❌ `part-01-starting-conversations/chapter-01-llm-basics/lesson-01-llm-fundamentals.mdx`

순서는 `meta.json` 의 `pages` 배열에서 명시.

## 이미지

각 레슨과 같은 레벨의 `attachments/` 폴더에 둠. 참조는 상대경로:
```mdx
![설명](./attachments/foo.png)
```

## 링크 규칙

MDX 파일 간 내부 링크는 **절대 경로** `/docs/<slug>` 사용.

- ✅ `[레슨](/docs/starting-conversations/llm-basics/llm-fundamentals)`
- ❌ `[레슨](./llm-fundamentals)` — 루트 `/docs` 페이지에서 404 (Fumadocs 는 내부 링크 rewrite 지원 없음)

이미지만 예외 — 상대 경로 유지: `![alt](./attachments/foo.png)`

baseUrl `/docs` 는 `src/lib/shared.ts:2` 의 `docsRoute` 가 SSOT.

검증: `bun run lint:links` (pre-push hook 에서 자동 실행).

## Fumadocs 레퍼런스

Fumadocs 작업 시 추측하지 말고 공식 문서를 먼저 확인.

- https://www.fumadocs.dev/llms.txt (인덱스)
- https://www.fumadocs.dev/llms-full.txt (전체)

## 의존성 고정

- **ESLint v9 고정.** v10 으로 올리지 말 것. `eslint-plugin-react` 가 v10 미지원이라 lint 가 깨짐. [issue #3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977) 머지 후에 재고.

## 커밋 정책

글로벌 `~/.claude/CLAUDE.md` 규칙 준수:
- 논리 단위 완료 시 자동 커밋, 요청 대기 금지
- 하나의 논리 변경 = 하나의 커밋. "and" 로 여러 변경 이어지면 분리.
- Conventional commits (feat, fix, refactor, chore, docs 등)
- `--no-verify`, hook 스킵 금지
- 원격 푸시는 명시적 요청 시에만

## Playwright 검증 체크리스트 (페이지당)

- HTTP 200 응답
- `<h1>` 이 frontmatter `title` 과 일치
- 원본 MD `##`/`###` heading 전부 렌더 존재
- 원본 이미지 수 == `<img>` 수 + 각 src HTTP 200 + `Content-Type: image/*`
- 사이드바 네비에 현재 레슨 하이라이트
- 브라우저 콘솔 에러 없음
- 1280px 뷰포트 가로 스크롤 없음
- 스크린샷 `.playwright/screenshots/{part}/{chapter}/{lesson}.png` 저장
