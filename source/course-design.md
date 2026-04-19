---
title: "Claude Code for LG Electronics"
date: 2026-01-26
tags:
  - learning/courses
  - programming/ai-tools
  - ai/agents
aliases:
  - "LG전자 개발자를 위한 Claude Code"
  - "Claude Code 오프라인 강의"
description: "LG전자 5년차 이상 개발자를 대상으로 Claude Code의 기초부터 고급 기능, Spec Driven Development, Custom MCP까지 다루는 실습 중심 강의"
permalink-prefix: cc-lge
---

# Claude Code for LG Electronics

## Overview

- **Goal**: 실제 프로젝트에서 Claude Code를 활용해 효율적으로 개발할 수 있다
- **Audience**: LG전자 5년차 이상 개발자
- **Total Time**: 24시간 (3파트, 각 8시간)
- **Format**: 이론 설명 + 실습 워크샵 혼합

### Part 1: Claude와 대화 시작하기 (8시간)

#### Chapter 01: LLM과 Claude Code 이해하기 (2시간)

- **AI가 거짓말을 하는 이유 | LLM 기초**
  - LLM이란
    - 다음에 올 가장 그럴듯한 답변을 확률적으로 예측하는 시스템
    - "맞는 답"이 아니라 "그럴듯한 답"을 만드는 것. 이 차이가 모든 한계의 출발점
    - 토큰(Token): LLM이 텍스트를 처리하는 단위. 영어 1단어 ~1-2토큰, 한국어 1글자 ~1-2토큰
  - Hallucination
    - 버그가 아니라 작동 원리의 부산물. 완전히 없앨 수 없고 줄일 수만 있음
    - 이걸 알아야 AI의 결과를 맹신하지 않고, 검증하는 습관을 갖게 됨
  - Knowledge Cutoff
    - 특정 시점까지만 학습. 최신 정보는 구조적으로 모름
  - [데모] Hallucination 발생 시연 -- 존재하지 않는 라이브러리를 물어보면 AI가 자신만만하게 틀리는 모습
  - **References**
    - [[deep-dive-into-llms-like-chatgpt]] - LLM 기초
    - [[ai-hallucination-structural-reasons-tips-gpt-gemini-grok-claude-comparison]] - Hallucination 구조적 원인
    - [[prompt-tips-to-reduce-hallucination]] - Hallucination 완화 기법

- **도구를 쥐어주면 달라지는 것들 | Tool Use & Agent**
  - Tool이란
    - LLM이 텍스트 생성 외에 할 수 있는 행동 (파일 읽기, 웹 검색, 코드 실행 등)
    - 추측 대신 직접 확인할 수 있게 해줌. Lesson 01의 한계를 도구로 보완하는 것
  - Tool이 해결하는 것
    - WebSearch, MCP로 Knowledge Cutoff 해결
    - 파일을 직접 읽어서 코드를 추측하지 않음
  - LLM vs Agent
    - 도구를 한 번 쓰는 것(LLM) vs 여러 번 반복하며 자율적으로 작업(Agent)
    - Agent = Tool + Loop + 자율적 판단
    - 4항목 비교표: Tool 사용 횟수, 실행 흐름, 의사결정, 적합한 작업
    - 단순 작업에는 LLM, 복잡한 작업에는 Agent -- 핵심 판단 기준
  - **References**
    - [[ai-agents-vs-llms-choosing-the-right-tool-for-ai-tasks]] - LLM vs Agent 선택 기준
    - [[best-practices-for-prompt-engineering]] - 프롬프트 엔지니어링 가이드

- **코딩 도구의 다음 단계 | Agentic 코딩과 Claude Code**
  - 코딩 도구의 진화 방향
    - 자동완성 -> 대화형 편집 -> Agentic. 각 단계가 AI에게 더 많은 맥락과 자율성을 부여
    - 세 접근은 대체가 아니라 공존. 특정 도구 비판 없이 접근 방식의 진화로 설명
  - [데모] 같은 프롬프트, 다른 결과
    - 설정 유무에 따른 결과 차이를 시연. 디테일은 Ch05 이후에서 다룸
  - Claude Code가 다른 점
    - Terminal-native. IDE 없이 독립 작동
    - 파일 읽기/쓰기/실행을 자율적으로 반복 (Agentic)
    - CLAUDE.md, Hooks, Skills, MCP로 동작 방식 자체를 설계 가능 (프로그래밍 가능)
  - **References**
    - [[unix-philosophy-and-ai-agentic-coding]] - Claude Code의 Unix 철학 기반 설계
    - [[claude-code-best-practices-for-agentic-coding]] - Anthropic 공식 가이드
    - [[anthropic-claude-code-success]] - Claude Code 시장 전략
    - [[i-wasnt-expecting-claude-to-release-this]] - 2026 Agentic Coding 트렌드와 멀티 에이전트 아키텍처

#### Chapter 02: Claude Code 시작하기 (2시간)

- **설치와 첫 실행**
  - 시작하기 전 확인사항 (VS Code, 터미널, 지원 OS, Anthropic 계정)
  - 설치
    - 3가지 방법: curl / Homebrew / WinGet
    - 사용법 2가지: Terminal CLI / VSCode Extension. 강의는 Terminal 사용
  - 비용 구조와 요금제
    - Max 구독 vs API 과금 차이. 자신의 사용 패턴에 맞는 선택
    - /cost (세션 비용), /usage (구독 한도)로 비용을 항상 확인할 수 있음
  - 작업별 모델 선택 가이드
    - Opus (최고 성능), Sonnet (균형), Haiku (빠르고 저렴)
    - 작업 난이도에 따라 모델을 바꿔 쓰면 비용과 품질을 조절할 수 있음
  - claude doctor로 설치 확인

