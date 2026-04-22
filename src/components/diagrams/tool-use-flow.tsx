import { DiagramFrame } from './primitives';

const steps = [
  {
    number: '01',
    title: '사용자 질문',
    desc: '사용자가 무언가를\n묻거나 요청합니다',
  },
  {
    number: '02',
    title: 'Tool 선택',
    desc: '어떤 Tool 을 쓸지\nLLM 이 판단합니다',
  },
  {
    number: '03',
    title: '호출 요청',
    desc: 'Tool 이름과 입력값을\n텍스트로 만듭니다',
    highlight: true,
  },
  {
    number: '04',
    title: 'Tool 실행',
    desc: '외부 시스템이 실행하고\n결과를 돌려줍니다',
  },
  {
    number: '05',
    title: '답변 생성',
    desc: '결과를 Context 에 넣고\n답변을 만듭니다',
  },
];

export function ToolUseFlow() {
  return (
    <DiagramFrame>
      <div className="flex flex-col md:flex-row items-stretch gap-1.5">
        {steps.map((step, i) => (
          <div key={step.number} className="contents">
            <Card {...step} />
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <figcaption
        className="mt-5 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        LLM 의 본질은 &ldquo;다음 텍스트 예측&rdquo;{' '}
        <span className="mx-1">—</span>{' '}
        그 텍스트 중 하나가{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Tool 호출 요청
        </span>
        입니다
      </figcaption>
    </DiagramFrame>
  );
}

function Card({
  number,
  title,
  desc,
  highlight,
}: {
  number: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  const bg = highlight ? 'var(--diagram-primary)' : 'var(--diagram-bg-card)';
  const border = highlight ? 'var(--diagram-primary)' : 'var(--diagram-border)';
  const textColor = highlight ? '#ffffff' : 'var(--diagram-text)';
  const mutedColor = highlight ? 'rgba(255,255,255,0.75)' : 'var(--diagram-text-muted)';
  return (
    <div
      className="flex-1 min-w-0 rounded-lg border px-2.5 py-3"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div
        className="text-[10px] font-mono tracking-wider mb-1.5"
        style={{ color: mutedColor }}
      >
        {number}
      </div>
      <div
        className="text-[13px] font-semibold mb-1 whitespace-nowrap"
        style={{ color: textColor }}
      >
        {title}
      </div>
      <div
        className="text-[11px] leading-snug whitespace-pre-line"
        style={{ color: mutedColor }}
      >
        {desc}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div
      className="flex items-center justify-center shrink-0 md:w-3"
      style={{ color: 'var(--diagram-text-muted)' }}
      aria-hidden
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="md:block hidden"
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="md:hidden block"
      >
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
