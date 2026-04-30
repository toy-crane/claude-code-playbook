---
name: fix-issue
description: GitHub 피드백 이슈 한 건(번호 미지정 시 가장 오래된 피드백 이슈를 자동 선택) 을 받아 강의 MDX 를 수정하고 draft PR 까지 만든다. 작가가 옆에 있을 때 사용 — 이슈 분류 결과·수정안 diff 를 매 단계 보여주고 승인을 받는다. 트리거 — "이슈 처리해줘", "이슈 #123 수정", "fix-issue", "fix issue", "피드백 이슈 처리". 자동 일괄 처리는 `/fix-issues-batch` 를 사용한다.
user-invocable: true
argument-hint: "[issue-number]"
---

# Fix Issue (Interactive)

GitHub 피드백 이슈 한 건을 강의 MDX 수정 + draft PR 로 처리합니다. 인자 `<N>` 이 없으면 가장 오래된 피드백 이슈를 자동 선택합니다. 매 단계 작가 승인을 받습니다 — 콘텐츠 편집은 톤·맥락 판단이 갈리므로 자동 적용 대신 diff 한 번 검토하게 합니다. 다건 자동 처리가 필요하면 `/fix-issues-batch` 를 쓰세요.

## Workflow

### Step 1: Resolve Target Issue

**인자 모드** — `<N>` 이 주어진 경우. 해당 이슈 정보를 가져옵니다:

```bash
gh issue view <N> --json number,title,body,labels,state
```

다음 가드 중 하나에 걸리면 즉시 멈춥니다:

| 조건 | 출력 |
|---|---|
| `state == CLOSED` | "이슈 #<N> 는 이미 닫혀 있습니다." |
| 본문에서 `` Page: `/learn/<path>` `` 매치 실패 | "Page 경로를 본문에서 찾지 못했습니다." |
| `content/docs/<path>.mdx` 가 존재하지 않음 | "파일을 찾을 수 없습니다: <path>.mdx" |
| 같은 이슈 PR 이 이미 있음 (`gh pr list --search "Closes #<N>"`) | PR URL |
| 같은 이슈 워크트리가 이미 있음 (`.claude/worktrees/fix/issue-<N>-*`) | 디렉터리 경로 |

**자동 선택 모드** — 인자가 없는 경우. 가장 오래된 피드백 이슈를 자동 선택합니다:

```bash
gh issue list \
  --search "[피드백] in:title state:open" \
  --sort created --order asc \
  --limit 30 \
  --json number,title,body,labels
```

만든 지 오래된 순으로 후보를 하나씩 검사합니다. 다음 중 하나라도 해당하면 한 줄 로그(`⏭ #<N> 스킵: <사유>`) 를 남기고 다음 후보로 넘어갑니다:

| 조건 | 사유 |
|---|---|
| 같은 이슈 PR 이 이미 있음 (`gh pr list --search "Closes #<N>"`) | "이미 PR 있음 (<url>)" |
| 같은 이슈 워크트리가 이미 있음 (`.claude/worktrees/fix/issue-<N>-*`) | "이미 워크트리 있음 (<dir>)" |
| 본문에서 `` Page: `/learn/<path>` `` 매치 실패 | "Page 경로 없음" |
| `content/docs/<path>.mdx` 가 존재하지 않음 | "파일 없음 (<path>.mdx)" |

위 조건을 모두 통과한 첫 후보를 대상으로 진행합니다. 모든 후보가 스킵되면:

> "처리 가능한 피드백 이슈가 없습니다."

출력 후 종료합니다.

**이슈 본문 파싱 메모** (두 모드 공통):
- 메타 블록은 `> ...` 으로 시작하는 quote 줄들 (`> Forwarded from user feedback.` 등). 이 부분은 시스템이 붙인 것으로, 실제 피드백은 그 아래 자유 서술입니다.
- `Page:` 라인의 백틱 안 경로에서 앞쪽 `/learn/` 를 떼고 `content/docs/<path>.mdx` 로 매핑합니다.

### Step 2: Classify & Report

메타 블록을 제외한 본문을 다음 셋 중 하나로 판정합니다.

| 분류 | 시그널 |
|---|---|
| concrete | `X → Y` / `X -> Y` / `X 삭제` / `Step N: ...` 형태, 인용된 원문 + 구체적 변경 지시 |
| vague | `장황함`, `너무 많고`, `중복`, `전체적으로` 같은 정성적 평. 무엇을 어떻게 바꿀지 명시 안 됨 |
| meta | 강사 지시가 아닌 현상·버그 보고 (예: "PR 이 안됨"). 콘텐츠 변경 대상이 아님 |

