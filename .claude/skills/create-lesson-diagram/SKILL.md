---
name: create-lesson-diagram
description: 강의 사이트(content/docs/**/*.mdx)의 다이어그램을 React SVG 컴포넌트로 작성하는 스킬. excalidraw PNG 를 컴포넌트로 옮기거나, 새 다이어그램을 처음부터 만들 때 사용. "다이어그램 만들어줘", "이미지 컴포넌트로 바꿔줘", "excalidraw 옮겨줘", "create-lesson-diagram", "diagram" 같은 표현이나 MDX 본문에 `![...](./attachments/lesson-XX-...png)` 가 있는 상황에서 사용. 강의 사이트의 다이어그램 작업이면 명시적 요청이 없어도 우선 이 스킬을 떠올릴 것.
---

# create-lesson-diagram

강의 사이트(`claude-code-playbook`)의 모든 다이어그램은 **인라인 SVG 를 그리는 React 컴포넌트** 로 통일되어 있다. 새 다이어그램을 그리거나 기존 PNG 를 옮길 때 이 스킬이 패턴·색상·검증 흐름을 안내한다.

## 산출물

- `src/components/diagrams/<kebab-case-name>.tsx` (신규 React SVG 컴포넌트)
- 해당 MDX 파일에 import + `<Component />` 삽입
- (옵션) 원본 PNG/excalidraw 파일 정리

## 가장 중요한 원칙

> **새 다이어그램을 작성하기 전에, 가장 가까운 패턴의 기존 컴포넌트를 먼저 Read 한다.**

컨벤션은 살아있는 컴포넌트 안에 있고, 이 스킬은 그것을 가리키는 포인터일 뿐이다. 기존 코드를 먼저 읽지 않으면 동일 컨벤션을 지킬 수 없다 (마커 정의·끝점 처리·path 종류 같은 디테일이 매번 갈라진다).

## 워크플로우

### Step 1. 의도 파악

**입력**: MDX 본문 + (있다면) 원본 PNG.

처리:
- MDX 의 해당 다이어그램 주변 단락을 Read 해 **교육적 메시지** 추출 (어떤 개념의 무엇을 강조하려는 건지)
- 원본 이미지가 있으면 Read tool 로 시각 의도 확인

**산출**: 짧은 한 문장. 예: "Tool 호출 흐름에서 LLM 이 여러 Tool 중 하나를 선택한다는 점을 강조".

### Step 2. 패턴 결정

`references/patterns.md` 를 참조해 5 가지 패턴 중 1 개 선택:

| 패턴 | 언제 |
|---|---|
| Flow / Process | 입력 → 처리 → 출력의 단방향 흐름, fan-out/fan-in 분기 |
| Comparison | 두 개념을 좌/우로 비교 |
| Stage / Evolution | 시간·복잡도·자율성 등 한 축으로 진화하는 단계 |
| Loop / Cycle | 반복·재시도·feedback 이 본질인 흐름 |
| Timeline | 시간축 위에 영역 분할 + 사건 배치 |

### Step 3. 참조 컴포넌트 Read

선택한 패턴의 reference 컴포넌트를 **반드시 먼저 Read**. 컨벤션을 그 코드에서 흡수한다.

| 패턴 | 참조 |
|---|---|
| Flow | `src/components/diagrams/tool-use-flow.tsx`, `bug-fix-loop.tsx` (수평 process 부분) |
| Comparison | `src/components/diagrams/llm-vs-agent-flow.tsx` |
| Stage | `src/components/diagrams/coding-tool-evolution.tsx` |
| Loop | `src/components/diagrams/bug-fix-loop.tsx` (feedback arch 부분) |
| Timeline | `src/components/diagrams/knowledge-cutoff-timeline.tsx` |

신규 다이어그램이라도 이 단계를 건너뛰지 말 것.

### Step 4. 컴포넌트 작성

**공통 구조 (모든 컴포넌트 동일)**:

```tsx
import { DiagramFrame } from './primitives';

export function MyDiagram() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            {/* arrow markers */}
          </defs>
          {/* arrows first (so they sit beneath shapes) */}
          {/* shapes */}
          {/* labels */}
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        한 줄 요약 — <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          핵심 강조 부분
        </span>
      </figcaption>
    </DiagramFrame>
  );
}
```

규칙:
- viewBox 폭 **800** 고정. 높이는 콘텐츠에 맞춰 가변 (300~420 사이).
- `min-w-[600~640px]` + `overflow-x-auto` — Fumadocs 본문 컬럼(~665px) 에서 가로 스크롤 허용.
- `style={{ fontFamily: 'inherit' }}` — 한글 Noto Sans KR 상속.
- 색상은 **항상** `var(--diagram-*)` CSS 토큰만 사용 (하드코딩 금지). 상세는 `references/palette.md`.
- 중복되는 sub-shape 는 helper component 로 분리 (예: `ToolChip`, `StageCard`, `StepBox`).

