---
name: write-lesson
description: 강의 사이트(content/docs/**/*.mdx) 의 신규 레슨·Part Wrap-up·Course Wrap-up 을 사이트 컨벤션에 맞춰 작성하는 스킬. "레슨 써줘", "새 레슨", "레슨 작성", "Part N wrap-up", "Course wrap-up", "write-lesson" 같은 표현에 매칭. 기존 레슨 편집은 lesson-review 스킬이 담당.
---

# write-lesson

주제와 시퀀스 위치를 받아 6개 템플릿 중 하나를 채운 MDX 파일을 생성하는 스킬. 헤드라인·본문·이미지를 3단계로 나눠 각 단계마다 유저 승인을 받음.

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

### Step 1. 헤드라인 제안

입력: 주제 + 시퀀스 위치(Part/Chapter 맥락).

처리:
- 아래 [패턴 선택 로직] 으로 패턴 1개 고정
- 해당 템플릿의 H2 헤드라인을 주제 맞춤으로 채움
- [헤드라인 가드] 자가 검증

출력: 선택한 템플릿 파일명 + 채워진 H2 헤드라인 목록.

종료 조건: 유저 승인. 수정 요청이 오면 재생성 후 재승인.

### Step 2. 본문 초안 + 이미지 placeholder 리스트

입력: 승인된 헤드라인.

처리:
- 공통 프레임(Overview, 학습 목표, 핵심 포인트, FAQ, 이어서 배울 내용) + 본문 패턴 채움
- 문체·링크·이미지·Fumadocs 규칙은 `references/style-guide.md` 따름
- 이미지는 `![lesson-NN-kebab-case](./attachments/...)` placeholder 로만 표기
- `public: false` 로 저장

출력:
- 저장된 .mdx 초안 파일 경로
- 이미지 placeholder 리스트 — 각 항목 `{파일명, 위치(H2 기준), 이미지 주제}`

종료 조건: 유저 승인. 수정 요청이 오면 반영 후 재승인.

### Step 3. 이미지 생성 + 공개 전환

입력: 승인된 본문 + 이미지 placeholder 리스트.

처리:
- placeholder 마다 `illustrate-lesson` 스킬을 트리거해 이미지 일괄 생성
- 생성된 파일을 `attachments/` 에 배치 (파일명 일치 확인)
- 최종 검토 후 frontmatter `public: false` → `public: true` 전환

출력: 이미지 파일들 + 최종 .mdx.

## 패턴 선택 로직

결정 트리 (위에서 아래로 먼저 참):

1. 독자가 현재 겪는 불편함이 명확 → **패턴 1 (문제-해법)**
2. H2 후보가 같은 원리의 파생 → **패턴 2 (A: 원리→귀결)**
3. 앞 레슨의 해답으로 등장하고 뒤에 상위 개념이 이어짐 → **패턴 3 (B: 정의→적용→확장)**
4. 순서 자체가 콘텐츠(실습·셋업) → **패턴 4 (튜토리얼)**
5. 넷 다 애매 → 기본값 **패턴 1** 로 리프레임 시도

Part Wrap-up / Course Wrap-up 은 산출물 유형에서 직접 선택.

## 헤드라인 가드

H2 제목은 "개요", "정리", "설명", "사용법" 같은 일반어 지양. 주제 특유의 구체적 후킹 문구(명사형·의문형·조건형) 로 작성.

예:
- 명사형: `"AI 가 거짓말을 하는 이유"`, `"LLM 이란: 다음 단어를 예측하는 시스템"`
- 의문형: `"AI 는 왜 자신만만하게 틀릴까"`
- 조건형: `"매번 같은 말을 반복하고 있다면"`

## 템플릿

| 파일 | 담당 |
|------|------|
| `assets/templates/lesson-01-problem-solution.mdx` | 문제-해법 레슨 |
| `assets/templates/lesson-02-principle-consequences.mdx` | 원리→귀결 레슨 |
| `assets/templates/lesson-03-definition-application.mdx` | 정의→적용→확장 레슨 |
| `assets/templates/lesson-04-tutorial.mdx` | 튜토리얼 레슨 |
| `assets/templates/part-wrap-up.mdx` | Part Wrap-up |
| `assets/templates/course-wrap-up.mdx` | Course Wrap-up |

## 문체·포맷 규칙

`references/style-guide.md` 참조. 문체(문장형·명사형·인용) / 문단 묶기 / 내부 링크 / 이미지 / Fumadocs / frontmatter 규칙 포함.
