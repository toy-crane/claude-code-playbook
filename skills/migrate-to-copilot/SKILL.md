---
name: migrate-to-copilot
description: |
  Claude Code 자료를 GitHub Copilot CLI 호환 형태로 사전 변환합니다.
  학생이 강의 마지막 개인 프로젝트 시간 Claude Pro 토큰을 소진해 Copilot CLI 로
  갈아타도 그대로 작동하도록 .claude/commands/ → .claude/skills/ 변환,
  .claude/agents/ → .github/agents/ 복사, .claude/settings.json hooks →
  hooks.json 번역까지 한 번에 처리합니다. "마이그레이션", "Copilot 으로
  갈아타기", "fallback 준비", "Copilot CLI 호환" 같은 표현이나 토큰 소진 대비
  작업에 즉시 사용하세요.
allowed-tools: Read, Write, Edit, Bash, Glob, LS
---

# Migrate to Copilot CLI

Claude Code 의 commands·agents·hooks 를 GitHub Copilot CLI 가 인식하는 위치·스키마로 변환합니다. 강의 마지막 개인 프로젝트 시간에 Claude Pro 토큰을 소진해도 같은 프로젝트를 Copilot CLI 로 그대로 이어갈 수 있게 사전 준비하는 도구입니다.

## When to use

- 학생이 "Copilot CLI 도 쓸 수 있게 미리 준비해줘", "fallback 준비", "Copilot 으로 갈아타기" 같은 표현으로 요청할 때
- 강의 개인 프로젝트 챕터 시작 전, Claude Code 가 살아있는 동안
- `.claude/commands/`, `.claude/agents/`, 또는 `.claude/settings.json` 의 hooks 가 있는 프로젝트에서

호출은 한 번이면 충분합니다. 두 번째 실행 시에는 이미 변환된 항목을 SKIP 하고 차이만 처리합니다.

## 핵심 정책

이 스킬은 다음 정책으로 동작합니다. 학생에게도 명시적으로 보고합니다.

- **Commands → Skills**: MOVE. `.claude/commands/<name>.md` 는 `.claude/skills/<name>/SKILL.md` 로 변환한 뒤 원본 삭제. 두 도구 모두 `.claude/skills/` 를 인식하므로 슬래시 `/<name>` 호출은 그대로 동작합니다.
- **Agents**: COPY. `.claude/agents/*.md` 는 `.github/agents/` 로 복사. Claude Code 는 `.claude/agents/`, Copilot CLI 는 `.github/agents/` 만 인식하므로 둘 다 보존합니다. 동명 파일이 이미 있으면 SKIP 합니다.
- **Hooks**: 번역 후 추가. `.claude/settings.json` 의 hooks 블록은 그대로 두고, Copilot CLI 가 인식하는 `hooks.json` 을 프로젝트 루트에 새로 생성합니다.
- **Idempotency**: 목적지에 이미 있는 항목은 SKIP, 통계에 보고합니다.

## Step 1: Discovery

먼저 현재 프로젝트에 무엇이 있는지 확인하고 사용자에게 보고합니다.

다음을 검색합니다.

- `.claude/commands/` — 변환 대상 commands
- `.claude/agents/` — 복사 대상 agents
- `.claude/settings.json` 의 `hooks` 블록 — 번역 대상 hooks
- `.github/agents/` 와 `.claude/skills/` — 충돌 가능성 사전 점검

발견 결과를 다음 형식으로 보고합니다.

```
발견된 마이그레이션 대상:
- Commands: N 개 (X.md, Y.md, ...)
- Agents: N 개 (A.md, B.md, ...)
- Hooks: N 개 이벤트 (PreToolUse, PostToolUse, ...)

목적지 사전 점검:
- .github/agents/ 에 이미 있음: M 개 (충돌 시 SKIP)
- .claude/skills/ 에 이미 있음: M 개 (충돌 시 SKIP)
- hooks.json 이미 존재: yes/no
```

대상이 모두 0 이면 "변환할 항목 없음" 보고하고 종료합니다.

## Step 2: Commands → Skills (MOVE)

각 `.claude/commands/<name>.md` 마다 다음을 수행합니다.

1. 목적지 `.claude/skills/<name>/` 이 이미 존재하면 SKIP, 통계에 기록.
2. 원본 frontmatter 읽기. 없으면 빈 frontmatter 로 시작.
3. SKILL.md frontmatter 작성:
   - `name`: 파일명 (예: `summarize.md` → `summarize`)
   - `description`: 원본 `description` 그대로. 없으면 본문 첫 비어있지 않은 줄에서 추출.
   - `allowed-tools`: 원본 `allowed-tools` 그대로 (있으면)
4. 본문 작성:
   - 원본 `argument-hint` 가 있으면 본문 맨 위에 `<!-- argument-hint: ... -->` HTML 코멘트로 보존.
   - 원본 본문 그대로 이어 붙임.
