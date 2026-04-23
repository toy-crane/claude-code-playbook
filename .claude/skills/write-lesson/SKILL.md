---
name: write-lesson
description: 강의 사이트(content/docs/**/*.mdx) 의 신규 레슨·Part Wrap-up·Course Wrap-up 을 사이트 컨벤션에 맞춰 작성한다. "레슨 써줘", "새 레슨", "레슨 작성", "Part N wrap-up", "Course wrap-up", "write-lesson" 같은 표현에 매칭.
---

# write-lesson

## 산출물

`content/docs/**/*.mdx` 신규 파일 1개와 이미지를 출력한다.

| 산출물 유형 | 템플릿 | 본문 패턴 |
|------------|--------|-----------|
| 레슨 (문제-해법) | `lesson-01-problem-solution.mdx` | 불편함 → 해법 → 메커니즘 → [실습] → [경계] |
| 레슨 (원리→귀결) | `lesson-02-principle-consequences.mdx` | 원리 → 귀결₁ → 귀결₂ |
| 레슨 (정의→적용→확장) | `lesson-03-definition-application.mdx` | 정의 → 적용 → 상위 개념 |
| 레슨 (튜토리얼) | `lesson-04-tutorial.mdx` | Step 1 → Step N → [원칙 요약] |
| Part Wrap-up | `part-wrap-up.mdx` | 큰 테마 2-4 개, bullet 문장형 |
| Course Wrap-up | `course-wrap-up.mdx` | Part 3 개 + 이 강의 이후, bullet 명사형 축약 |

## 패턴 선택 로직

위에서 아래로 먼저 걸리는 조건을 채택한다.

1. 독자가 지금 겪는 불편함이 명확 → **패턴 1 (문제-해법)**
2. H2 후보가 같은 원리의 파생 → **패턴 2 (원리→귀결)**
3. 앞 레슨의 해답으로 등장하고 뒤에 상위 개념이 이어짐 → **패턴 3 (정의→적용→확장)**
4. 순서 자체가 콘텐츠(실습·셋업) → **패턴 4 (튜토리얼)**
5. 넷 다 애매 → 기본값 **패턴 1** 로 리프레임 시도

## 워크플로우

각 Step 은 유저 승인으로 종료한다. 수정 요청이 오면 재생성 후 재승인한다.

### Step 1. 탐색

현재 레슨의 위치와 앞선 맥락을 파악한다. 직전 레슨에서 이미 다룬 개념을 중복하지 않기 위함이다.

- `content/docs/**/meta.json` 으로 현재 레슨 위치·시퀀스 확인
- 직전 레슨 파일을 Read 로 읽고 이미 소개된 용어·예시·결론 식별

### Step 2. 헤드라인 제안

템플릿을 고정하기 전에 구조부터 유저와 합의한다. 헤드라인이 틀리면 본문을 다시 쓴다.

- 주제 + 시퀀스 위치 + Step 1 컨텍스트로 [패턴 선택 로직] 에서 패턴 1개 고정
- 해당 템플릿의 H2 헤드라인을 주제 맞춤으로 채움
- 직전 레슨과의 연결 지점 명시
- 출력: 선택 템플릿 파일명 + 채워진 H2 목록

### Step 3. 본문 + Callout + 이미지 placeholder

템플릿 뼈대를 유일 출처로 두고 본문을 채운다. 뼈대를 고치면 사이트 내 레슨 일관성이 깨진다.

- 선택한 `assets/templates/*.mdx` 를 Read 로 읽는다 — **뼈대의 유일 출처**
- 프런트매터·모든 H2·H3 순서를 그대로 복사해 새 `.mdx` 파일을 시작. 템플릿이 정한 헤더 이름은 변경·삭제 금지
- 본문은 CLAUDE.md 의 합니다체로 작성하고 `public: true` 로 저장
- Frontmatter `description` 은 OG 이미지에 렌더되므로 한 문장·50~70자 (최대 90자) 로 작성
- 어려운 용어 Callout: 초보자에게 모호할 전문용어를 추출. Step 1 에서 이미 소개된 용어는 제외. 남은 용어마다 비유 후보 3-4개를 생성해 유저에게 제시하고, 선택된 비유로 `<Callout type="info" title="X란?">` 삽입
- 이미지 placeholder: `![lesson-NN-kebab-case](./attachments/...)` 형태만 본문에 배치. 아래 스키마로 별도 리스트 출력 — `{파일명, 위치(H2 기준), 주제, 유형}`. 유형은 [이미지 유형 분류] 로 자동 판정, 유저 override 가능
- 출력: 저장된 `.mdx` 초안 + 이미지 placeholder 리스트

### Step 4. Fact-check

본문의 사실성 주장을 모두 검증한다. 오류는 레슨 신뢰도를 직접 깎는다.

- 본문에서 사실성 주장을 추출 (개념 정의, 수치, 고유명사, 버전, 연도, 동작 설명)
- 주장 유형에 따라 아래 표로 라우팅해 검증

  | 주장 유형 | 라우팅 |
  |---|---|
  | Claude Code CLI / Agent SDK / Anthropic API | `claude-code-guide` 에이전트 |
  | 외부 라이브러리·프레임워크·버전·연도 | `general-purpose` 에이전트 + WebSearch |
  | 일반 LLM 원리·업계 상식 | 내부 추론 + 필요 시 WebSearch 보조 |

- 각 주장을 `{주장 원문 / 판정(✅ 정확 / ⚠️ 오래됨 / ❌ 부정확) / 출처 / 제안 수정안}` 스키마로 정리
- `AskUserQuestion` 으로 3-4개씩 그룹화해 건별 승인을 받고, 승인된 수정만 본문에 반영

### Step 5. 이미지 생성

placeholder 자리를 실제 이미지로 채운다. 유형에 따라 표현 방식이 달라 스킬을 분기한다.

| 유형 | 호출 스킬 | 산출물 저장 |
|------|---------|-----------|
| `diagram` | `create-lesson-diagram` | `src/components/diagrams/<name>.tsx` (React SVG). MDX placeholder 자리는 `import` + `<Component />` 로 교체 |
| `illustration` | `illustrate-lesson` | `attachments/<name>.png` |

- diagram 은 placeholder 파일명을 컴포넌트명(PascalCase) 으로 매핑해 일치 확인
- illustration 은 placeholder 파일명과 생성된 파일명 일치 확인
- 출력: 이미지 파일 + 최종 `.mdx`

## 이미지 유형 분류

- **diagram** — 구조·관계·흐름을 공간적으로 증명 (아키텍처, 타임라인, 비교 매트릭스, 트리)
- **illustration** — 비유·서사로 개념 전달 (비유 장면, 캐릭터, 심볼)
