---
paths:
  - "content/docs/**/*.mdx"
  - "src/components/diagrams/**"
---

# 강의 콘텐츠 작성 규칙

`content/docs/**/*.mdx` 강의 본문과 그에 부속된 시각 자산·검증 작업에 적용 합니다.

## 시각 자료

### 위치
- **PNG (illustration)**: `public/learn/{part}/{chapter}/<kebab-case>.png`
  - 본문 참조: `/learn/{part}/{chapter}/<kebab-case>.png` 절대경로
- **다이어그램**: React SVG 컴포넌트 — `src/components/diagrams/<kebab-case>.tsx`
  - 본문 참조: `import { Component } from '@/components/diagrams/...'` 후 `<Component />`

상대경로 (`./attachments/...`) 는 사용하지 않습니다.

### 유형 분류
- **diagram** — 구조·관계·흐름을 공간적으로 증명 (아키텍처, 타임라인, 비교 매트릭스, 트리). React SVG 컴포넌트로 작성합니다.
- **illustration** — 비유·서사로 개념 전달 (비유 장면, 캐릭터, 심볼). PNG 로 저장합니다.

## Callout

초보자에게 모호할 전문용어는 `<Callout type="info" title="X란?">` 으로 감싸 비유로 풀어서 설명합니다. 같은 용어가 앞 레슨에서 이미 정의됐다면 다시 감싸지 않습니다.

## 사실 검증 라우팅

본문의 사실성 주장(개념 정의, 수치, 고유명사, 버전, 연도, 동작 설명)을 검증할 때 주제별로 다음 라우팅을 따릅니다.

| 주장 유형 | 라우팅 |
|---|---|
| Claude Code CLI / Agent SDK / Anthropic API | `claude-code-guide` 에이전트 |
| 외부 라이브러리·프레임워크·버전·연도 | `general-purpose` 에이전트 + WebSearch |
| 일반 LLM 원리·업계 상식 | 내부 추론 + 필요 시 WebSearch 보조 |
