import { DiagramFrame } from './primitives';

export function ExploreVsExecute() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ExploreBlock />
        <ImmediateBlock />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        먼저{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          탐색하고 계획을 세우면
        </span>{' '}
        AI 가 추측하지 않습니다
      </figcaption>
    </DiagramFrame>
  );
}

function ExploreBlock() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          탐색 후 실행
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          Plan Mode
        </span>
      </header>
      <ol className="flex flex-col gap-2 m-0 p-0 list-none">
        <CheckRow label="코드베이스 파악" />
        <CheckRow label="기존 패턴 확인" />
        <CheckRow label="계획 수립" />
      </ol>
      <OutcomeCard
        tone="primary"
        label="맥락 있는 정확한 코드"
      />
    </section>
  );
}

function ImmediateBlock() {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          즉시 실행
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          탐색 없이 바로
        </span>
      </header>
      <ol className="flex flex-col gap-2 m-0 p-0 list-none">
        <CrossRow label="추측으로 작성" />
        <CrossRow label="기존 유틸 중복 구현" />
        <CrossRow label="관례에 어긋난 패턴" />
      </ol>
      <OutcomeCard
        tone="danger"
        label="되돌림 · 재작업"
      />
    </section>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <li
      className="flex items-center gap-3 rounded-md border px-3 py-2 text-[13px]"
      style={{
        backgroundColor: 'var(--diagram-primary-soft)',
        borderColor: 'var(--diagram-primary)',
        color: 'var(--diagram-primary)',
      }}
    >
      <CheckIcon />
      <span className="font-medium">{label}</span>
    </li>
  );
}

function CrossRow({ label }: { label: string }) {
  return (
    <li
      className="flex items-center gap-3 rounded-md border px-3 py-2 text-[13px]"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border)',
        color: 'var(--diagram-text-muted)',
      }}
    >
      <CrossIcon />
      <span>{label}</span>
    </li>
  );
}

function OutcomeCard({
  tone,
  label,
}: {
  tone: 'primary' | 'danger';
  label: string;
}) {
  const bg =
    tone === 'primary' ? 'var(--diagram-primary-soft)' : 'var(--diagram-danger-soft)';
  const border =
    tone === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-danger)';
  const color =
    tone === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-danger)';
  return (
    <div
      className="mt-auto flex items-center justify-center rounded-md border px-3 py-3 text-[13px] font-semibold"
      style={{ backgroundColor: bg, borderColor: border, color }}
    >
      {label}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
