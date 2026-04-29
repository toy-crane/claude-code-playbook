# Claude Code Lecture — Fumadocs Site

## 개요
  - 한국어 Claude Code 강의 사이트 

## 강의 타겟
  - 개발자 2년차 이상, Cursor/Copilot 정도 다뤄 봄

## 강의에서 사용하는 환경
  - 윈도우 혹은 맥
  - Bun, NextJS, Shadcn, VS-Code, Terminal

## 강의 자료 문체
  - 기본: 본문은 **합니다체**로 작성
  - 예외: 제목, 인용구, Code block
  - 금지: 이탤릭체 사용 안 함

## Fumadocs 레퍼런스

Fumadocs 작업 시, 공식 문서를 먼저 확인하고, 작업을 진행 합니다.
- https://www.fumadocs.dev/llms.txt (인덱스)
- https://www.fumadocs.dev/llms-full.txt (전체)

## Fumadocs MDX Rules
  - frontmatter의 description은 50자에서 70자 내로 작성
  - `~`를 숫자·문자에 붙여 쓸 때는 `\~`로 이스케이프 (예: `2\~4명`). 이스케이프 없이 쓰면 GFM strikethrough로 파싱됨

## 파일명 규칙
  - 모든 콘텐츠·자산·컴포넌트 파일명은 의미 기반 kebab-case
  - 학습 순서는 `meta.json`의 `pages` 배열로만 제어

## 링크
  - 강의 문서: https://docs.claude-hunt.com (이 사이트의 배포 URL)
  - 수강생 프로젝트 공유: https://claude-hunt.com (수강생들이 만든 결과물 모음)

## 개발 워크플로우
  - 로직 변경(컴포넌트 동작, 유틸 함수, 라우트 핸들러)은 TDD로 진행 합니다
    - 실패 테스트 → 최소 구현 → 리팩터 순서
    - 테스트 파일이 없으면 먼저 만들고 시작 합니다
  - 예외: MDX 콘텐츠, 스타일·레이아웃 조정, 설정 파일 수정은 TDD 대상이 아닙니다