- **기본 인터페이스 익히기**
  - 세션 관리
    - claude --resume, claude --continue, /exit, /clear, /help
    - 대화를 이어가거나 끊는 것이 작업 품질에 직접 영향
  - 입력 단축키
    - ! (bash 모드), @ (파일 참조), / (명령어/스킬)
    - Ctrl+C (중단), Shift+Tab (Plan Mode 전환), \ + Enter (멀티라인)
  - 권한 관리
    - Allow/Deny 승인 흐름. AI가 파일을 수정하거나 명령을 실행할 때 확인
    - --dangerously-skip-permissions: 자동화/CI용 전체 승인 모드. 위험성 이해 필수
  - 되돌리기와 복구 (Rewind/Checkpoint)
    - Esc+Esc (Rewind/Checkpoint): AI가 잘못했을 때 되돌리는 방법
    - 이미지 붙여넣기: Ctrl+V로 스크린샷 공유

- **첫 번째 대화**
  - "이 프로젝트가 뭐하는 프로젝트야?" -- 코드베이스 이해
  - "src/index.ts 설명해줘" -- 파일 읽기 도구 사용
  - "README에 내 이름 추가해줘" -- 파일 수정 + Permission 승인 체험
  - "변경사항 커밋해줘" -- git 연동 체험

#### Chapter 03: Context 관리의 기술 (2시간)

- **왜 대화가 길어지면 AI가 멍청해지나 | Context Window**
  - Context Window
    - AI가 한번에 볼 수 있는 범위. Token이라는 단위로 측정되며, 비용과 속도에 직결
    - Token 정의: 영어 1단어 ~1-2토큰, 한국어 1글자 ~1-2토큰
    - 길어지면 AI가 멍청해지는 건 기분 탓이 아니라 측정된 현상 (Context Rot)
  - Context Window의 구성
    - System Prompt + 내장 도구 정의 + MCP 스키마(MCP 첫 등장 - 콜아웃으로 간단 설명) + CLAUDE.md + 사용자 메시지 + 도구 응답
    - 사용자 메시지는 전체의 일부일 뿐. 보이지 않는 곳에서 이미 상당량 소비
    - [데모] `/context`로 실제 토큰 사용량 확인
  - 왜 짧을수록 좋은가 -- 주의력 총량은 고정, 두 가지 측면에서 품질 하락
    - (1) 위치 편향 (Lost in the Middle): 초반(Smart Zone)은 똑똑하고, 중간~후반(Dumb Zone)은 둔해짐. 중간 정보를 놓치는 경향
    - (2) 양적 희석 (지침의 저주): 지침이 많아질수록 각 지침의 주의 가중치가 분산되어 개별 영향력 희석
    - [강의 비유] 회의실 비유 -- 3가지 = 다 기억. 10가지 = 절반. 20가지 = 처음과 마지막만, 중간은 날아감
    - 연구 근거: GPT-4, Claude 모두에서 관측. 모델 규모와 무관한 구조적 한계
    - 출처: Addy Osmani "How to Write a Good Spec for AI Agents" + OpenReview 논문
  - 그래서 어떻게? -- 모듈형 프롬프트 원칙
    - 핵심: 전체를 한 번에 주지 말고, 지금 이 작업에 필요한 것만 줘라
    - 컨텍스트 품질 > 컨텍스트 양. 5k 토큰의 정확히 관련된 정보가 20k 토큰의 "혹시 필요할까봐" 정보보다 나음
    - 전략 4가지: (1) 조건부 전달 (2) 요약본 활용 -- Skills의 지연 로드가 대표 구현 (3) 서브에이전트 위임 -- 별도 Context Window에서 독립 작업하는 AI 에이전트 (4) 작업별 컨텍스트 갱신
    - Claude Code 도구-전략 매핑 테이블: Rules(경로별 로드) → Skills(호출 시 로드) → Sub-agents(별도 컨텍스트) → CLAUDE.md(상시 로드)
    - --> Chapter 06-08에서 Rules, Skills, Agents로 구체적 실습
  - **References**
    - [[ai가-긴-글을-못-읽는-이유와-context-rot-연구-요약]] - Context Rot 연구
    - [[ralph-coding-agents-notes]] - Smart Zone/Dumb Zone
    - [[how-to-write-a-good-spec-for-ai-agents]] - 지침의 저주 비유와 모듈형 프롬프트 원칙

- **프로젝트 규칙, 한 번만 설명하기 | CLAUDE.md**
  - CLAUDE.md의 역할
    - 매 대화마다 자동 로드되는 시스템 프롬프트
    - LLM은 무상태 -- 매번 프로젝트를 처음 보는 것과 같음. 한 번 써두면 매번 자동 제공
    - System Prompt 계층 구조: Anthropic 내장 -> CLAUDE.md -> 사용자 메시지
  - CLAUDE.md에 넣어야 하는 것: 한 가지 원칙
    - 분홍 코끼리 효과: Context에 넣은 정보는 모델 출력에 반드시 영향. 불필요한 정보는 지침의 저주를 가속
    - 판단 기준: "모델이 코드에서 찾을 수 있는가?" -- 찾을 수 있으면 빼기, 없으면 넣기
    - 빼야 하는 것: 기술 스택(package.json), 디렉토리 구조(파일 시스템), 실행 명령어(scripts)
    - 넣어야 하는 것: 아키텍처 결정 이유, 팀 워크플로우, 제약사항
    - [예시] 간결한 CLAUDE.md (Architecture + Workflow + Rules만)
  - 잘 쓴 CLAUDE.md의 원칙
    - 300줄 미만 권장. 짧을수록 좋다
    - /init의 한계: 생성 내용 대부분이 모델이 이미 아는 정보. 사용 시 삭제가 첫 작업
    - CLAUDE.md에 넣지 말아야 할 것: 코드에서 찾을 수 있는 정보, 일반적 프로그래밍 원칙, 민감 정보, 수시로 변하는 정보
    - 규칙 강조 시 인라인 키워드 사용 (NEVER, IMPORTANT)
  - CLAUDE.md 저장 위치 (프로젝트/개인)
    - 프로젝트 루트 CLAUDE.md: 팀 공유 (git 커밋)
    - ~/.claude/CLAUDE.md: 개인 설정, 모든 프로젝트에 적용
    - 폴더별 CLAUDE.md: 하위 디렉토리에 배치하면 해당 경로 작업 시 추가 로드
    - 충돌 시 우선순위: 가장 가까운 CLAUDE.md가 우선
  - 실습: 프로젝트에 맞는 CLAUDE.md 작성

