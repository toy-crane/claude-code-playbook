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
  - `~`는 범위 구분자로 쓰지 말 것 (GFM strikethrough). 범위는 `-` 사용

## 파일명 규칙
  - 모든 콘텐츠·자산·컴포넌트 파일명은 의미 기반 kebab-case
  - 학습 순서는 `meta.json`의 `pages` 배열로만 제어
  - 이미지는 `public/docs/{part}/{chapter}/`에 두고 절대경로(`/docs/...`)로 참조
