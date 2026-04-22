# 다이어그램 패턴 카탈로그

5 가지 패턴 각각에 대해 **언제 쓰는지** + **참조 컴포넌트 경로**. 신규 다이어그램이라도 가장 가까운 패턴을 골라 그 컴포넌트를 먼저 Read 한 뒤, 좌표만 새로 잡는 방식으로 작업한다.

> 컨벤션은 살아있는 컴포넌트 안에 있다. 이 문서는 그것을 가리키는 포인터일 뿐. **참조 컴포넌트를 반드시 Read 하고 시작할 것.**

---

## 1. Flow / Process

**언제**: 입력 → 처리 → 출력의 단방향 흐름. 한 source 에서 여러 후보로 fan-out 하거나 (선택), 여러 step 을 직선으로 나열할 때.

**참조 컴포넌트**:
- `src/components/diagrams/tool-use-flow.tsx` — fan-out (LLM → 4 Tool chips, 그중 1 개 선택)
- `src/components/diagrams/token-prediction-flow.tsx` — fan-out (LLM → 4 후보 토큰)
- `src/components/diagrams/bug-fix-loop.tsx` (수평 step 부분) — linear (1 → 2 → 3 → 4 → 5)

**핵심 구조**:
- 좌측: 입력 (user/dev pill, yellow)
- 중앙: 처리 (LLM block, primary)
- 우측: 결과 (선택된 것 cyan, 나머지 muted)
- fan-out 화살표: 단일 `Q` quadratic, control y = start y

---

## 2. Comparison

**언제**: 두 개념을 좌/우로 나란히 비교 (예: LLM + Tool vs Agent).

**참조 컴포넌트**:
- `src/components/diagrams/llm-vs-agent-flow.tsx`

**핵심 구조**:
- `grid grid-cols-1 md:grid-cols-2 gap-8` 로 좌/우 분할
- 한쪽은 default (bg-card), 다른 한쪽은 accent (primary-soft) — 어느 쪽을 강조할지 의도에 따라 결정
- 하단 figcaption 으로 핵심 차이 한 줄 요약
- SVG 가 아니라 Flexbox/Grid + small inline SVG arrow 로 구현 (단순한 비교일 때 SVG 보다 깔끔)

---

## 3. Stage / Evolution

**언제**: 한 축 (시간·복잡도·자율성·맥락 등) 으로 진화하는 단계. 각 단계가 누적/대체/심화 관계.

**참조 컴포넌트**:
- `src/components/diagrams/coding-tool-evolution.tsx`

**핵심 구조**:
- 좌하단 → 우상단 대각선 staircase 배치 (2 축이면 X·Y 둘 다 증가)
- 카드 사이 화살표는 **단일 `Q` quadratic** (control y = start y, 부드럽게 휘어 올라감)
- 마지막(가장 진화한) 단계만 accent (primary)
- dashed L-shape 축 + 축 라벨 ("맥락 범위 ↑", "자율성 →")
- 카드 footer 에 도구 예시 ("Claude Code · Codex · Gemini CLI" 등)

---

## 4. Loop / Cycle

**언제**: 반복·재시도·feedback 이 본질인 흐름. 끝점이 다시 시작점으로 돌아오는 구조.

**참조 컴포넌트**:
- `src/components/diagrams/bug-fix-loop.tsx` — 수평 step + dashed feedback arch + 성공 분기

**핵심 구조**:
- 메인 흐름: 수평 step 박스 + primary 직선 화살표
- Feedback loop: **단일 `C` cubic bezier arch** (직각 zigzag 피할 것), dashed pink
- arch 라벨 ("실패하면 ...") 은 arch 정점보다 위에 배치 (텍스트가 dashed line 을 관통하지 않게)
- 성공 분기: 마지막 step 에서 cyan 화살표로 완료 박스로 분기

---

## 5. Timeline

**언제**: 시간축 위에 영역을 분할하고 (예: 아는 영역 vs 모르는 영역) 사건/카드를 배치.

**참조 컴포넌트**:
- `src/components/diagrams/knowledge-cutoff-timeline.tsx`

**핵심 구조**:
- 수평 timeline line (orange/pink, primary 흐름이 아니므로 pink)
- 영역 배경: `linearGradient` 로 좌(cyan-soft) / 우(pink-soft) 그라데이션
- 영역 라벨 ("AI 가 아는 영역" cyan, "AI 가 모르는 영역" pink) 상단 중앙
- 사건 카드: 각 영역 안에 1 개 이상 (cyan-soft / pink-soft)
- 분기점: 수직 dashed line + 라벨 (Knowledge Cutoff 등)
- timeline dot: 연도/시점 표시, cutoff 시점만 강조

---

## 신규 다이어그램 작성 절차

1. 위 5 가지 중 가장 가까운 패턴 1 개 선택
2. 해당 참조 컴포넌트 **Read**
3. 좌표·텍스트만 새로 잡기 (구조·마커 정의·헬퍼 함수 패턴은 그대로)
4. SKILL.md 의 Step 4 ~ 9 진행

5 가지에 정확히 안 맞으면 가장 가까운 것 + 일부 변형. 새 패턴을 만들기 전에 먼저 한 번 더 적합한 게 있는지 검토.
