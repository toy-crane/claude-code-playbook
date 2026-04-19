# Claude Code for Developers

개발자를 위한 Claude Code 워크샵 실습 저장소입니다.
진도를 놓치더라도 해당 챕터 브랜치로 checkout하면 언제든 따라올 수 있습니다.

**강의 자료**: https://publish.obsidian.md/claude-code/cc-lge

## 시작하기

```bash
git clone https://github.com/toy-crane/claude-code-for-lge-2.git
cd claude-code-for-lge-2
bun install
bun run dev
```

## 브랜치 가이드

브랜치 이름은 `chXX-YY` 형식입니다. `XX`는 챕터 번호, `YY`는 레슨 번호이며, 해당 레슨 완료 시점의 코드입니다.

브랜치는 강의 진행에 따라 추가됩니다.

### 특정 챕터로 이동하기

```bash
git checkout ch05-03
bun install
bun run dev
```
