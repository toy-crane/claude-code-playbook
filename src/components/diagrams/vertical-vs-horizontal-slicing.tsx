import { DiagramFrame } from './primitives';

export function VerticalVsHorizontalSlicing() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <VerticalBlock />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <HorizontalBlock />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        Vertical은 매 Task가 살아있고,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-danger)' }}
        >
          Horizontal은 통합 시점에 한꺼번에 터집니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function VerticalBlock() {
  const tasks = [1, 2, 3, 4];
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-success)' }}
        >
          Vertical ✅
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          한 Task = UI + 로직 + 데이터
        </span>
      </header>
      <div className="grid grid-cols-4 gap-2">
        {tasks.map((t) => (
          <div key={t} className="flex flex-col gap-1">
            <Cell label="UI" tone="success" />
            <Cell label="Logic" tone="success" />
            <Cell label="Data" tone="success" />
            <p
              className="text-xs text-center mt-1 m-0"
              style={{ color: 'var(--diagram-text-muted)' }}
            >
              T{t}
            </p>
          </div>
        ))}
      </div>
      <p
        className="text-xs m-0"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        각 Task가 끝나면 기능이 실제로 살아있다
      </p>
    </section>
  );
}

function HorizontalBlock() {
  const layers = ['Task 1: UI 전체', 'Task 2: 로직 전체', 'Task 3: 데이터 전체'];
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-danger)' }}
        >
          Horizontal ❌
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          Task별로 한 layer만
        </span>
      </header>
      <div className="flex flex-col gap-1">
        {layers.map((label) => (
          <Cell key={label} label={label} tone="danger" fullWidth />
        ))}
      </div>
      <p
        className="text-xs m-0"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        통합 시점에 회귀가 한꺼번에 터진다
      </p>
    </section>
  );
}

function Cell({
  label,
  tone,
  fullWidth,
}: {
  label: string;
  tone: 'success' | 'danger';
  fullWidth?: boolean;
}) {
  const bg =
    tone === 'success'
      ? 'var(--diagram-success-soft)'
      : 'var(--diagram-danger-soft)';
  const fg =
    tone === 'success' ? 'var(--diagram-success)' : 'var(--diagram-danger)';
  return (
    <div
      className={`px-2 py-2 text-center text-xs rounded ${
        fullWidth ? 'w-full' : ''
      }`}
      style={{ background: bg, color: fg, fontWeight: 600 }}
    >
      {label}
    </div>
  );
}
