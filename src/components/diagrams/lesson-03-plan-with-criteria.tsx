import { DiagramFrame } from './primitives';

export function Lesson03PlanWithCriteria() {
  return (
    <DiagramFrame>
      <div className="text-center mb-4">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          AI 가 실행할 수 있는 계획
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1.2fr_auto_1fr] md:items-stretch">
        <PlanCard
          title="요구사항"
          subtitle="무엇을 만들 것인가"
          tone="neutral"
        >
          <div className="text-[12px] leading-snug">
            &apos;완료&apos; 필터 선택 시
            <br />
            완료 항목만 표시된다
          </div>
        </PlanCard>
        <HorizontalArrow direction="right" />
        <PlanCard
          title="성공 기준"
          subtitle="어떻게 검증할 것인가"
          tone="primary"
        >
          <ul className="list-none p-0 m-0 text-[12px] leading-snug space-y-0.5">
            <li>Todo 5개 (완료 2, 미완료 3)</li>
            <li>&apos;완료&apos; 필터 선택</li>
            <li>→ 2개 표시</li>
            <li>→ 모두 완료 항목</li>
          </ul>
        </PlanCard>
        <HorizontalArrow direction="left" />
        <PlanCard
          title="범위 제한"
          subtitle="무엇을 안 할 것인가"
          tone="danger"
        >
          <ul className="list-none p-0 m-0 text-[12px] leading-snug space-y-0.5">
            <li>필터 조합 ×</li>
            <li>필터 애니메이션 ×</li>
          </ul>
        </PlanCard>
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        구체적 입력과 기대 출력이 있어야{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          AI 가 pass/fail 을 판단
        </span>
        할 수 있습니다
      </figcaption>
    </DiagramFrame>
  );
}

type PlanTone = 'neutral' | 'primary' | 'danger';

function PlanCard({
  title,
  subtitle,
  tone,
  children,
}: {
  title: string;
  subtitle: string;
  tone: PlanTone;
  children: React.ReactNode;
}) {
  const palette = {
    neutral: {
      bg: 'var(--diagram-bg-card)',
      border: 'var(--diagram-border-strong)',
      title: 'var(--diagram-text)',
    },
    primary: {
      bg: 'var(--diagram-primary-soft)',
      border: 'var(--diagram-primary)',
      title: 'var(--diagram-primary)',
    },
    danger: {
      bg: 'var(--diagram-danger-soft)',
      border: 'var(--diagram-danger)',
      title: 'var(--diagram-danger)',
    },
  }[tone];

  return (
    <section
      className="flex flex-col gap-2 rounded-md border px-3 py-3"
      style={{ backgroundColor: palette.bg, borderColor: palette.border }}
    >
      <header className="flex flex-col items-center gap-0.5">
        <h4
          className="text-[14px] font-bold m-0"
          style={{ color: palette.title }}
        >
          {title}
        </h4>
        <span
          className="text-[11px]"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {subtitle}
        </span>
      </header>
      <div
        className="text-center"
        style={{ color: 'var(--diagram-text)' }}
      >
        {children}
      </div>
    </section>
  );
}

function HorizontalArrow({ direction }: { direction: 'left' | 'right' }) {
  const rotate = direction === 'right' ? 0 : 180;
  return (
    <div
      className="hidden md:flex items-center justify-center"
      style={{ color: 'var(--diagram-primary)' }}
      aria-hidden
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <path d="M2 9 L14 9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 5 L15 9 L11 13"
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
