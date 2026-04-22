import { DiagramFrame } from './primitives';

export function LlmVsAgentFlow() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LlmPlusToolBlock />
        <AgentBlock />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        Agent = Tool + Loop +{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          자율적 판단
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function LlmPlusToolBlock() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          LLM + Tool
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          한 번 호출 · 일직선
        </span>
      </header>
      <div className="flex items-stretch gap-2">
        <FlatCard>질문</FlatCard>
        <InlineArrow />
        <FlatCard>Tool 호출</FlatCard>
        <InlineArrow />
        <FlatCard>답변</FlatCard>
      </div>
      <ul
        className="list-disc list-inside text-xs space-y-1 mt-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        <li>
          Tool 사용: <span style={{ color: 'var(--diagram-text)' }}>보통 1번</span>
        </li>
        <li>
          다음 단계: <span style={{ color: 'var(--diagram-text)' }}>사용자가 지시</span>
        </li>
        <li>
          적합: <span style={{ color: 'var(--diagram-text)' }}>단순 조회 · 변환 · 요약</span>
        </li>
      </ul>
    </section>
  );
}

function AgentBlock() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Agent
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          반복 · 자율 판단
        </span>
      </header>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          gridTemplateRows: 'auto auto auto',
        }}
      >
        <FlatCard accent>계획</FlatCard>
        <GridArrow dir="right" />
        <FlatCard accent>실행</FlatCard>

        <GridArrow dir="up" />
        <div />
        <GridArrow dir="down" />

        <FlatCard accent>수정</FlatCard>
        <GridArrow dir="left" />
        <FlatCard accent>확인</FlatCard>
      </div>
      <ul
        className="list-disc list-inside text-xs space-y-1 mt-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        <li>
          Tool 사용: <span style={{ color: 'var(--diagram-text)' }}>여러 번 반복</span>
        </li>
        <li>
          다음 단계: <span style={{ color: 'var(--diagram-text)' }}>LLM 이 스스로 판단</span>
        </li>
        <li>
          적합: <span style={{ color: 'var(--diagram-text)' }}>여러 단계의 복잡한 작업</span>
        </li>
      </ul>
    </section>
  );
}

function FlatCard({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  const bg = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const border = accent ? 'var(--diagram-primary)' : 'var(--diagram-border)';
  const color = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <div
      className="flex-1 min-w-0 flex items-center justify-center rounded-md border px-2 py-3 text-[13px] font-medium whitespace-nowrap"
      style={{ backgroundColor: bg, borderColor: border, color }}
    >
      {children}
    </div>
  );
}

function InlineArrow() {
  return (
    <div
      className="flex items-center shrink-0"
      style={{ color: 'var(--diagram-text-muted)' }}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function GridArrow({ dir }: { dir: 'up' | 'down' | 'left' | 'right' }) {
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <div
      className="flex items-center justify-center"
      style={{ color: 'var(--diagram-primary)' }}
      aria-hidden
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
