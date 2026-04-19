---
title: "Demo Todo App - One-shot Prompt"
date: 2026-02-04
tags:
  - learning/courses
  - programming/claude-code
aliases:
  - "데모 Todo 앱 프롬프트"
description: "Lesson 03 강의 데모용 Todo 앱을 한번에 생성하기 위한 원샷 프롬프트"
---

# Demo Todo App - One-shot Prompt

## 용도

Lesson 03 "Agentic 코딩과 Claude Code" 강의에서 라이브 데모로 사용할 Todo 앱.
강의 중 Claude Code에게 "완료된 할일을 숨기는 필터 기능을 추가해줘"라고 요청해서 Agentic 코딩 루프를 시연한다.

## 사전 준비 (강의 전)

1. 빈 디렉토리에서 Claude Code를 실행
2. 아래 프롬프트를 그대로 입력
3. 생성 완료 후 `bun run dev`로 동작 확인, `bun test`로 테스트 통과 확인
4. 이 상태가 데모의 "시작 상태"
5. git init + 초기 커밋 (데모 실패 시 `git checkout .`으로 원복 가능)
6. 데모 프롬프트로 3-5회 리허설하여 Claude Code가 일관된 경로를 타는지 확인
7. 불안정하면 CLAUDE.md에 힌트 추가 (예: "필터는 todo-app.tsx에서 상태 관리, todo-list.tsx에 UI 추가")

## 강의 데모 워크플로우

### Step 1: 현재 상태 보여주기
- 브라우저에서 Todo 앱 실행 상태를 보여준다
- 할일 몇 개를 추가하고, 일부를 완료 체크한다
- "지금 완료된 항목을 숨기는 기능이 없습니다. Claude Code에게 추가해달라고 요청해보겠습니다"

### Step 2: Claude Code에 요청
- 터미널에서 Claude Code를 실행한다
- 입력: "이 Todo 앱에 완료된 할일을 숨기는 필터 기능을 추가해줘"
- 강조 포인트: 어떤 파일을 수정할지, 어떤 방식으로 구현할지 지시하지 않았다

### Step 3: 자율적 탐색 과정 해설
Claude Code가 동작하는 동안 학생들에게 설명:
- "지금 프로젝트 구조를 파악하고 있습니다" (파일 읽기)
- "관련 컴포넌트를 찾아서 읽고 있습니다" (코드 분석)
- "어떻게 구현할지 스스로 결정하고 있습니다" (계획 수립)

### Step 4: Permission 승인
- Claude Code가 파일 수정 승인을 요청하면 학생들에게 변경 내용을 설명한다
- "개발자가 최종 승인 권한을 가집니다. AI가 멋대로 코드를 바꾸지 않습니다"
- 승인한다

### Step 5: 검증 루프 강조
- Claude Code가 테스트를 실행하는 장면을 보여준다
- "AI가 스스로 테스트를 돌려서 기존 기능이 깨지지 않았는지 확인합니다"
- "이것이 Agentic 코딩의 핵심 -- 방향만 주면 AI가 실행과 검증을 자율적으로 반복합니다"

### Step 6: 결과 확인
- 브라우저에서 필터 기능이 추가된 것을 보여준다
- `git diff`로 변경된 코드를 간략히 보여준다

### 비상 대응
- Claude Code가 예상과 다르게 동작하면: "AI가 매번 같은 경로를 타지 않습니다. 이것도 Agentic 코딩의 특성입니다"라고 전환
- 완전히 실패하면: `git checkout .`으로 원복 후 사전 녹화본으로 전환

## 프롬프트

```
강의 데모용 Todo 앱을 만들어줘. 아래 요구사항을 정확히 따라줘.

## 기술 스택
- Next.js (App Router)
- TypeScript
- shadcn/ui (Button, Input, Checkbox, Card 컴포넌트)
- Vitest + React Testing Library
- 상태 관리: React useState (외부 라이브러리 없음)
- 데이터 저장: localStorage (DB 없음)

## 기능 요구사항

### 필수 기능 (구현할 것)
1. **할일 추가**: 텍스트 입력 + 추가 버튼. 빈 문자열은 추가 불가
2. **할일 목록 표시**: 추가된 할일을 리스트로 표시
3. **완료 체크**: 체크박스로 할일의 완료/미완료 토글. 완료된 항목은 취소선 표시
4. **할일 삭제**: 각 항목에 삭제 버튼
5. **localStorage 저장**: 새로고침해도 데이터 유지

### 미구현 기능 (절대 구현하지 말 것)
- 필터 기능 (전체/미완료/완료 필터링) -- 이것은 강의 중 Claude Code가 라이브로 추가할 기능

## 컴포넌트 구조
- `app/page.tsx`: 메인 페이지 (Todo 앱 렌더링)
- `components/todo-app.tsx`: Todo 앱 전체 컨테이너 (상태 관리)
- `components/todo-input.tsx`: 입력 폼 (텍스트 + 추가 버튼)
- `components/todo-list.tsx`: 할일 목록
- `components/todo-item.tsx`: 개별 할일 항목 (체크박스 + 텍스트 + 삭제)
- `lib/types.ts`: Todo 타입 정의

## 테스트 요구사항

`__tests__/todo-app.test.tsx` 파일에 아래 테스트를 작성:

1. 할일을 추가하면 목록에 표시된다
2. 빈 문자열은 추가되지 않는다
3. 체크박스를 클릭하면 완료 상태가 토글된다
4. 삭제 버튼을 클릭하면 항목이 제거된다
5. 여러 개의 할일을 추가할 수 있다

모든 테스트가 통과해야 한다.

## CLAUDE.md

프로젝트 루트에 CLAUDE.md를 생성하고 아래 내용을 포함:

```markdown
# Todo App

강의 데모용 Todo 앱.

## 기술 스택
- Next.js (App Router) + TypeScript
- shadcn/ui 컴포넌트
- Vitest + React Testing Library

## 명령어
- `bun run dev`: 개발 서버 실행
- `bun test`: 테스트 실행
- `bun run build`: 빌드

## 프로젝트 구조
- `components/`: UI 컴포넌트 (todo-app, todo-input, todo-list, todo-item)
- `lib/types.ts`: 타입 정의
- `__tests__/`: 테스트 파일
```

## 스타일
- 깔끔하고 미니멀한 UI
- 중앙 정렬, 최대 폭 제한 (max-w-lg)
- shadcn/ui의 기본 테마 사용

## 완료 기준
1. `bun run dev`로 앱이 정상 실행된다
2. 할일 추가, 완료 체크, 삭제가 동작한다
3. 새로고침 후에도 데이터가 유지된다
4. `bun test`로 5개 테스트가 모두 통과한다
5. 필터 기능은 존재하지 않는다
```
