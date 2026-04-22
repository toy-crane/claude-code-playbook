# 색상 팔레트 — 의미 시스템

이 강의 사이트의 모든 다이어그램은 `src/app/global.css` 에 정의된 `--diagram-*` CSS 토큰만 사용한다. 라이트/다크 모드는 토큰이 자동 처리한다.

## 토큰 목록

`src/app/global.css` 의 `:root` (라이트) / `.dark` (다크) 정의 참조.

| 토큰 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `--diagram-bg-panel` | #fafaf9 | #1c1917 | DiagramFrame 배경 |
| `--diagram-bg-card` | #ffffff | #292524 | 중립 카드 fill |
| `--diagram-border` | #e7e5e4 | #44403c | 약한 테두리 |
| `--diagram-border-strong` | #a8a29e | #78716c | 강한 테두리 (actor pill 등) |
| `--diagram-text` | #44403c | #e7e5e4 | 본문 텍스트 |
| `--diagram-text-muted` | #78716c | #a8a29e | 보조 텍스트 |
| `--diagram-primary` | #2563eb | #60a5fa | **AI/LLM 주체** |
| `--diagram-primary-soft` | #eff6ff | #1e293b | primary fill |
| `--diagram-cyan` | #16a34a | #4ade80 | **성공/선택/긍정** |
| `--diagram-cyan-soft` | #f0fdf4 | #14532d | cyan fill |
| `--diagram-pink` | #f97316 | #fb923c | **위험/실패/경고** |
| `--diagram-pink-soft` | #fff7ed | #431407 | pink fill |
| `--diagram-yellow` | #eab308 | #facc15 | **사람의 입력** |
| `--diagram-yellow-soft` | #fefce8 | #422006 | yellow fill |

## 의미 시스템 (가장 중요)

색은 미적 선택이 아니라 **교육적 의미** 의 그릇이다. 다른 컴포넌트와 같은 색을 다르게 쓰면 학습자가 혼란스러워한다.

### primary (blue) — AI/LLM 주체, 메인 흐름

**합의된 사용**:
- LLM 블록 그 자체 (`tool-use-flow` 의 LLM 판단·답변 생성, `token-prediction-flow` 의 LLM)
- Agent 개념 강조 (`llm-vs-agent-flow` 의 Agent block, `coding-tool-evolution` 의 Agentic 단계)
- 메인 처리 흐름 화살표 (`bug-fix-loop` 의 step 박스 + 화살표)
- figcaption 의 hero 강조 span

### cyan (green) — 성공·선택·긍정

**합의된 사용**:
- 확률 분포 중 "선택된" 항목 (`token-prediction-flow` 의 35% "밥을")
- "아는 영역", 안전 (`knowledge-cutoff-timeline` 의 known area + React 18)
- 성공 분기 + 완료 박스 (`bug-fix-loop` 의 성공 → 수정 완료)

### pink (orange) — 위험·실패·경고

**합의된 사용**:
- "모르는 영역", Cutoff 경계 (`knowledge-cutoff-timeline` 의 unknown area + dashed cutoff line)
- 실패 시 재시도 loop (`bug-fix-loop` 의 dashed feedback arch)
- "실패하면 ..." 같은 경고 라벨

⚠️ **함정**: pink 를 "강조 색"으로 쓰면 안 된다. 이전에 `coding-tool-evolution` 의 Agentic 단계를 pink 로 강조했다가 "위험한 마지막 단계"라는 정반대 의미로 읽힐 뻔했다. Agent/AI 강조는 **primary** 가 맞다.

### yellow — 사람의 입력

**합의된 사용**:
- 사용자 질문 pill (`token-prediction-flow` 의 "나는 오늘 점심에")
- 개발자 요청 pill (`bug-fix-loop` 의 "버그 고쳐줘")

다른 의미로 확장하지 말 것.

### bg-card + border-strong — 중립 actor

**합의된 사용**:
- 사용자/사람을 표현하는 pill (`tool-use-flow` 의 사용자 질문/답변)
- Stage 단계 카드 중 비강조(non-accent) 카드 (`coding-tool-evolution` 의 1·2 단계)

### text-muted — 보조·비활성

**합의된 사용**:
- 모든 라벨 (축, footer, "AI 의 자율 루프" 등)
- 선택되지 않은 옵션 (`tool-use-flow` 의 미선택 Tool chips)
- 보조 설명

## 일관성 체크

새 컴포넌트 작성 후, 다음 명령으로 색상 토큰 사용을 점검:

```bash
grep -nE "diagram-(primary|cyan|pink|yellow)" src/components/diagrams/*.tsx
```

각 토큰이 위 의미 시스템과 충돌하는지 훑어본다. 같은 색을 정반대 의미로 쓰는 케이스를 잡아낼 수 있다.
