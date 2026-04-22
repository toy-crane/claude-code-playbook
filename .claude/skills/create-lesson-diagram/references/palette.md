# 색상 팔레트 — Universal 역할 + 의미 시스템

이 강의 사이트의 모든 다이어그램은 `src/app/global.css` 에 정의된 `--diagram-*` CSS 토큰만 사용한다. 토큰 이름은 디자인 시스템 관례(Tailwind/Bootstrap/Material)를 따라 **역할 기반**으로 붙였다. 라이트/다크 모드는 토큰이 자동 처리한다.

## 토큰 목록

`src/app/global.css` 의 `:root` (라이트) / `.dark` (다크) 정의 참조.

| 토큰 | 라이트 | 다크 | 역할 |
|---|---|---|---|
| `--diagram-bg-panel` | #fafaf9 | #1c1917 | DiagramFrame 배경 |
| `--diagram-bg-card` | #ffffff | #292524 | 중립 카드 fill |
| `--diagram-border` | #e7e5e4 | #44403c | 약한 테두리 |
| `--diagram-border-strong` | #a8a29e | #78716c | 강한 테두리 (actor pill 등) |
| `--diagram-text` | #44403c | #e7e5e4 | 본문 텍스트 |
| `--diagram-text-muted` | #78716c | #a8a29e | 보조 텍스트 |
| `--diagram-primary` | #2563eb | #60a5fa | **주된 focal · 메인 흐름** |
| `--diagram-primary-soft` | #eff6ff | #1e293b | primary fill |
| `--diagram-success` | #16a34a | #4ade80 | **성공 / 긍정 / 선택됨** |
| `--diagram-success-soft` | #f0fdf4 | #14532d | success fill |
| `--diagram-danger` | #f97316 | #fb923c | **위험 / 실패 / 경계** |
| `--diagram-danger-soft` | #fff7ed | #431407 | danger fill |
| `--diagram-warning` | #eab308 | #facc15 | **주의 / 특별 강조** |
| `--diagram-warning-soft` | #fefce8 | #422006 | warning fill |

## 의미 시스템 (가장 중요)

색은 미적 선택이 아니라 **교육적 의미** 의 그릇이다. 사이트 전체에서 같은 색을 다른 의미로 쓰면 학습자가 혼란스러워한다. 아래는 universal 관례 + 이 사이트 내부 컨벤션을 함께 정리한 것이다.

### primary (blue) — 주된 focal · 메인 흐름

Universal 관례 그대로. 각 다이어그램에서 **가장 전달하고 싶은 개념**(focal 주체) 과 메인 처리 흐름에 할당한다.

**이 사이트에서 자주 쓰이는 할당**:
- LLM / Agent 블록 자체 (`tool-use-flow`, `token-prediction-flow`, `llm-vs-agent-flow`)
- Agent 개념 강조 단계 (`coding-tool-evolution`)
- 메인 처리 흐름 화살표 + 핵심 step 박스 (`bug-fix-loop`)
- figcaption 의 hero 강조 span

전체 컴포넌트의 83 %가 primary 를 사용한다 — 사실상 *사이트의 brand color*.

### success (green) — 성공·긍정·선택됨

Universal 관례 그대로.

**이 사이트에서 자주 쓰이는 할당**:
- 확률 분포 중 "선택된" 항목 (`token-prediction-flow` 의 35% "밥을")
- "아는 영역" / 안전 (`knowledge-cutoff-timeline` 의 known area + React 18)
- 성공 분기 + 완료 박스 (`bug-fix-loop` 의 성공 → 수정 완료)

### danger (orange) — 위험·실패·경계

Universal 관례 그대로 — "pass/fail" 의 fail 쪽이 담기는 색. 빨강 대신 오렌지(#f97316)를 쓰는 건 pink 톤에 가까운 따뜻한 경고감을 주기 위함.

**이 사이트에서 자주 쓰이는 할당**:
- "모르는 영역", Cutoff 경계 (`knowledge-cutoff-timeline` 의 unknown area + dashed cutoff line)
- 실패 시 재시도 loop (`bug-fix-loop` 의 dashed feedback arch)
- "실패하면 ..." 같은 경고 라벨

⚠️ **함정**: danger 를 단순히 "강조 색"으로 쓰면 안 된다. 이전에 `coding-tool-evolution` 의 Agentic 단계를 danger 로 강조했다가 "위험한 마지막 단계"라는 정반대 의미로 읽힐 뻔했다. focal/brand 강조는 **primary** 가 맞다.

### warning (yellow) — 주의·특별 강조

Universal 관례. "focal 은 아니지만 독자 시선을 끌어야 하는" 요소에 사용.

**이 사이트에서 자주 쓰이는 할당**:
- 사용자·개발자 입력 pill (`token-prediction-flow` 의 "나는 오늘 점심에", `bug-fix-loop` 의 "버그 고쳐줘")
- 주의 라벨

> 입력 pill 을 warning 으로 칠하는 건 universal 관례는 아니지만, 이 사이트 안에서는 "기계의 흐름(primary) 과 구분되는 사람의 trigger" 라는 내부 컨벤션으로 자리잡았다. 새 다이어그램에서도 사람 입력 pill 에는 warning 을 쓰되, 경고성 라벨에도 같이 쓸 수 있다.

### bg-card + border-strong — 중립 actor

Universal 관례 (neutral surface). 색이 없는 "담백한 박스".

**이 사이트에서 자주 쓰이는 할당**:
- 사용자/사람을 표현하는 중립 pill (`tool-use-flow` 의 사용자 질문/답변)
- Stage 단계 카드 중 비강조(non-accent) 카드 (`coding-tool-evolution` 의 1·2 단계)

### text-muted — 보조·비활성

Universal 관례 (muted/secondary text).

**이 사이트에서 자주 쓰이는 할당**:
- 모든 라벨 (축, footer, "AI 의 자율 루프" 등)
- 선택되지 않은 옵션 (`tool-use-flow` 의 미선택 Tool chips)
- 보조 설명

## 일관성 체크

새 컴포넌트 작성 후, 다음 명령으로 색상 토큰 사용을 점검:

```bash
grep -nE "diagram-(primary|success|danger|warning)" src/components/diagrams/*.tsx
```

각 토큰이 위 의미 시스템과 충돌하는지 훑어본다. 같은 색을 정반대 의미로 쓰는 케이스를 잡아낼 수 있다.
