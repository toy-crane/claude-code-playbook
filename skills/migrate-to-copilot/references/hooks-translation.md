# Hooks 번역 규칙 및 예시

Claude Code 의 hooks 와 GitHub Copilot CLI 의 hooks 는 같은 개념을 다루지만 파일 위치, 이벤트명, 스키마 구조, 필드명, 지원 타입이 모두 다릅니다. 이 문서는 번역 규칙과 5가지 흔한 변환 패턴을 정리합니다.

## 매핑 규칙

### 외부 래퍼

Copilot CLI 의 `hooks.json` 은 다음 외부 래퍼가 필수입니다.

```json
{
  "version": 1,
  "hooks": { }
}
```

Claude Code 는 `.claude/settings.json` 안 `hooks` 키 아래 직접 이벤트가 있고 별도 version 필드가 없습니다.

### 이벤트명 매핑

Claude Code 의 이벤트는 PascalCase, Copilot CLI 는 camelCase 입니다. 매핑 가능한 이벤트는 다섯 가지입니다.

| Claude Code | Copilot CLI |
|---|---|
| `PreToolUse` | `preToolUse` |
| `PostToolUse` | `postToolUse` |
| `SessionStart` | `sessionStart` |
| `SessionEnd` | `sessionEnd` |
| `UserPromptSubmit` | `userPromptSubmitted` |

### DROP 이벤트 (Copilot CLI 미지원)

다음 이벤트는 Copilot CLI 에 대응이 없으므로 변환 시 드롭하고 통계에 기록합니다.

`Stop`, `Notification`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`, `TaskCreated`, `TaskCompleted`, `Setup`, `UserPromptExpansion`, `PermissionRequest`, `PermissionDenied`, `PostToolUseFailure`, `PostToolBatch`, `StopFailure`, `TeammateIdle`, `InstructionsLoaded`, `ConfigChange`, `CwdChanged`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `Elicitation`, `ElicitationResult`

이들은 Claude Code 의 `.claude/settings.json` 에는 그대로 둡니다. Claude Code 에서 계속 작동해야 하기 때문입니다.

### 매처 그룹 평탄화

Claude Code 는 도구별 필터를 위한 matcher 그룹 구조를 갖습니다.

```json
{
  "PreToolUse": [
    { "matcher": "Bash", "hooks": [ ] }
  ]
}
```

Copilot CLI 는 평탄한 hook 배열만 지원하므로 matcher 정보가 손실됩니다.

```json
{
  "preToolUse": [ ]
}
```

이 변환 시 사용자에게 WARN 합니다. 평탄화된 hook 이 도구별 필터 없이 모든 도구 호출에 발동하기 때문입니다. 필요한 경우 학생이 hooks.json 의 hook 안에서 직접 조건 처리해야 합니다.

### 필드명 변경

| Claude Code | Copilot CLI |
|---|---|
| `command: "..."` | `bash: "..."` |
| `timeout: 60` | `timeoutSec: 60` |

### REJECT 타입 (Copilot CLI 미지원)

Claude Code 는 다섯 가지 hook 타입 (`command`, `http`, `mcp_tool`, `prompt`, `agent`) 을 지원하지만 Copilot CLI 는 `command` 만 지원합니다. 비-command 타입은 변환 시 거부하고 통계에 기록합니다.

거부 대상: `http`, `mcp_tool`, `prompt`, `agent`

이들도 Claude Code 의 `.claude/settings.json` 에는 그대로 둡니다.

---

## Before/After 예시 5개

### 예시 1: 단순 PreToolUse

**Before** (`.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/log-tool-use.sh"
          }
        ]
      }
    ]
  }
}
```

**After** (`hooks.json`):

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "./scripts/log-tool-use.sh"
      }
    ]
  }
}
```

검증 포인트: version 래퍼 있고, 이벤트명 camelCase, command 필드명이 bash 로 변환, matcher 그룹 평탄화 (단일 그룹이라 사실상 변화 없음).

### 예시 2: 다중 matcher 그룹

**Before**:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "./scripts/check-bash.sh" }]
      },
      {
        "matcher": "Edit",
        "hooks": [{ "type": "command", "command": "./scripts/lint.sh", "timeout": 30 }]
      }
    ]
  }
}
```

**After**:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      { "type": "command", "bash": "./scripts/check-bash.sh" },
      { "type": "command", "bash": "./scripts/lint.sh", "timeoutSec": 30 }
    ]
  }
}
```

검증 포인트: 두 matcher 그룹의 hooks 가 단일 평탄 배열로 합쳐짐. matcher 정보 손실됐으므로 WARN. timeout 이 timeoutSec 으로 변환.

### 예시 3: 다중 이벤트 + 미지원 이벤트

**Before**:

```json
{
  "hooks": {
    "PreToolUse": [{ "hooks": [{ "type": "command", "command": "./pre.sh" }] }],
    "PostToolUse": [{ "hooks": [{ "type": "command", "command": "./post.sh" }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "./stop.sh" }] }]
  }
}
```

**After**:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [{ "type": "command", "bash": "./pre.sh" }],
    "postToolUse": [{ "type": "command", "bash": "./post.sh" }]
  }
}
```

검증 포인트: PreToolUse, PostToolUse 정상 변환. Stop 은 hooks.json 에 누락 (DROP). 통계에 "DROP: Stop" 기록.

### 예시 4: 드롭 only

**Before**:

```json
{
  "hooks": {
    "Stop": [{ "hooks": [{ "type": "command", "command": "./stop.sh" }] }],
    "Notification": [{ "hooks": [{ "type": "command", "command": "./notify.sh" }] }]
  }
}
```

**After**:

```json
{
  "version": 1,
  "hooks": {}
}
```

검증 포인트: 두 이벤트 모두 미지원이라 DROP. 결과는 빈 hooks 객체. 통계에 "DROP: Stop, Notification" 기록. 빈 hooks.json 이라도 작성합니다 (사용자가 hooks.json 의 존재를 인식하게 하기 위해).

### 예시 5: 거부 케이스 (`http` 포함)

**Before**:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          { "type": "command", "command": "./pre.sh" },
          { "type": "http", "url": "https://example.com/hook" }
        ]
      }
    ]
  }
}
```

**After**:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      { "type": "command", "bash": "./pre.sh" }
    ]
  }
}
```

검증 포인트: command 타입은 정상 변환, http 타입은 REJECT 되어 결과에서 누락. 통계에 "REJECT: 1 http hook" 기록.

---

## 출처

- [GitHub Copilot CLI hooks-configuration](https://docs.github.com/en/copilot/reference/hooks-configuration)
- [Claude Code hooks](https://code.claude.com/docs/en/hooks)
