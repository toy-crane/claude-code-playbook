---
name: write-lesson
description: 강의 사이트(content/docs/**/*.mdx) 의 신규 레슨·Part Wrap-up·Course Wrap-up 을 사이트 컨벤션에 맞춰 작성하는 스킬. "레슨 써줘", "새 레슨", "레슨 작성", "Part N wrap-up", "Course wrap-up", "write-lesson" 같은 표현에 매칭. 기존 레슨 편집은 lesson-review 스킬이 담당.
---

# write-lesson

주제와 시퀀스 위치를 받아 6개 템플릿 중 하나를 채운 MDX 파일을 생성하는 스킬. Explorer → 헤드라인 → 본문 → Fact-check → 이미지 의 5단계로 나눠 각 단계마다 유저 승인을 받음.

## 산출물

`content/docs/**/*.mdx` 의 신규 파일 1개 + 관련 이미지.

| 산출물 유형 | 템플릿 | 본문 패턴 |
|------------|--------|-----------|
| 레슨 (문제-해법) | `lesson-01-problem-solution.mdx` | 불편함 → 해법 → 메커니즘 → [실습] → [경계] |
| 레슨 (원리→귀결) | `lesson-02-principle-consequences.mdx` | 원리 → 귀결₁ → 귀결₂ |
| 레슨 (정의→적용→확장) | `lesson-03-definition-application.mdx` | 정의 → 적용 → 상위 개념 |
| 레슨 (튜토리얼) | `lesson-04-tutorial.mdx` | Step 1 → Step N → [원칙 요약] |
| Part Wrap-up | `part-wrap-up.mdx` | 큰 테마 2-4 개, bullet 문장형 |
| Course Wrap-up | `course-wrap-up.mdx` | Part 3 개 + 이 강의 이후, bullet 명사형 축약 |

## 워크플로우

### Step 1. Explorer — 이전 레슨 컨텍스트 주입

입력: 작성할 레슨의 Part/Chapter 위치.

처리:
- `content/docs/**/meta.json` 으로 레슨 순서 파악 → 현재 레슨보다 앞선 파일 식별
- 그중 frontmatter `public: true` 인 `.mdx` 를 전부 Read

종료 조건: 자동 진행 (유저 승인 불필요).

### Step 2. 헤드라인 제안

입력: 주제 + 시퀀스 위치 + Step 1 의 컨텍스트.

처리:
- 아래 [패턴 선택 로직] 으로 패턴 1개 고정
- 해당 템플릿의 H2 헤드라인을 주제 맞춤으로 채움
- [헤드라인 가드] 자가 검증
- Step 1 컨텍스트 기반으로 앞 레슨과의 연결 지점 명시

출력: 선택한 템플릿 파일명 + 채워진 H2 헤드라인 목록.

종료 조건: 유저 승인. 수정 요청이 오면 재생성 후 재승인.

### Step 3. 본문 초안 + Callout + 이미지 placeholder

입력: 승인된 헤드라인.

처리:
- **3a. 본문 작성**:
  1. 선택한 템플릿 파일(`assets/templates/*.mdx`) 을 Read 로 읽는다 — **이것이 뼈대의 유일 출처**
  2. 프런트매터 · 모든 H2 · H3 순서를 **그대로 복사**해 새 파일을 시작. 템플릿이 정한 헤더 이름은 변경·삭제 금지
  3. 본문 내용을 채우면서 `references/style-guide.md` 준수. `public: true` 로 저장
  4. frontmatter `description` 은 OG 이미지에 렌더되므로 한 문장·50~70자로 간결히 작성 (최대 90자)
- **3b. 어려운 용어 Callout**:
  - 본문에서 초보자에게 모호할 수 있는 전문용어를 AI 가 자율 판단으로 후보 추출
  - **Step 1 컨텍스트로 이미 소개된 용어는 제외**
  - 남은 용어 각각에 대해 **비유 후보 3-4개** 생성해 유저에게 제시 → 유저가 선택한 비유로 `<Callout type="info" title="X란?">` 삽입
  - 참조: `references/style-guide.md` 의 "용어 정의 Callout" 섹션
- **3c. 이미지 placeholder 리스트**: `![lesson-NN-kebab-case](./attachments/...)` 형태만 배치하고, 아래 목록으로 출력
  - 각 항목: `{파일명, 위치(H2 기준), 이미지 주제, 유형}`
  - `유형` 은 `diagram` 또는 `illustration` — [이미지 유형 분류 휴리스틱] 으로 자동 판정, 유저 override 가능