**화살표 컨벤션 (간단 버전, 상세는 다음 라운드의 references/arrows.md)**:
- 모든 마커는 `viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"` 동일.
- 짧은 직선 → `<line>`. 부드러운 곡선 → 단일 `Q` quadratic bezier (`Q control_x control_y end_x end_y`, **control y = start y**). Loop back → 단일 `C` cubic arch.
- **Endpoint 는 타깃 edge 2~3px 직전에서 멈춤**. 카드 안으로 push 하지 말 것 (마커가 그 자리에 화살촉을 그린다).
- 복잡한 cubic S-curve 나 직각 zigzag 는 피한다 (이번 세션에서 가장 자주 깨졌던 패턴).

### Step 5. MDX 교체

```mdx
---
title: '...'
---

import { MyDiagram } from '@/components/diagrams/my-diagram';

## ...

<MyDiagram />
```

- 기존 `![...](./attachments/...png)` 줄을 `<MyDiagram />` 로 교체.
- import 는 frontmatter 직후, 첫 H2 위에 배치.

### Step 6. 자동 검증

```bash
bun run types:check    # MDX + tsc
bun run lint:links     # MDX 내부 링크
```

둘 다 통과해야 다음 단계.

### Step 7. 시각 검증

Playwright 로 figure 단위 스크린샷:

```js
// tests/snap-<lesson>.mjs (임시 파일)
import { chromium } from 'playwright';
const url = 'http://localhost:3000/learn/<path-to-lesson>';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
const figs = await page.locator('figure').all();
for (let i = 0; i < figs.length; i++) {
  await figs[i].screenshot({ path: `tests/snap-${i}.png` });
}
await browser.close();
```

- dev server (`bun run dev`) 가 떠 있어야 함
- 결과 PNG 를 직접 Read 해서 확인
- 체크 포인트: 화살표 endpoint 가 카드 edge 에 닿는지, 라벨이 서로 겹치지 않는지, 색상 의미가 맞는지
- 임시 파일 (`tests/snap-*.mjs`, `tests/snap-*.png`) 은 검증 후 삭제

### Step 8. 의미 전달 확인

**사용자가 시각적으로 최종 판단** (default). 스크린샷을 보고 "MDX 본문이 말하려는 메시지가 그림에서도 강조되어 보이는가" 확인.

선택적으로 Agent 1 차 점검을 의뢰할 수 있다 ("MDX 본문 + 컴포넌트 코드 + 캡션 일치 여부"를 텍스트 레벨에서). 단 시각 가중치(색·크기) 효과는 Agent 가 못 보므로 보조 용도.

### Step 9. (옵션) 원본 정리

PNG → 컴포넌트 교체 케이스인 경우:
- `content/docs/.../attachments/<original>.png` + `.excalidraw` 삭제
- 폴더가 비면 빈 폴더도 삭제 (`rmdir`)
- 신규 다이어그램 케이스는 이 단계 생략

## 색상 의미 (요약)

토큰 이름은 universal 관례(Tailwind/Bootstrap/Material) 를 따른다. 상세는 `references/palette.md`. 컴포넌트 작성 전 한 번 확인 필수 (특히 색상 충돌 자주 발생).

| 토큰 | 역할 |
|---|---|
| primary (blue) | 주된 focal · 메인 흐름 (사이트 brand) |
| success (green) | 성공·긍정·선택됨 |
| danger (orange) | 위험·실패·경계 |
| warning (yellow) | 주의·특별 강조 (사람 입력 pill 포함) |
| bg-card + border-strong | 중립 actor |
| text-muted | 보조·비활성 |

## 흔한 함정

- **컨벤션 망실**: Compaction 이나 새 세션에서 기존 컴포넌트를 읽지 않고 바로 작성 → 마커·endpoint·path 종류가 매번 갈라짐. Step 3 을 건너뛰지 말 것.
- **색상 의미 충돌**: danger 를 한 곳은 "위험", 다른 곳은 "강조" 로 쓰면 학습자 혼란. 새 컴포넌트 작성 후 다른 컴포넌트와 의미가 맞는지 grep 으로 확인.
- **Endpoint 끝맺음**: 화살표 끝점을 카드 안으로 밀어넣으면 마커가 어색하게 박힘. 항상 edge 2~3px 직전.
- **하드코딩 색상**: `var(--diagram-*)` 토큰이 아니면 다크 모드가 깨진다.