- **대화가 끊겨도 기억되는 것 | Memory**
  - Memory 시스템 개요
    - CLAUDE.md는 규칙 전달, Memory는 대화 중 배운 것을 자동 저장
    - 세션 시작 시 "Recalled X memories"로 불러옴
  - CLAUDE.md vs Memory 비교
    - 저장방식(수동/자동), 범위(팀/개인), 내용(규칙/학습), 우선순위
    - CLAUDE.md가 항상 우선. Memory는 빈칸을 채우는 역할
  - Memory 저장 위치
    - ~/.claude/projects/ 아래 프로젝트별 폴더
    - MEMORY.md(인덱스) + 주제별 파일, 200줄 제한
    - 로컬 전용, git에 커밋되지 않음
  - Memory 동작 시점
    - 세션 시작(Recall), 대화 중(자동 감지/수동), "기억해"/"잊어"
  - 실습: /memory 확인, 선호 저장, 새 세션에서 검증
  - Memory에 저장하면 안 되는 것: 비밀 정보, 팀 규칙, 코드에서 읽을 수 있는 정보

- **대화를 잘 끊는 기술 | Task Sizing**
  - 가장 효과적인 Context 관리 = Task Sizing
    - Context window는 생각보다 훨씬 작음. 하나의 context에 하나의 작업, 끝나면 새 context
    - 좋은 단위: 수정 -> 테스트 -> 커밋 = 하나의 context
  - 이럴 때 새 대화를 시작하라
    - 다른 종류의 작업으로 전환할 때
    - AI 응답 품질이 눈에 띄게 떨어졌을 때
    - 커밋 완료 직후 (자연스러운 구분점)
    - 확신이 없으면 새 대화가 거의 항상 더 낫다
  - /clear vs /compact 비교
    - /clear: Context window를 완전히 초기화. CLAUDE.md는 유지됨. Smart Zone으로 즉시 리셋
    - /compact: 요약으로 context를 줄이지만 뉘앙스 손실. 물/컵 비유로 설명
    - 비교표: 동작 방식, 남는 것, 적합한 상황. /clear가 거의 항상 더 나은 선택
    - 두 번 수정 요청해도 안 고쳐지면? /clear하고 재시작이 낫다
  - **References**
    - [[ralph-coding-agents-notes]] - Task Sizing
    - [[using-claude-md-files-customizing-claude-code]] - /clear 사용법

#### Chapter 04: 실습 - Todo 앱 만들기 (2시간)

- **계획을 먼저 세워야 하는 이유 | Plan Mode**
  - 왜 바로 코딩하면 안 되는가
    - AI는 매 세션마다 프로젝트를 처음 보는 것과 같음. 먼저 탐색하고 이해해야 제대로 된 코드를 씀
    - 개발자도 원하는 것을 처음부터 정확히 알지 못함. 계획을 주고받으며 요구사항이 선명해짐
  - 좋은 계획의 두 가지 조건
    - 간결함: 계획은 짧을수록 좋음. 길면 대충 스크롤하고, 짧으면 진짜 읽게 됨
    - 미해결 질문: 끝에 미해결 질문을 두면 AI가 모르는 것을 먼저 물어봄
  - [데모] Shift+Tab 진입 -> 탐색 -> 계획 제안 -> 질문 -> 승인 -> 실행 전환
  - (예고) Chapter 5에서 복잡한 작업의 계획 분할과 고급 활용
  - **References**
    - [[i-was-an-ai-skeptic-then-i-tried-plan-mode]] - Plan Mode 철학과 실제 사용 예시
    - [[claude-code-practical-strategies-from-creator]] - 계획 모드 우선 접근법

- **요구사항 정리하기**
  - 실습 프로젝트: Next.js + Shadcn Todo 앱
    - Next.js: AI 학습 데이터에 가장 풍부한 full-stack React 프레임워크
    - Shadcn: 코드가 프로젝트 안에 복사되어 AI가 직접 읽고 수정 가능. Tailwind CSS로 스타일 인라인 관리
    - 프로젝트 생성: shadcn CLI init으로 scaffolding
  - 자연어로 스펙 작성하는 방법
    - 두 섹션 형식: 기능 목록 + 범위 제한
    - 구체적 행동과 경계를 명시적으로 ("~하면 ~한다" 형식)
  - **References**
    - [[ultimate-shadcn-ui-claude-code-workflow]] - Shadcn이 AI 시대에 유리한 이유

- **직접 만들어보기 | 프로젝트 셋업부터 검증까지**
  - Step 1: bun 설치와 프로젝트 생성 (bunx shadcn@latest init)
  - Step 2: CLAUDE.md 직접 작성 (Architecture + Workflow + Rules)
  - Step 3: 요구사항 문서 작성 (기능 목록 + 범위 제한)
  - Step 4: Plan Mode로 계획 수립
  - Step 5: 계획 검토와 승인 -> AI가 코드 작성
  - 검증 체크리스트 (5개 핵심 시나리오)
    - 브라우저에서 직접 확인: Todo 추가, 빈 입력 방지, 완료 토글, 삭제, 새로고침 유지
  - 검증의 한계 체감
    - "이제 필터링 기능을 추가하면, 이 체크리스트를 처음부터 다시 해야 합니다"
    - 코드 한 줄 바꿀 때마다 검증 반복 = 스케일 불가
  - (예고) Part 2에서 이 체크리스트를 자동화하는 방법을 배운다
  - **References**
    - [[i-was-an-ai-skeptic-then-i-tried-plan-mode]] - Plan Mode 실제 사용

