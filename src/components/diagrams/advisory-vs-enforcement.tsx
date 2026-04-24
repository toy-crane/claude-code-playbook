import type { ReactNode } from 'react';
import { DiagramFrame } from './primitives';

export function AdvisoryVsEnforcement() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <AdvisoryColumn />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <EnforcementColumn />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        지침은 AI가{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-danger)' }}>
          건너뛸 수 있지만
        </span>
        , Hook은 런타임이{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          무조건 실행
        </span>
        합니다
      </figcaption>
    </DiagramFrame>
  );
}

function AdvisoryColumn() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          CLAUDE.md 지침
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          권고
        </span>
      </header>
      <StepCard>파일 수정 (Edit)</StepCard>
      <DownArrow />
      <StepCard>AI 가 지침을 읽음</StepCard>
      <DownArrow />
      <div className="grid grid-cols-2 gap-2">
        <StepCard subdued>따름</StepCard>
        <StepCard danger>건너뜀</StepCard>
      </div>
      <p
        className="text-xs mt-1 text-center"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        실행 여부가 AI 판단에 달려 있습니다
      </p>
    </section>
  );
}

function EnforcementColumn() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Hook
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          강제
        </span>
      </header>
      <StepCard>파일 수정 (Edit)</StepCard>
      <DownArrow accent />
      <StepCard accent>Claude Code 런타임이 가로챔</StepCard>
      <DownArrow accent />
      <StepCard accent>스크립트 강제 실행</StepCard>
      <p
        className="text-xs mt-1 text-center"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        판단 없이 매번 실행됩니다
      </p>
    </section>
  );
}

function StepCard({
  children,
  accent,
  danger,
  subdued,
}: {
  children: ReactNode;
  accent?: boolean;
  danger?: boolean;
  subdued?: boolean;
}) {
  let bg = 'var(--diagram-bg-card)';
  let border = 'var(--diagram-border)';
  let color = 'var(--diagram-text)';
  if (accent) {
    bg = 'var(--diagram-primary-soft)';
    border = 'var(--diagram-primary)';
    color = 'var(--diagram-primary)';
  } else if (danger) {
    bg = 'var(--diagram-danger-soft)';
    border = 'var(--diagram-danger)';
    color = 'var(--diagram-danger)';
  } else if (subdued) {
    color = 'var(--diagram-text-muted)';
  }
  return (
    <div
      className="rounded-md border px-3 py-2 text-[13px] text-center font-medium"
      style={{ backgroundColor: bg, borderColor: border, color }}
    >
      {children}
    </div>
  );
}

function DownArrow({ accent }: { accent?: boolean }) {
  const color = accent ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  return (
    <div
      className="flex items-center justify-center"
      style={{ color }}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 6l5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
