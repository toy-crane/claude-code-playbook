---
name: fix-issues-batch
description: 열려 있는 GitHub 피드백 이슈들을 자동 분류해 명확한 이슈만 draft PR 로 만든다. 모호한 이슈는 코멘트 한 번 남기고 패스, 메타·버그 리포트는 라벨만 붙인다. 한 번에 최대 5 개 PR. cron 호출 / 수동 테스트 모두 가능. 트리거 — "이슈 일괄 처리", "auto fix issues", "fix-issues-batch", "batch fix", "피드백 이슈 자동 처리". 작가 판단이 필요한 단건 처리는 `/fix-issue <N>` 을 사용한다.
user-invocable: true
---

# Fix Issues Batch (Autonomous)

열려 있는 GitHub 피드백 이슈들을 자동 분류해 **concrete** 한 것만 draft PR 로 처리합니다. 모호하거나 메타성 이슈는 작가에게 코멘트로 정보를 요청한 뒤 패스합니다 — 자동 에이전트가 콘텐츠 톤·의도를 안전하게 판단하기 어렵기 때문입니다.

cron (매일 아침) + 수동 테스트 호출 둘 다 동작합니다. 인터랙티브 단건 처리는 `/fix-issue <N>` 쓰세요.

## Workflow

### Step 0: Verify Environment

시작 전에 환경을 점검합니다 — 잘못된 상태에서 시작하면 다른 작업 브랜치를 오염시킬 수 있어서:

```bash
git branch --show-current   # 'main' 이어야 함
git status --porcelain      # 빈 출력 (clean working tree) 이어야 함
```

둘 중 하나라도 만족 안 되면 멈추고 출력합니다:

> "환경 점검 실패. main 브랜치 + clean working tree 에서 실행해야 합니다. 현재: <branch> / <상태>"

### Step 1: List & Filter

```bash
gh issue list \
  --search "[피드백] in:title state:open" \
  --limit 30 \
  --json number,title,body,labels,comments
```

각 이슈마다 dedup 체크. 다음 중 하나라도 해당하면 스킵하고 그 사유를 요약 보고에 기록합니다:

- 이미 같은 이슈 PR 있음: `gh pr list --search "Closes #<N>"` 결과가 비어있지 않음
- 이전 실행이 처리 결정을 남긴 상태 — 코멘트에 다음 마커 중 하나가 있음:
  - `<!-- auto-fix:vague-skipped -->`
  - `<!-- auto-fix:meta-skipped -->`
  - `<!-- auto-fix:error -->`

**오버라이드** — 이슈에 `auto-fix` 라벨이 있으면 위 dedup 마커들을 무시하고 강제 concrete 처리합니다 (작가가 "다시 시도해도 됨" 신호를 명시적으로 준 것).

### Step 2: Classify Each

| 분류 | 시그널 |
|---|---|
| concrete | `X → Y` / `X -> Y` / `X 삭제` / `Step N: ...` 형태, 인용 원문 + 구체적 변경 지시 |
| vague | `장황함`, `너무 많고`, `중복`, `전체적으로` 같은 정성적 평. 무엇을 어떻게 바꿀지 명시 안 됨 |
| meta | 강사 지시가 아닌 현상·버그 보고 |

자동 모드는 **보수적으로** — 의심스러우면 vague.

다건 피드백 (한 본문에 여러 지시) 은 모두 concrete 일 때만 concrete. 하나라도 vague 가 섞이면 전체 vague.

### Step 3: Process Loop

concrete 카운트가 5 에 도달하면 break — 리뷰 큐 폭주 방지 + cron 한 번 돌릴 때마다 작가가 검토할 수 있는 양만큼만 만듭니다. 각 이슈를 분류별로 분기합니다.

#### concrete 분기

1. main 동기화: `git checkout main && git pull --ff-only`
2. 브랜치 생성: `git checkout -b fix/issue-<N>-<leaf>`
3. 본문에서 `Page: /learn/<path>` 캡처 → `content/docs/<path>.mdx` 매핑
4. Edit 도구로 이슈 본문 지시대로 파일 수정
5. 커밋:
   ```bash
   git add content/docs/<path>.mdx
   git commit -m "fix(<leaf>): <요약>"
   ```
6. 푸시 + draft PR:
   ```bash
   git push -u origin HEAD
   gh pr create --draft \
     --title "fix(<leaf>): <요약>" \
     --body "$(cat <<'EOF'
<수정 요약 1~2줄>

Closes #<N>
EOF
)"
   ```
7. PR URL 기록 후 main 으로 복귀: `git checkout main`

#### vague 분기

```bash
gh issue comment <N> --body "$(cat <<'EOF'
이 이슈는 자동 처리하기엔 지시가 모호합니다. 어느 부분을 어떻게 줄일지 / 어떻게 변경할지 구체적으로 알려 주시면 다음 자동화 실행에서 처리하겠습니다.

자동 처리하길 원하시면 `auto-fix` 라벨을 붙여 주세요. 또는 `/fix-issue <N>` 으로 인터랙티브 처리도 가능합니다.

<!-- auto-fix:vague-skipped -->
EOF
)"
```

#### meta 분기

```bash
gh issue edit <N> --add-label "needs-author-review"
gh issue comment <N> --body "$(cat <<'EOF'
작가 검토 필요 — 이 이슈는 강의 콘텐츠 변경 지시가 아닌 현상·버그 보고로 분류됐습니다.

<!-- auto-fix:meta-skipped -->
EOF
)"
```

#### 에러 분기 (어느 단계든 실패 시)

```bash
gh issue comment <N> --body "$(cat <<'EOF'
자동 처리 중 오류 발생: <에러 메시지>

<!-- auto-fix:error -->
EOF
)"
git checkout main   # 안전을 위해 main 복귀
```

해당 이슈 패스, 다음 이슈로 계속 (개별 실패가 전체 루프 중단 시키지 않습니다).

### Step 4: Summary Report

루프 종료 후 다음 형식으로 요약을 출력합니다:

```
=== Auto-fix Run Summary (YYYY-MM-DD HH:MM) ===
검토: <N> 이슈
- PR 생성: <K> (#100, #101, ...)
- 모호 (코멘트 남김): <K> (#107, #109, ...)
- 메타 (라벨만): <K> (#118, ...)
- 이미 처리됨 (스킵): <K>

PR 목록:
- https://github.com/.../pull/120  fix(hooks): ...
- https://github.com/.../pull/121  fix(...): ...
```

종료 시 git 상태가 main 브랜치 + clean working tree 인지 마지막으로 확인합니다.

## Constraints

- 브랜치 기반 작업. 워크트리 사용 안 함 — cron 의 fresh checkout 환경이 isolation 을 자동 제공하고, 5 PR 순차 처리에 브랜치 전환이 더 가볍기 때문입니다.
- PR 은 항상 `--draft` (작가 리뷰 전 머지 차단)
- 한 실행에 최대 5 PR. 초과분은 다음 실행으로 미룸
- 어떤 단계가 실패해도 전체 루프는 계속됨. 실패 이슈에는 `<!-- auto-fix:error -->` 마커를 남기고 다음 이슈로 진행
- 승인 게이트 없음 (cron 환경 가정). 작가 판단이 필요한 이슈는 vague 분기로 분류해 코멘트 남기고 패스
- 시작 / 종료 시 git 상태 = main + clean working tree