- **Part 1 Wrap-up**
  - Part 1에서 배운 내용 정리
    - LLM 기초: Hallucination, Knowledge Cutoff, Tool Use, Agent
    - Claude Code 기본: 설치, 인터페이스, 권한 관리
    - Context 관리: Context Window, CLAUDE.md, Memory, Task Sizing
    - 실전 워크플로우: Plan Mode, 요구사항 작성, Todo 앱 구현과 검증
  - Q&A

---

### Part 2: Claude를 내 방식으로 확장하기 (8시간)

#### Chapter 05: 큰 작업을 작은 단위로 나눠서 실행하기 | Plan, Task (2시간)

- **What vs How | AI에게 일 시키는 두 가지 방법**
  - 뽑기 vs 자판기
    - LLM은 본질적으로 뽑기 기계. Part 2의 목표는 이 뽑기를 자판기로 바꾸는 것
    - 그 첫 번째 전환점이 지시 방식
  - What vs How
    - 택시 비유: How = "100m 직진, 우회전, 300m..." / What = "강남역이요"
    - How: 단계를 하나하나 지시. "auth.ts를 열어서 bcrypt를 import하고..."
    - What: 목적지만 알려주고 방법은 맡김. "Todo 항목에 삭제 기능을 추가해줘"
  - What 방식이 AI에게 유리한 이유
    - What은 AI가 막혔을 때 스스로 다른 방법을 시도할 수 있음 (자율적 루프)
    - 코드는 실행하면 맞다/틀리다가 바로 나오는 매체. 이 특성이 What 방식을 가능하게 함
  - [실습] How vs What 비교 -- 같은 기능을 How/What 두 방식으로 지시하고 차이를 체험
  - **References**
    - [[declarative-thinking-for-ai-collaboration]] - What vs How와 AI 위임의 구조
    - [[karpathy-notes-on-claude-coding]] - 성공 기준 기반의 에이전트 활용
    - [[beyond-vibe-coding-with-addy-osmani]] - 70% 문제와 검증의 필요성
    - [[quality-assurance-guide-for-claude-code]] - Feedback Loop와 검증 채널
    - [[claude-code-feature-senior-engineers-missing]] - Self-validating Agent
    - [[code-is-cheap-software-is-expensive]] - 코드는 싸졌지만 설계는 여전히 비싸다
    - [[시니어-개발자들이-ai-코딩-도구를-받아들이는-진짜-이유]] - 시니어 개발자의 AI 도구 채택 패턴
    - [[i-was-wrong]] - Agent-Friendly DX 원칙, 피드백 루프 설계
    - [[i-wasnt-expecting-claude-to-release-this]] - "올바른 답이 어떤 모습이어야 하는지 아는 것"이 AI 활용의 핵심

- **수동 검증에서 벗어나기 | 테스트 기반 검증**
  - 문제 회기: Ch04의 수동 체크리스트를 브라우저에서 반복 확인하는 한계
  - 테스트 = AI가 읽을 수 있는 정답지 (정답지가 있으면 채점자가 스스로 채점)
  - [데모] 체크리스트를 테스트 코드로 변환: AI에게 체크리스트를 주고 테스트 코드 생성
  - [데모] 기존 기능 보호: 우선순위 기능 추가 시 기존 테스트가 문제를 잡고 AI가 수정
  - 테스트 외 자동 검증 수단(타입 체커, Hook) 예고
  - **References**
    - [[quality-assurance-guide-for-claude-code]] - Feedback Loop와 검증 채널
    - [[i-was-wrong]] - Agent-Friendly DX 원칙, 피드백 루프 설계

- **성공 기준에서 검증된 코드까지 | Red Green Refactor**
  - 검증 가능한 성공 기준
    - AI가 "됐다/안됐다" 판단 가능한 성공 기준이 계획에 포함되어야 함
    - 성공 기준 작성법: 구체적 입력(조건)과 기대 출력(결과) 명시
    - 요구사항 + 성공 기준 + 범위 제한 -- 세 가지가 AI가 가장 잘 실행하는 계획
  - 테스트를 먼저 쓰는 이유 (자기 확인 편향)
  - Red Green Refactor 사이클: Red(실패) -> Green(통과) -> Refactor(정리), 한 번에 하나의 테스트만
  - [데모] Todo 앱 필터링 기능: 성공 기준 포함 프롬프트 -> Plan Mode -> RGR 실행
  - 계획은 반복: Plan -> 실행 -> 발견 -> 다시 Plan
  - **References**
    - [[i-was-an-ai-skeptic-then-i-tried-plan-mode]] - Plan Mode 철학과 반복 사이클
    - [[specification-driven-development-sdd]] - 구조화된 요구사항과 성공 기준
    - [[claude-code-practical-strategies-from-creator]] - 계획 모드 우선 접근법

- **대화가 끊겨도 이어서 일하기 | Task 기본**
  - auto-compact의 한계 -- 구조 정보 유실
    - Context window 초과 -> auto-compact가 대화를 요약 -> 의존성/진행 상태 같은 구조 정보가 손실 압축
    - 코드는 파일에, 대화 흐름은 요약에 남지만, 계획의 구조는 정확도를 잃음
  - Task 시스템 기본
    - .claude/tasks에 JSON 저장, auto-compact 영향 없음
    - 상태 추적: pending/in_progress/completed, Ctrl+T
  - blockedBy/blocks로 작업 순서 관리
  - [실습] Todo 앱 기능 추가를 Task로 분해 -> 실행
  - **References**
    - [[claude-codes-new-task-system-explained]] - Task 시스템 상세 설명
    - [[claude-code-tasks-upgrade]] - Task 시스템 진화 과정
    - [[the-swarm-has-arrived]] - Task = 조율 레이어 프레이밍

