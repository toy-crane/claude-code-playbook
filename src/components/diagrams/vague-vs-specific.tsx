import { DiagramFrame } from './primitives';

export function VagueVsSpecific() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VagueColumn />
        <SpecificColumn />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        구체성이{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          AI 가 결정할 자리
        </span>
        를 좁힙니다
      </figcaption>
    </DiagramFrame>
  );
}

function VagueColumn() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          모호한 요구사항
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          AI 가 해석을 채움
        </span>
      </header>
      <QuoteBox>&ldquo;빈 입력 처리를 해줘&rdquo;</QuoteBox>
      <FanOutArrow />
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        <OutcomeCard>에러 메시지?</OutcomeCard>
        <OutcomeCard>토스트 알림?</OutcomeCard>
        <OutcomeCard>무반응?</OutcomeCard>
      </ul>
      <p
        className="text-xs mt-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        AI 가{' '}
        <em style={{ color: 'var(--diagram-text)' }}>
          &ldquo;가장 그럴듯한&rdquo;
        </em>{' '}
        해석 하나를 고름
      </p>
    </section>
  );
}

function SpecificColumn() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          구체적 요구사항
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          동작이 명시됨
        </span>
      </header>
      <QuoteBox accent>
        &ldquo;빈 입력 + Enter → 추가 안 됨 + 빨간 테두리&rdquo;
      </QuoteBox>
      <SingleArrow />
      <div
        className="rounded-md border px-3 py-3 text-[13px] font-semibold"
        style={{
          backgroundColor: 'var(--diagram-primary-soft)',
          borderColor: 'var(--diagram-primary)',
          color: 'var(--diagram-primary)',
        }}
      >
        <div className="text-center leading-snug">
          <div>Todo 추가 안 됨</div>
          <div>입력 필드: 빨간 테두리</div>
        </div>
      </div>
      <p
        className="text-xs mt-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        AI 가 결정할 자리가 없음
      </p>
    </section>
  );
}

function QuoteBox({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  const bg = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const border = accent ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const color = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <div
      className="rounded-md border px-3 py-3 text-[13px] font-medium text-center"
      style={{
        backgroundColor: bg,
        borderColor: border,
        color,
        borderStyle: accent ? 'solid' : 'dashed',
      }}
    >
      {children}
    </div>
  );
}

function OutcomeCard({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="rounded-md border px-3 py-2 text-[13px]"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border)',
        color: 'var(--diagram-text-muted)',
      }}
    >
      {children}
    </li>
  );
}

function FanOutArrow() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ color: 'var(--diagram-text-muted)' }}
      aria-hidden
    >
      <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
        {/* trunk */}
        <path
          d="M40 0 L40 6"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        {/* three branches */}
        <path
          d="M40 6 L16 17"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M40 6 L40 17"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M40 6 L64 17"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        {/* arrowheads */}
        <path d="M13 14 L16 17 L19 14" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M37 14 L40 17 L43 14" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M61 14 L64 17 L67 14" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SingleArrow() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ color: 'var(--diagram-primary)' }}
      aria-hidden
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2 L10 15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 12 L10 16 L14 12"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
