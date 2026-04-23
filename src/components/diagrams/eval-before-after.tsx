import { DiagramFrame } from './primitives';

type Scenario = {
  name: string;
  before: boolean;
  after: boolean;
};

const SCENARIOS: Scenario[] = [
  { name: '정상 커밋', before: true, after: true },
  { name: '여러 파일 범위 판단', before: true, after: true },
  { name: 'modified·untracked 자동 staging', before: false, after: true },
];

export function EvalBeforeAfter() {
  return (
    <DiagramFrame>
      <div
        className="text-center text-[11px] mb-4"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        같은 테스트 시나리오 3 개로{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          수정 전·후를 병렬 실행
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <EvalColumn
          title="수정 전"
          subtitle="v1 (스냅샷)"
          scenarios={SCENARIOS}
          version="before"
          metrics={{
            passRate: '2 / 3',
            tokens: '1,200',
            time: '15 초',
          }}
          accent={false}
        />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <EvalColumn
          title="수정 후"
          subtitle="v2 (modified·untracked 자동 staging)"
          scenarios={SCENARIOS}
          version="after"
          metrics={{
            passRate: '3 / 3',
            tokens: '1,350',
            time: '17 초',
          }}
          accent
        />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        통과율·토큰·시간을 나란히 보면{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          개선이 감이 아닌 근거
        </span>
        가 됩니다
      </figcaption>
    </DiagramFrame>
  );
}

type Metrics = {
  passRate: string;
  tokens: string;
  time: string;
};

function EvalColumn({
  title,
  subtitle,
  scenarios,
  version,
  metrics,
  accent,
}: {
  title: string;
  subtitle: string;
  scenarios: Scenario[];
  version: 'before' | 'after';
  metrics: Metrics;
  accent: boolean;
}) {
  const titleColor = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-text)';
  return (
    <section className="flex flex-col gap-3">
      <header>
        <h3
          className="text-base font-bold m-0"
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        <p
          className="text-[11px] mt-1 mb-0"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {subtitle}
        </p>
      </header>

      <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
        {scenarios.map((s) => {
          const passed = version === 'before' ? s.before : s.after;
          return <ScenarioRow key={s.name} name={s.name} passed={passed} />;
        })}
      </ul>

      <div
        className="rounded-md border px-3 py-2.5 grid grid-cols-3 gap-2 text-[11px]"
        style={{
          backgroundColor: accent
            ? 'var(--diagram-primary-soft)'
            : 'var(--diagram-bg-card)',
          borderColor: accent
            ? 'var(--diagram-primary)'
            : 'var(--diagram-border)',
        }}
      >
        <MetricCell label="통과율" value={metrics.passRate} accent={accent} />
        <MetricCell label="토큰" value={metrics.tokens} accent={accent} />
        <MetricCell label="시간" value={metrics.time} accent={accent} />
      </div>
    </section>
  );
}

function ScenarioRow({ name, passed }: { name: string; passed: boolean }) {
  const color = passed ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  const bg = passed
    ? 'var(--diagram-primary-soft)'
    : 'var(--diagram-bg-card)';
  const border = passed
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border)';
  return (
    <li
      className="flex items-center justify-between rounded-md border px-3 py-1.5 text-[11px]"
      style={{
        backgroundColor: bg,
        borderColor: border,
        borderStyle: passed ? 'solid' : 'dashed',
      }}
    >
      <span style={{ color: 'var(--diagram-text)' }}>{name}</span>
      <span style={{ color, fontWeight: 600 }}>
        {passed ? '통과' : '실패'}
      </span>
    </li>
  );
}

function MetricCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: boolean;
}) {
  const valueColor = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-text)';
  return (
    <div className="flex flex-col items-center">
      <div
        className="uppercase tracking-wider text-[9px]"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {label}
      </div>
      <div
        className="font-semibold text-sm mt-0.5"
        style={{ color: valueColor }}
      >
        {value}
      </div>
    </div>
  );
}
