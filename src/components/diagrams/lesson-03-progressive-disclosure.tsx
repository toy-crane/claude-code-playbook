import { DiagramFrame } from './primitives';

type Stage = {
  level: string;
  title: string;
  trigger: string;
  loaded: string;
  tokens: string;
};

const STAGES: Stage[] = [
  {
    level: '1단계',
    title: '이름표',
    trigger: '매 대화 시작',
    loaded: 'name + description',
    tokens: '~30-50 토큰',
  },
  {
    level: '2단계',
    title: '본문',
    trigger: 'Skill 호출 시',
    loaded: 'SKILL.md 전체',
    tokens: '~2,000-5,000 토큰',
  },
  {
    level: '3단계',
    title: '참조 파일',
    trigger: '필요할 때만',
    loaded: 'references/*.md',
    tokens: '그때그때',
  },
];

export function Lesson03ProgressiveDisclosure() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-4 items-stretch">
        <StageCard stage={STAGES[0]} />
        <Arrow />
        <StageCard stage={STAGES[1]} />
        <Arrow />
        <StageCard stage={STAGES[2]} />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        단계별로{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          필요한 만큼만
        </span>{' '}
        Context 에 쌓입니다
      </figcaption>
    </DiagramFrame>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  return (
    <section className="flex flex-col gap-3">
      <header>
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {stage.level}
        </div>
        <h3
          className="text-base font-bold m-0 mt-1"
          style={{ color: 'var(--diagram-primary)' }}
        >
          {stage.title}
        </h3>
      </header>

      <div
        className="rounded-md border px-3 py-2.5 text-xs"
        style={{
          backgroundColor: 'var(--diagram-bg-card)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        <div
          className="uppercase tracking-wider text-[10px] mb-1"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          트리거
        </div>
        <div style={{ color: 'var(--diagram-text)' }}>{stage.trigger}</div>
      </div>

      <div
        className="rounded-md border px-3 py-2.5 text-xs"
        style={{
          backgroundColor: 'var(--diagram-primary-soft)',
          borderColor: 'var(--diagram-primary)',
        }}
      >
        <div
          className="uppercase tracking-wider text-[10px] mb-1"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          로드되는 것
        </div>
        <code
          className="font-mono text-[11px]"
          style={{ color: 'var(--diagram-text)' }}
        >
          {stage.loaded}
        </code>
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
          Context 사용량
        </div>
        <code style={{ color: 'var(--diagram-text)' }}>{stage.tokens}</code>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div
      className="hidden md:flex items-center justify-center"
      style={{ color: 'var(--diagram-primary)' }}
      aria-hidden
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M6 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