#### Chapter 06: 지식 추가하기 | Rules, Commands, Skills (1.5시간)

- **규칙을 필요한 곳에만 적용하기 | Rules**
  - CLAUDE.md Rules 섹션의 한계: 모든 규칙이 경로와 무관하게 항상 전부 로드
  - `.claude/rules/` 파일 구조: 주제별 마크다운 파일로 규칙 분리
  - `paths` frontmatter: glob 패턴으로 특정 경로에서만 규칙 활성화
  - CLAUDE.md vs 하위 폴더 CLAUDE.md vs Rules: 맥락 정보 vs 제약사항 구분
  - [실습] Todo 앱에 경로별 규칙 분리 (components.md, testing.md, plan-mode.md)

- **반복 프롬프트를 한 단어로 | Custom Commands**
  - Custom Command 개념
    - 매번 같은 형식으로 계획을 요청하면 반복이 생긴다
    - `.claude/commands/`에 마크다운 파일 하나 = Command 하나
    - /plan, /review 같은 팀 공유 워크플로우
  - Command 파일 작성 방법
    - 마크다운 프롬프트 + $ARGUMENTS 변수
    - Frontmatter 옵션: allowed-tools, description 등으로 Command 동작 제어
    - 프로젝트 vs 사용자 레벨
  - [실습] 자주 쓰는 프롬프트를 Custom Command로 만들기

- **필요할 때만 로드하기 | Skills**
  - Context 절약을 위한 지연 로드 (<-- Chapter 03 Lesson 01 "모듈형 프롬프트 원칙"의 구현)
    - CLAUDE.md에 모든 지침 넣으면 매 메시지마다 전체 로드 = 지침의 저주 발동
    - Progressive Disclosure 패턴 (3단계): 이름만(~30 토큰) -> 설명 -> 전체 지침
    - Skill은 호출 시에만 로드. 전문 지침을 Skill로 분리하면 기본 context가 깨끗해짐
  - Command vs Skill 차이점
    - Command = 사용자가 수동 호출. Skill = AI가 상황에 맞게 자동 로드
  - 커뮤니티 Skill 활용법
    - Skill.sh: 커뮤니티가 만든 Skill 모음. 검색 + 한 줄 설치
    - Anthropic 공식 플러그인: Anthropic이 관리하는 공식 Skill/Plugin 소개
    - 직접 만들기 vs 가져다 쓰기 판단 기준
  - [실습] Command를 Skill로 전환하기 + commit Skill 작성 실습
  - **References**
    - [[demystifying-agent-capabilities-skills-sub-agents-mcp-and-custom-commands]] - Skills와 Agent 기능 해부
    - [[claude-code-context-window-optimization-guide]] - Skills와 컨텍스트 격리

- **Skill 만들고 검증하기 | Skill Creator**
  - Skill Creator 플러그인: Create/Eval 모드
  - Eval: Skill이 기대대로 동작하는지 확인하는 테스트
  - 유형별 Eval 목적: 능력 보강(아직 필요한가?) vs 절차 기록(우리 방식대로 하는가?)
  - Benchmark 모드: 여러 시나리오에서 성능 측정 (간략 소개)
  - [실습] Skill Creator로 commit Skill 재생성 + Eval 작성
  - **References**
    - [[skill-creator-test-measure-refine]] - Skill Creator 블로그 포스트

#### Chapter 07: 외부 시스템 연결하기 | MCP, CLI (2시간)

