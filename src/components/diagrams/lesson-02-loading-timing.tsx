import { DiagramFrame } from './primitives';

type Column = {
  title: string;
  subtitle: string;
  trigger: string;
  mode: '자동' | '자동 · 조건부' | '수동';
  example: string;
  accent: 'primary' | 'success' | 'danger';
};

const COLUMNS: Column[] = [
  {
    title: 'CLAUDE.md',
    subtitle: '프로젝트 맥락',
    trigger: '매 세션 시작 시 전체',
    mode: '자동',
    example: '"Next.js + Shadcn 사용"',
    accent: 'primary',
  },
  {
    title: '.claude/rules/',
    subtitle: '경로별 제약',
    trigger: 'paths 매칭 시 (없으면 전역)',
    mode: '자동 · 조건부',
    example: '"NEVER .env 커밋"',
    accent: 'success',
  },
  {
    title: '.claude/commands/',
    subtitle: '반복 프롬프트',
    trigger: '사용자가 /command 호출',
    mode: '수동',
    example: '/commit, /review',
    accent: 'danger',
  },
];

export function Lesson02LoadingTiming() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-5">
        <LoadingColumn column={COLUMNS[0]} />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <LoadingColumn column={COLUMNS[1]} />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <LoadingColumn column={COLUMNS[2]} />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        같은 <code>.claude/</code> 안의 세 장치, <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          로드 시점
        </span>이 다릅니다
      </figcaption>
    </DiagramFrame>
  );
}

function LoadingColumn({ column }: { column: Column }) {
  const color = `var(--diagram-${column.accent})`;
  const soft = `var(--diagram-${column.accent}-soft)`;

  return (
    <section className="flex flex-col gap-3">
      <header>
        <h3
          className="text-base font-bold m-0 font-mono"
          style={{ color }}
        >
          {column.title}
        </h3>
        <p
          className="text-xs mt-1 mb-0"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {column.subtitle}
        </p>
      </header>

      <div
        className="rounded-md border px-3 py-2.5 text-xs"
        style={{
          backgroundColor: soft,
          borderColor: color,
        }}
      >
        <div
          className="uppercase tracking-wider text-[10px] mb-1"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          트리거
        </div>
        <div style={{ color: 'var(--diagram-text)' }}>{column.trigger}</div>
      </div>

      <div className="flex items-center justify-center">
        <span
          className="rounded-full border px-3 py-1 text-[11px] font-semibold"
          style={{
            backgroundColor: 'var(--diagram-bg-card)',
            borderColor: color,
            color,
          }}
        >
          {column.mode}
        </span>
      </div>

      <div
        className="rounded-md border border-dashed px-3 py-2 text-[11px]"
        style={{
          borderColor: 'var(--diagram-border)',
          color: 'var(--diagram-text-muted)',
          backgroundColor: 'var(--diagram-bg-card)',
        }}
      >
        <div
          className="uppercase tracking-wider text-[10px] mb-1"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          예시
        </div>
        <code style={{ color: 'var(--diagram-text)' }}>{column.example}</code>
      </div>
    </section>
  );
}
