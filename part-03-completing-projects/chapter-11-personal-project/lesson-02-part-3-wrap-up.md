---
title: "Lesson 02: Part 3 Wrap-up"
date: 2026-03-17
tags:
  - learning/courses
  - programming/ai-tools
  - ai/agents
  - productivity/workflow
aliases:
  - "Part 3 Wrap-up"
  - "Part 3 정리"
description: "Part 3에서 배운 SDD 사이클, Agent Teams, Git Worktree를 정리한다"
status: draft
permalink: cc-lge/part-3-wrap-up
---

# Lesson 02: Part 3 Wrap-up

## 학습 목표

- Part 3에서 배운 도구의 역할을 정리합니다

## SDD: 도구를 하나의 사이클로 통합

Part 2에서 배운 Rules, Skills, MCP, Hooks, Custom Agent를 하나의 사이클로 연결한 것이 SDD입니다.

**Spec → Wireframe → Plan → Task → Implementation → Verification**

Spec이 나머지를 결정합니다. 요구사항이 구체적일수록 Wireframe은 정확해지고, Plan은 명확해지고, Implementation은 빨라집니다. Spec Test(불변 계약)가 이 사이클의 검증 장치 역할을 합니다.

## Agent Teams: 혼자서 부족할 때

프로젝트가 커지면 Context Window의 한계, 조율 없는 병렬, 단일 관점의 사각지대가 드러납니다. **Agent Teams는 공유 Task 리스트 + 메시징으로 이 벽을 넘습니다.** "팀원끼리 대화해야 하는가?"가 Subagent와의 분기점입니다.

## Git Worktree: 병렬 작업의 안전 격리

여러 Agent가 같은 파일을 동시에 수정하면 충돌이 발생합니다. **git worktree**가 하나의 저장소에서 여러 브랜치를 별도 디렉토리에 동시에 체크아웃합니다. `claude --worktree`로 생성부터 정리까지 자동화됩니다.

## 도구가 늘어도 사이클은 같다

SDD, Agent Teams, Git Worktree가 추가되었지만, 이 도구들이 사이클을 바꾸지 않습니다. 새 도구는 사이클의 특정 단계에 끼워 넣는 것이지, 사이클 자체를 바꾸는 것이 아닙니다.

**"적절히 골라서 사이클을 닫는 것"**이 중요합니다.

## 다음 단계

Part 3에서 설계부터 배포까지의 전체 사이클을 다뤘습니다. 전체 코스를 마무리합니다.

다음 레슨 보기: [[wrap-up]]