**다건 피드백** — 한 본문에 여러 지시가 섞여 있으면 모두 concrete 일 때만 concrete. 하나라도 vague 가 섞이면 전체 vague (단일 PR 안에 일관된 스타일로 묶기 어렵기 때문).

**오버라이드** — 이슈에 `auto-fix` 라벨이 있으면 분류 무시하고 concrete 로 처리합니다 (작가가 명시적 자동화 허락).

작가에게 분류 결과를 한 화면으로 보고합니다. 자동 선택 모드일 때는 맨 위에 선택 표시를 한 줄 붙입니다 (작가가 "왜 이 이슈?" 헷갈리지 않게):

```
[자동 선택: 가장 오래된 피드백 이슈]
이슈 #<N> — <path>
파일: content/docs/<path>.mdx
분류: <concrete|vague|meta>
요약: <한 줄로 무엇을 바꿀 예정인지>
```

분기 처리:

- **concrete** → Step 3 으로 진행
- **vague / meta** → 작가에게 다음 옵션을 묻습니다:
  - "초안 시도" → Step 3 으로 진행 (단, 다음 단계의 diff 를 보수적으로)
  - "코멘트만" → 이슈에 작가가 부르는 대로 코멘트를 남기고 종료
  - "닫기" → `gh issue close <N>` 후 종료

### Step 3: Worktree

`/create-worktree` 를 위임 호출합니다. 인자: `issue <N> <leaf>` (예: `issue 100 hooks`). create-worktree 가 다음을 자동 처리합니다:

- 워크트리 생성: `.claude/worktrees/fix/issue-<N>-<leaf>/`
- 브랜치 생성: `worktree-fix/issue-<N>-<leaf>`
- 세션 워킹 디렉터리 전환
- Fumadocs dev server 백그라운드 기동 (수정 결과 브라우저 미리보기 가능)

이후 모든 파일·git 명령은 새 워크트리에서 수행합니다.

### Step 4: Propose Diff

해당 MDX 파일을 Read 로 읽고, 이슈 본문의 지시대로 수정안을 unified diff 형식으로 제시합니다:

````
```diff
--- content/docs/<path>.mdx (before)
+++ content/docs/<path>.mdx (after)
@@ ... @@
- <기존 텍스트>
+ <변경 텍스트>
```
````

작가에게 "이대로 적용할까요?" 묻고 승인을 대기합니다. 거부 / 수정 요청이 오면 재제안 루프로 돌아갑니다 — 이 단계가 콘텐츠 편집의 판단 보호 장치이므로 자동 적용하지 않습니다.

### Step 5: Apply

승인되면 Edit 도구로 파일을 수정합니다.

### Step 6: Commit

`/commit` 을 위임 호출합니다. 메시지 컨벤션:

```
fix(<leaf>): <한줄요약>
```

예: `fix(hooks): 변수 분리 표현을 'let 할당' 으로 변경`

### Step 7: Push & Create PR

워크트리 안에서:

```bash
git push -u origin HEAD

gh pr create --draft \
  --title "fix(<leaf>): <요약>" \
  --body "$(cat <<'EOF'
<수정 요약 — 무엇을 왜 바꿨는지 1~2줄>

Closes #<N>
EOF
)"
```

draft 로 만드는 이유 — 작가가 PR 페이지에서 한 번 더 확인하고 ready 처리하도록.

### Step 8: Report

```
✅ PR 생성: <pr-url>
   이슈: #<N> (Closes 로 머지 시 자동 닫힘)
   워크트리: .claude/worktrees/fix/issue-<N>-<leaf>/
   브랜치: worktree-fix/issue-<N>-<leaf>
   Dev server: 백그라운드 실행 중 (해당 워크트리)
```

PR 머지 후 작가가 직접 `/remove-worktree` 로 정리합니다 — 자동 정리 안 하는 이유는 PR 리뷰 중 추가 수정이 필요할 수 있기 때문입니다.

## Constraints

- diff 승인 없이 파일 수정 금지 (Step 4 → 5 사이 사용자 승인 필수)
- vague / meta 이슈는 작가 결정 전에 워크트리 만들지 않습니다 (Step 2 에서 멈춤)
- main 에 직접 commit 하지 않습니다 (Step 3 의 워크트리 안에서만 작업)
- 다건 피드백 중 하나라도 vague 면 전체 vague 처리
- 자동 선택 모드에서 가드 실패 = 그 후보 스킵, 다음 오래된 후보로 진행 (인자 모드는 즉시 멈춤)
- 한 호출 = 한 건. 자동 선택 모드라도 첫 처리 가능 후보 한 건만 처리하고 종료
