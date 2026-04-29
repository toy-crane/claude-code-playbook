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

## Plugin 설치

이 저장소는 Claude Code plugin `playbook-essentials@claude-code-playbook` 의 소스이기도 합니다. 두 가지 방법으로 설치할 수 있습니다.

### 1. `/plugin` 슬래시 커맨드

Claude Code 세션에서 `/plugin` 을 입력하면 plugin 관리 UI 가 열립니다. **Marketplaces** 탭에서 `toy-crane/claude-code-playbook` 을 추가하고 plugin 을 설치합니다.

### 2. `.claude/settings.json` 자동 활성화

프로젝트의 `.claude/settings.json` 에 다음을 추가하면 저장소를 clone 한 순간 plugin 이 자동 활성화됩니다.

```json
{
  "enabledPlugins": ["playbook-essentials@claude-code-playbook"]
}
```

강의 실습 저장소(`todo-tutorial`) 가 이 방식을 사용합니다.

## 포함된 Skill

| 슬래시 커맨드 | 하는 일 |
|---|---|
| `/qna` | 강의 내용 한국어 Q&A 도우미. 강의 페이지 본문을 우선 참조해 답하고, 강의 범위 밖 주제는 일반 Claude Code 지식으로 위임합니다 |
| `/migrate-to-copilot` | 개인 프로젝트 시간 Copilot CLI fallback 대비 도구. `.claude/commands/` → `.claude/skills/`, `.claude/agents/` → `.github/agents/`, `.claude/settings.json` hooks → `hooks.json` 까지 한 번에 변환합니다 |