- **Claude에게 새 능력 부여하기 | MCP**
  - MCP(Model Context Protocol)란?
    - Claude가 외부 시스템에 접근할 수 있게 해주는 표준 프로토콜
  - MCP가 필요한 이유와 활용 사례
    - Notion 검색, Slack 메시지 읽기, 데이터베이스 쿼리 등
  - MCP 서버/클라이언트 구조
  - 자주 쓰는 MCP 추천
    - GitHub: 저장소, 이슈, PR 관리
    - Linear: 이슈 관리
    - Jira: 프로젝트 관리
  - CLI가 없는 서비스의 연결
    - Stitch (Google UI-to-Code), Figma MCP 등 MCP가 유일한 AI 연결 수단인 서비스
  - [데모] GitHub MCP 설치 및 사용
  - **References**
    - [MCP 공식 문서](https://modelcontextprotocol.io/)
    - [[extending-claude-capabilities-with-skills-and-mcp]] - Anthropic 공식 블로그

- **같은 서비스, 다른 접근법 | CLI 도구 활용**
  - MCP vs CLI 비교
    - 핵심 차이: MCP는 AI만 쓸 수 있고, CLI는 개발자도 AI도 쓸 수 있음
    - 비교표: 누가 쓰는가, 디버깅, 데이터 흐름, 설치 후 관리
  - CLI가 AI와 잘 맞는 4가지 이유
    - AI가 이미 CLI를 안다 (학습 데이터에 포함)
    - 사용법을 물어볼 수 있다 (--help)
    - 결과를 가공할 수 있다 (파이프)
    - 실행하고 끝난다 (프로세스 없음)
  - 결과를 파일로 우회하기
    - MCP: 결과가 대화창에 쏟아짐. CLI: 결과를 파일에 저장, 필요한 만큼만 읽기
    - 핵심: 대화창을 거치지 않아도 되는 데이터는, 거치지 않는다
  - [실습] gh CLI로 같은 작업 수행, MCP 결과와 비교 체감
  - **References**
    - [[mcp-is-dead-long-live-the-cli]] - CLI가 MCP를 대체하는 흐름
    - [[mcp-vs-cli-comparison-analysis]] - MCP vs CLI 비교 분석

- **내 시스템을 Claude에 연결하기 | Custom MCP 서버 만들기**
  - CLI가 있는 서비스는 CLI를 우선. CLI가 없는 내부 시스템은 MCP 서버를 직접 만듦
  - MCP의 내부 구조 (Server/Client/Host)
    - Server: Tool, Resource, Prompt를 노출하는 프로그램
    - Client: Server에 연결하여 Tool을 호출하는 쪽 (Claude Code)
    - Host: Client를 포함하는 프로그램 (Claude Code, Cursor 등)
  - MCP Builder Skill로 MCP 서버 생성
    - skills.sh에서 mcp-builder 설치
    - 날씨 API (Open-Meteo) MCP 서버 프로젝트 생성
  - 생성된 코드 이해
    - 서버 선언, Tool 정의 (registerTool), stdin/stdout 통신
    - Tool 설정의 세 필드: title, description, inputSchema
  - Claude Code에 연결 (claude mcp add) 및 테스트
  - MCP 서버 개발 핵심 원칙
    - Tool 설명이 선택을 결정
    - 입력 스키마가 인터페이스
    - 복잡성은 서버 안에 숨긴다
  - **References**
    - [MCP 공식 문서](https://modelcontextprotocol.io/)

- **도구 연결 + 사용 설명서 | 외부 도구와 Skills의 시너지**
  - 도구와 절차: 두 개의 층 (작업대 비유)
    - Capability Layer(도구) = CLI + MCP, 작업대 위의 도구
    - Procedure Layer(절차) = Skill, 숙련된 직원의 안내
  - 외부 도구 vs Skill: 구조적 차이
    - 3열 비교표: CLI, MCP, Skill
    - Capability Layer(도구 접근) vs Procedure Layer(사용 절차) 개념
  - 언제 무엇을 써야 하는가
    - 판단 기준: 접근이 필요하면 CLI/MCP, 절차가 필요하면 Skill
  - 결합의 시너지: 1 + 1 > 2
    - 세 가지 효과: 명확한 탐색, 신뢰할 수 있는 조율, 일관된 품질
    - 예시 1: CLI + Skill (gh CLI + code-review Skill)
    - 예시 2: MCP + Skill (Linear MCP + implement-issue Skill)
  - **References**
    - [[extending-claude-capabilities-with-skills-and-mcp]] - Anthropic 공식 블로그
    - [[demystifying-agent-capabilities-skills-sub-agents-mcp-and-custom-commands]] - 기능 비교표
    - [[mcp-vs-cli-comparison-analysis]] - MCP vs CLI 비교 분석
    - [[mcp-vs-cli-skill-trend]] - MCP/CLI/Skill 트렌드

#### Chapter 08: 실행 흐름 제어하기 | Hooks, Custom Agent (1시간)

- **AI가 코드 고칠 때마다 자동 검증 | Hooks**
  - CLAUDE.md 지침(권고) vs Hook(무조건 실행)
    - CLAUDE.md: AI가 데이터를 본 후 판단. 무시할 수 있고, 이미 context 오염
    - Hook: 데이터가 AI에 도달하기 전에 필터링. 매번 100% 실행
    - 비교표: 실행 보장, 타이밍, 컨텍스트 영향
  - Hook의 세 가지 실행 시점
    - PreToolUse: 도구 실행 전 명령 수정/차단
    - PostToolUse: 도구 실행 직후 단일 파일 검증 ($FILE_PATH)
    - Stop: 작업 완료 시 통합 검증 (빌드, 전체 테스트)
  - Hook으로 불필요한 데이터 필터링
    - 테스트 로그 2,000줄 -> Hook으로 FAIL/ERROR만 필터링 -> 50줄만 context에 진입
  - [실습 1] PostToolUse: 파일 수정 후 자동 Lint Hook (인라인 command)
  - [실습 2] PreToolUse: 테스트 출력 필터링 Hook (별도 셸 스크립트)
  - **References**
    - [[claude-code-context-window-optimization-guide]] - Hooks와 컨텍스트 전처리
    - [[claude-code-feature-senior-engineers-missing]] - Hooks와 자기검증 Agent

- **역할 분담이 아니라 컨텍스트 제어 | Custom Agent**
  - 탐색 작업이 컨텍스트를 오염시키는 이유
    - 탐색/조사를 Subagent에 위임 -> 별도 context에서 실행
    - 메인 context에는 요약만 반환. 탐색 결과가 메인을 오염시키지 않음
  - Subagent: 조사를 위임하고 보고서만 받기
    - `.claude/agents/`에 마크다운 파일로 전문 에이전트 정의
    - 용도별 Agent: 탐색용, 리뷰용, 테스트용
  - Custom Agent: 전문 Subagent를 정의하기
  - 직접 만들어보기: 코드 리뷰 전문 Agent
  - **References**
    - [[demystifying-agent-capabilities-skills-sub-agents-mcp-and-custom-commands]] - Subagent 아키텍처
    - [[claude-code-context-window-optimization-guide]] - Subagent와 컨텍스트 격리
    - [[i-wasnt-expecting-claude-to-release-this]] - Orchestrator + 전문 에이전트 위임 패턴
    - [[no-vibes-allowed-context-engineering]] - 서브 에이전트는 역할이 아니라 컨텍스트 제어

- **Part 2 Wrap-up**
  - Part 2에서 배운 내용 정리
    - Context 품질 도구: Rules, Commands, Skills, CLI, MCP, Hooks, Custom Agent
    - 핵심 원칙: 지식 추가(Rules, Skills) -> 범위 확장(CLI, MCP) -> 데이터 제어(Hooks, Agent)
  - [강의 비유] 전체 정리 -- 레스토랑 주방
    - Claude = 실력 좋은 요리사가 오늘 이 식당에 처음 출근. 실력은 뛰어나지만 메뉴판, 주방 구조, 단골 취향을 모름
    - Part 1-2에서 배운 모든 도구를 주방에 비유
      - CLAUDE.md = 식당 운영 매뉴얼 ("MSG 안 쓰고, 플레이팅은 이 스타일로")
      - Tools = 칼, 오븐, 프라이팬 -- 실제로 요리할 수 있는 도구
      - Slash Command = 세트 메뉴 ("A세트요" 한 마디로 정해진 구성이 돌아감)
      - Skills = 레시피 (표준 조리법, 필요할 때만 꺼내봄)
      - MCP = 식자재 납품업체 (외부 재료 연결)
      - Hooks = 서빙 전 최종 검수 (접시 나가기 전 자동 확인)
      - Custom Agent = 부주방장에게 위임 ("소스는 네가 맡아")
      - HITL = "손님이 견과류 알레르기래요. 어떻게 할까요?" -- 사장님한테 확인
    - 주문 하나의 흐름으로 보면
      - 출근 -> 매뉴얼(CLAUDE.md) -> "A세트요"(Command) -> 레시피 확인(Skill) -> 재료 꺼내 조리(Tools) -> 식자재 주문(MCP) -> 부주방장 위임(Agent) -> 사장님 확인(HITL) -> 최종 검수(Hooks)
    - 자동완성 vs 에이전트의 핵심 차이
      - 자동완성(자판기): 버튼 누르면 정해진 것만 나옴. 코드 패턴 없으면 제안 못 함
      - 에이전트(요리사): 재료 없으면 "대체 재료로 할까요?" 물어보고(Question), 맛 보고 간을 다시 맞춤(Loop)
  - 베스트 프랙티스 체크리스트
  - Q&A
  - **References**
    - [[claude-code-best-practices-for-agentic-coding]] - Anthropic 공식 베스트 프랙티스
    - [[software-3-0-era]] - Harness 비유, 레이어드 아키텍처 매핑, Exception->Question

---

### Part 3: Claude와 프로젝트 완성하기 (8시간)

#### Chapter 09: Spec Driven Development

- **위임 범위가 커지면, 경계도 단단해져야 한다 | SDD**
  - 위임의 단위가 커질수록, 경계(명세)가 더 단단해야 한다
  - SDD 5단계 사이클: Spec -> Wireframe -> Plan -> Task -> Implementation
  - 왜 지금 SDD가 가능한가
  - 다양한 SDD 접근법: spec-kit (GitHub), Superpowers (obra), oh-my-claudecode (Yeachan-Heo)
  - 워크플로우는 커스텀하는 것: 먼저 완주 후 커스텀
  - **References**
    - [[specification-driven-development-sdd]] - SDD 방법론
    - [[declarative-thinking-for-ai-collaboration]] - 위임 범위와 경계의 관계
    - [[code-is-cheap-software-is-expensive]] - 무엇을 원하는지 파악하는 것이 비싼 이유

- **엔지니어링 템플릿으로 프로젝트 시작하기 | 프로젝트 셋업**
  - GitHub에서 harness-engineering-template 클론
  - shadcn preset 적용 (선택)
  - 템플릿 도구 확인: CLAUDE.md, Hooks (lint/auto-test/final-test-gate), Rules (shadcn-guard), Skills (/writing-spec, /sketching-wireframe, /writing-plan, /make-something), Agent (spec-reviewer, plan-reviewer)
  - Spec Test 워크플로우 간략 소개

- **수동 요구사항을 Spec 문서로 자동화하기 | Spec 작성**
  - /writing-spec의 4단계 워크플로우: 질문 → 문서 생성 → spec.yaml 추출 → 독립 리뷰
  - Step 1: 변경 비용이 높은 결정부터 질문으로 빈칸 채우기
  - Step 2: Spec 문서 생성 -- 전제 조건과 미결정 사항 분리, 제외 이유, 구현 방법 배제
  - Step 3: spec.yaml 추출 -- 성공 기준 → Spec Test 변환
  - Step 4: spec-reviewer 에이전트 독립 리뷰 + 수동 검토 기준 3가지
  - **References**
    - [[specification-driven-development-sdd]] - 시나리오 형식과 성공 기준 템플릿

- **설계도를 그리는 기술 | Wireframe 그리기**
  - /sketching-wireframe의 3단계 워크플로우: 화면 분류 → 기본 화면 생성 → 시나리오별 화면 추가
  - Step 1: 시나리오를 시각적 화면 단위로 분류
  - Step 2: 기본 레이아웃 생성 + Vite 실시간 피드백 루프
  - Step 3: 시나리오별 화면 추가 + Wireframe 검토 기준
  - Wireframe이 Plan의 추측을 줄이는 이유
  - **References**
    - [[specification-driven-development-sdd]] - Wireframe의 역할

- **계획에 검증을 심는 법 | Plan 작성**
  - /writing-plan의 3단계 워크플로우: 미결정 사항 해결 → UI 컴포넌트 탐색 → Plan 생성
  - Step 1: 구현 방향 미결정 사항 질문으로 해결
  - Step 2: shadcn 레지스트리에서 UI 컴포넌트 탐색
  - Step 3: Plan 문서 생성 -- Spec Test를 첫 번째 Task로 배치
  - Spec Test: 불변 계약 (Spec Test vs 구현 테스트 비교)
  - Plan 검토 기준
  - **References**
    - [[specification-driven-development-sdd]] - SDD 워크플로우 전체 흐름

- **구현에서 배포까지 | 구현과 배포**
  - Implementation: Task 순서대로 실행, Hook 자동 검증
  - 최종 검증: Spec Test 통과 + 브라우저 확인 + 기준 대조
  - 서비스 배포하기: Vercel Import, 환경 변수 설정, 배포 실행, 자동 배포, 문제 해결
  - **References**
    - [[specification-driven-development-sdd]] - SDD 워크플로우 전체 흐름
    - [[quality-assurance-guide-for-claude-code]] - Feedback Loop와 검증 채널

#### Chapter 10: Agent Teams으로 협업하기

- **혼자 vs 같이 | Agent Teams 기초**
  - Single Agent의 한계
  - Agent Teams란 (공유 Task 리스트 + 메시징)
  - Agent Teams vs Subagent 비교
  - 언제 Teams를 쓸까
  - **References**
    - [[orchestrate-teams-of-claude-code-sessions]] - Anthropic 공식 가이드
    - [[the-swarm-has-arrived]] - Task = 조율 레이어
    - [[anthropic-just-dropped-agent-swarms]] - Agent Teams 개요
    - [[claude-code-agent-teams]] - Agent Teams 심화
    - [[claude-code-agent-teams-install-and-usage]] - 내부 도구 분석

- **AI와 함께 안전하게 리팩토링하기**
  - 한 번에 하나만 바꾸는 원칙
  - 4단계 사이클: Characterization Test, 규칙 설정 + 변환 실행, 의미적 변경, 패턴 누적
  - **References**
    - [[scaling-long-running-autonomous-coding-ko]] - 병렬 에이전트 연구

- **병렬 작업을 안전하게 격리하기 | Git Worktree**
  - git worktree 개념과 수동 사용
  - claude --worktree로 격리된 에이전트 세션
  - VS Code에서 worktree 활용
  - 안전망 vs 격리 판단 기준
  - **References**
    - [[claude-worktree-parallel-agents]] - Matt Pocock 영상

#### Chapter 11: 개인 프로젝트 실습

- **개인 프로젝트 실습**
  - /make-something으로 아이디어 찾기: 소크라테스식 질문, 무료 도구 매핑, idea.md 생성
  - 적절한 크기: 페이지 2-3개, 핵심 기능 1-2개, 시나리오 5-7개
  - 실습 워크플로우: ch09 칸반 보드와 동일한 SDD 사이클
  - 실습 규칙
  - Part 3 정리 통합: SDD 사이클 요약, Agent Teams/Worktree 요약, "도구가 늘어도 사이클은 같다"

---

### Course-final Wrap-up

- **Course Wrap-up**
  - 전체 코스 가볍게 요약
  - 이 강의 이후 학습 방향
    - Compound Engineering: Plan -> Work -> Review -> Compound 루프. 해결한 문제를 CLAUDE.md/Skills에 기록해서 다음 작업이 더 빨라지는 복리 효과
    - Git worktree, Conductor로 병렬 작업
    - 실전 팁 공유

---

## 강사

### 소개
- 김한울 (Toy Crane)
- Product Maker / Full-stack Developer
- 인프런, 패스트캠퍼스, 스파르타 코딩클럽 강의 경력
- Claude Code 기반 AI 프로덕트 개발 및 운영 (Dearly, Go Parkgolf)
- Claude Code, AI 도구 활용법 콘텐츠 크리에이터

### 강의 동기
- GitHub Copilot 자동완성만으로는 한계가 있었다
- Claude Code의 Agentic 코딩이 개발 방식을 근본적으로 바꿔놓았다
- 직접 프로덕트를 만들며 체득한 실전 워크플로우를 전달하고 싶었다

### 수강 후 변화

| Before | After |
|--------|-------|
| AI에게 한 줄씩 지시하고 결과를 일일이 확인 | 성공 기준만 주고 AI가 스스로 검증하며 구현 |
| 대화가 길어지면 AI 응답 품질이 떨어져 답답함 | Context 관리로 항상 최적의 AI 성능 유지 |
| 간단한 기능도 직접 코딩하는 데 시간 소모 | Spec -> Wireframe -> Plan -> Task 사이클로 기능 단위 위임 |

## Tech Stack

| Tool | Choice |
|------|--------|
| Package manager | bun |
| Framework | Next.js |
| Language | TypeScript |
| UI | Shadcn + Tailwind CSS |

## Image Theme

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary dark | #3D3D3D | Main shapes, text, labels |
| Light fill | #F0F0F0 | Secondary shapes, backgrounds |
| Accent | #FF6D00 | Single key highlight per image |
| Background | #FFFFFF | Canvas |
| Border | #E0E0E0 | Optional shape borders |

## 용어 규칙

| 사용 금지 | 대체어 | 비고 |
|-----------|--------|------|
| 사용자 스토리 / User Story | 시나리오 | [상황]/[동작] 형식으로 작성 |
| Acceptance Criteria | 성공 기준 | Ch05에서 정의, 이후 일관 사용 |
| 레버리지 / Leverage | 증폭 효과 | Ch05 L03에서 정의, 이후 일관 사용 |

## References

### Vault
- [[deep-dive-into-llms-like-chatgpt]]: LLM 기초 개념 참고
- [[ai-hallucination-structural-reasons-tips-gpt-gemini-grok-claude-comparison]]: Hallucination 설명 자료
- [[best-practices-for-prompt-engineering]]: 프롬프트 엔지니어링 가이드
- [[declarative-thinking-for-ai-collaboration]]: What vs How 프레임워크, AI 위임의 구조
- [[claude-code-context-window-optimization-guide]]: Context 품질 관리 전략 가이드

### External
- [Anthropic Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action): 공식 교육 과정
- [Coursera - Claude Code](https://www.coursera.org/learn/claude-code): Vanderbilt 대학 과정
- [Udemy - Claude Code Beginner to Pro](https://www.udemy.com/course/learn-claude-code/): 실습 중심 강의
