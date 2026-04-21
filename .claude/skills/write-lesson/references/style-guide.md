# Lesson Style Guide

## 문체

- **문장형** (`~입니다`, `~합니다`) — 독자에게 말을 거는 서술
- **명사형** (`~함`, `~임`, `~시스템`, `~이유`) — 제목·레이블·요약
- **인용** (블록쿼트 `> "..."`, 코드 펜스) — 원본 유지

### 자리별 적용

문장형이 쓰이는 자리:
- frontmatter `description`
- Overview 단락
- 학습 목표 bullets
- 본문 단락
- Callout 내부
- 핵심 포인트 정리 bullets
- FAQ Q/A
- 이어서 배울 내용 **도입 단락**
- Part Wrap-up bullets

명사형이 쓰이는 자리:
- frontmatter `title`
- H2/H3/H4
- Course Wrap-up bullets
- 이어서 배울 내용 **후속 bullets**

판별 기준: **"완결 서술이면 문장형, 제목·레이블·축약 요약이면 명사형"**.

## 문단은 의미 단위로 묶기

빈 줄 = `<p>` 경계. Fumadocs(Tailwind prose) 가 `<p>` 마다 margin 을 붙이므로 1문장 1문단이면 간격이 과도함.

- 같은 주제 연속 문장 → 한 문단에 이어 쓰기 (빈 줄 없음)
- 주제 전환 → 빈 줄로 분리
- 강조용 standalone 단문은 페이지당 1-2 개까지 허용

피해야 할 패턴:
- 한 섹션에서 3문장 이상이 전부 빈 줄로 분리 (1문장 1문단)
- 10줄 초과 문단에 논점 2-3개 혼재

## 내부 링크

- MDX 간 링크는 `/docs/<slug>` 절대 경로
- 이미지만 상대 경로 `./attachments/foo.png` 허용
- `./` `../` 로 시작하는 비-이미지 링크 금지

## 이미지

- 파일명 `lesson-NN-kebab-case.png`
- 경로 `./attachments/<filename>`
- 위치는 유연 — 첫 H2(문제 제기·원리·정의·Step 1) 에도 허용
- alt 는 파일명과 일치

## Fumadocs 포맷

- 본문 `# H1` 금지 (frontmatter `title` 이 자동 렌더)
- Callout 은 `<Callout type="info|warn|idea|error|success">` JSX 사용
- GFM `> [!NOTE]` / `> [!TIP]` 등 markdown 콜아웃 금지
- Callout 은 `src/components/mdx.tsx` 전역 등록 → 파일별 import 불필요

## Callout 사용

### 용어 정의 Callout

초보자가 막힐 수 있는 전문용어가 처음 등장할 때 `<Callout type="info" title="X란?">` 로 정의 박스 삽입.

- 비유 우선 (친숙한 비유 한 줄 → 정의 순)
- 3-4 문장 이내
- 예시:
  - "단어? 토큰?" — `content/docs/starting-conversations/llm-basics/llm-fundamentals.mdx:27-29`
  - "Context란?" — `content/docs/starting-conversations/llm-basics/tool-use-and-agent.mdx` (카톡 대화 비유)

## frontmatter

- `public: true` 기본 — 작성 즉시 공개
- `description` 은 1-2문장 문장형
- `title` 은 자유 (`<후킹 문구> | <개념명>` 포맷 선호)

