import { DiagramFrame } from './primitives';

export function Lesson02RegressionSafetyNet() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaselineColumn />
        <ExtendedColumn />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        기능이 추가될수록{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          테스트가 쌓여
        </span>{' '}
        보호 범위가 넓어집니다
      </figcaption>
    </DiagramFrame>
  );
}

const BASELINE_FEATURES = ['입력', '체크', '삭제', '새로고침', '필터'];

function BaselineColumn() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          기준선
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          Step 4 끝 · 기능 5 · 테스트 5
        </span>
      </header>
      <FeatureGrid items={BASELINE_FEATURES.map((f) => ({ label: f }))} />
      <DownArrow />
      <TestBadge count={5} />
    </section>
  );
}

function ExtendedColumn() {
  const items = [
    ...BASELINE_FEATURES.map((f) => ({ label: f })),
    { label: '우선순위', accent: true },
  ];
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          확장 기준선
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          Step 7 끝 · 기능 6 · 테스트 6
        </span>
      </header>
      <FeatureGrid items={items} />
      <DownArrow accent />
      <TestBadge count={6} />
    </section>
  );
}

function FeatureGrid({
  items,
}: {
  items: { label: string; accent?: boolean }[];
}) {
  return (
    <ul
      className="list-none p-0 m-0 grid gap-2"
      style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
    >
      {items.map((item, idx) => (
        <FeatureChip key={idx} accent={item.accent}>
          {item.label}
        </FeatureChip>
      ))}
    </ul>
  );
}

function FeatureChip({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  const bg = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const border = accent ? 'var(--diagram-primary)' : 'var(--diagram-border)';
  const color = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <li
      className="rounded-md border px-2 py-1.5 text-[13px] font-medium text-center"
      style={{ backgroundColor: bg, borderColor: border, color }}
    >
      {children}
    </li>
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2 L10 15" stroke="currentColor" strokeWidth="1.5" />
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

function TestBadge({ count }: { count: number }) {
  return (
    <div
      className="rounded-md border px-3 py-3 text-center"
      style={{
        backgroundColor: 'var(--diagram-success-soft)',
        borderColor: 'var(--diagram-success)',
        color: 'var(--diagram-success)',
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 8 L7 12 L13 4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[14px] font-semibold">
          bun run test · {count} passed
        </span>
      </div>
    </div>
  );
}