5. `mkdir -p .claude/skills/<name>` 후 `SKILL.md` 작성.
6. 원본 `.claude/commands/<name>.md` 삭제.

frontmatter 가 누락된 파일도 처리할 수 있도록, name 은 파일명에서 신설하고 description 은 본문 첫 줄에서 추출하는 fallback 로직을 적용합니다.

## Step 3: Agents 복사

다음 한 줄로 처리합니다.

```bash
mkdir -p .github/agents
cp -n .claude/agents/*.md .github/agents/
```

`cp -n` (no-clobber) 플래그가 동명 파일을 보호합니다. 어느 파일이 SKIP 됐는지 정확히 알기 위해 사전에 `ls .github/agents/` 결과와 `ls .claude/agents/` 결과를 비교해 SKIP 목록을 만듭니다. SKIP 된 파일들은 통계에 기록하고 보고에 명시합니다.

frontmatter 변환은 필요 없습니다. Copilot CLI 도 `name`, `description`, `tools` 같은 표준 필드를 그대로 인식합니다.

## Step 4: Hooks 번역

`.claude/settings.json` 의 `hooks` 블록을 읽어 Copilot CLI 의 `hooks.json` 형식으로 번역합니다. 변환 규칙과 5가지 before/after 예시는 `references/hooks-translation.md` 에 상세히 있습니다. 본 단계에서는 그 reference 를 따라가면 됩니다.

핵심 행동:

1. `.claude/settings.json` 에서 `hooks` 블록 추출. 없으면 단계 종료.
2. 외부 래퍼 `{"version": 1, "hooks": {}}` 로 시작.
3. 각 이벤트마다:
   - 미지원 이벤트 (Stop, Notification 등) 는 DROP, 통계에 기록.
   - 매핑 가능한 이벤트는 camelCase 로 변환 (PreToolUse → preToolUse 등).
   - matcher 그룹이 있으면 평탄화하고 사용자에게 WARN. matcher 정보는 손실되며 hook 이 모든 도구에 발동하게 된다는 점을 명시합니다.
   - 각 hook 항목의 type 이 `command` 가 아니면 REJECT, 통계에 기록.
   - command 항목은 `command` → `bash`, `timeout` → `timeoutSec` 로 필드명 변경.
4. 결과를 프로젝트 루트 `hooks.json` 에 작성. 이미 존재하면 사용자에게 확인 후 덮어쓰기 또는 백업 (`hooks.json.backup` 형태) 으로 안전 처리.
5. `.claude/settings.json` 의 hooks 블록은 그대로 둡니다. Claude Code 가 계속 사용해야 하기 때문입니다.

상세 매핑 규칙·예시는 `references/hooks-translation.md` 를 참조하세요. 그 파일의 5개 before/after 페어가 흔한 변환 패턴을 모두 커버합니다.

## Step 5: 결과 보고

마지막에 다음 형식으로 통계를 출력합니다.

```
✓ Commands → Skills: 변환 N 개, SKIP M 개
✓ Agents 복사: 복사 N 개, SKIP M 개 (이미 존재)
✓ Hooks 번역: 변환 N 개 이벤트, DROP M 개 (미지원), REJECT K 개 (비-command 타입)
  ⚠ 드롭된 이벤트: <list>, Copilot CLI 미지원
  ⚠ 거부된 hook 타입: <list>, Copilot CLI 는 command 타입만 지원
  ⚠ matcher 정보 손실: N 곳, 변환된 hook 이 모든 도구에 발동합니다 (필요시 hooks.json 에서 직접 조건 처리)
```

drop·reject·warn 이 하나라도 있으면 학생이 결과를 한 번 검토하도록 명시적으로 안내합니다.

## Output style

- 합니다체 한국어
- 진행 상황은 단계별로 명확히 ("Discovery 진행 중", "Step 1 완료" 식)
- 통계는 표 또는 bullet 로 정리해 한눈에 파악 가능하게
- 학생에게 부담 주지 않는 톤. "한 번 호출이면 끝납니다", "위 차이는 자동 처리됩니다" 같은 안심 메시지 포함

## Boundaries

이 스킬은 다음 영역만 다룹니다.

- `.claude/commands/`, `.claude/agents/`, `.claude/settings.json` 의 hooks 블록
- `.claude/skills/`, `.github/agents/`, 프로젝트 루트 `hooks.json` 으로의 변환

다음은 다루지 않습니다.

- 학생의 일반 코드 파일 수정
- `~/.claude/CLAUDE.md` (사용자 글로벌 메모리), 환경마다 달라 자동 이전 위험
- 미지원 hook 이벤트 (Stop 등) 의 settings.json 에서 제거. Claude Code 에서 계속 작동해야 합니다.
- MCP 서버 설정. 양쪽 도구 모두 다른 위치를 사용하며 학생이 수동으로 관리하는 것이 안전합니다.

복잡하거나 예외적인 상황에서 막히면 변환을 중단하고 학생에게 상황을 보고합니다. 부분 진행 상태에서도 통계를 출력합니다.