출력:
- 저장된 .mdx 초안 파일 (Callout 포함)
- 이미지 placeholder 리스트

종료 조건: 유저 승인. 수정 요청(Callout 제거, 이미지 유형 override 등) 반영 후 재승인.

### Step 4. Fact-check

입력: 승인된 본문.

처리:
- **4a. 주장 추출**: 본문에서 모든 사실성 주장을 뽑음 (개념 정의, 수치, 고유명사, 버전, 연도, 동작 설명 등)
- **4b. 주장별 라우팅·검증**:

  | 주장 유형 | 라우팅 |
  |---|---|
  | Claude Code CLI / Agent SDK / Anthropic API | `claude-code-guide` 에이전트 |
  | 외부 라이브러리·프레임워크·버전·연도 | `general-purpose` 에이전트 + WebSearch |
  | 일반 LLM 원리·업계 상식 | 내부 추론 + 필요 시 WebSearch 보조 |

- **4c. 검증 결과 → 유저 질의**:
  - 각 주장을 `{주장 원문 / 판정(✅ 정확 / ⚠️ 오래됨 / ❌ 부정확) / 출처 / 제안 수정안}` 스키마로 정리
  - `AskUserQuestion` 으로 3-4개씩 그룹화해 질의 (첨부된 제안 수정안을 선택지로)
  - 유저가 건별 승인·거절 → 승인된 수정만 본문에 반영

출력: 팩트 보정된 .mdx.

종료 조건: 유저 승인.

### Step 5. 이미지 생성

입력: 승인된 본문 + 이미지 placeholder 리스트 (유형 포함).

처리:
- placeholder 마다 유형에 따라 다른 스킬을 트리거:

  | 유형 | 호출 스킬 | 산출물 저장 |
  |------|---------|-----------|
  | `diagram` | `create-lesson-diagram` | `src/components/diagrams/<name>.tsx` (React SVG 컴포넌트) — MDX 의 PNG placeholder 자리는 import + `<Component />` 로 교체 |
  | `illustration` | `illustrate-lesson` | `attachments/<name>.png` |

- diagram 의 경우 placeholder 의 파일명을 컴포넌트명(PascalCase) 으로 매핑해 일치 확인
- illustration 은 placeholder 파일명과 생성된 파일명이 같은지 확인

출력: 이미지 파일들 + 최종 .mdx.

## 패턴 선택 로직

결정 트리 (위에서 아래로 먼저 참):

1. 독자가 현재 겪는 불편함이 명확 → **패턴 1 (문제-해법)**
2. H2 후보가 같은 원리의 파생 → **패턴 2 (A: 원리→귀결)**
3. 앞 레슨의 해답으로 등장하고 뒤에 상위 개념이 이어짐 → **패턴 3 (B: 정의→적용→확장)**
4. 순서 자체가 콘텐츠(실습·셋업) → **패턴 4 (튜토리얼)**
5. 넷 다 애매 → 기본값 **패턴 1** 로 리프레임 시도

Part Wrap-up / Course Wrap-up 은 산출물 유형에서 직접 선택.

## 이미지 유형 분류 휴리스틱

각 이미지 placeholder 의 주제를 읽고 아래 기준으로 `diagram` 또는 `illustration` 을 판정.

- **diagram** — 구조·관계·흐름을 공간적으로 증명 (아키텍처, 타임라인, 비교 매트릭스, 트리 등)
- **illustration** — 비유·서사로 개념 전달 (비유 장면, 캐릭터, 심볼 등)

애매하면 `diagram` 우선 (코드로 정밀 편집 가능, 다이어그램 패턴 재사용).

## 헤드라인 가드

**적용 범위: 템플릿에 빈 슬롯으로 들어있어 AI 가 채우는 H2 에만.** 템플릿에서 이름이 고정된 헤더는 이 가드 대상 아님 — 손대지 말 것.

H2 제목은 "개요", "정리", "설명", "사용법" 같은 일반어 지양. 주제 특유의 구체적 후킹 문구(명사형·의문형·조건형) 로 작성.

예:
- 명사형: `"AI 가 거짓말을 하는 이유"`, `"LLM 이란: 다음 단어를 예측하는 시스템"`
- 의문형: `"AI 는 왜 자신만만하게 틀릴까"`
- 조건형: `"매번 같은 말을 반복하고 있다면"`

## 문체·포맷 규칙

`references/style-guide.md` 참조. 문체(문장형·명사형·인용) / 문단 묶기 / 내부 링크 / 이미지 / Fumadocs / Callout 사용 / frontmatter 규칙 포함.
