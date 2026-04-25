import { DiagramFrame } from './primitives';

const PHASES = [
  { phase: 'Ideate', skill: '/idea-refine' },
  { phase: 'Specify', skill: '/write-spec' },
  { phase: 'Sketch', skill: '/sketch-wireframe' },
  { phase: 'Plan', skill: '/draft-plan' },
  { phase: 'Build', skill: '/execute-plan' },
  { phase: 'Compound', skill: '/self-improve' },
];

export function TemplateToolsMap() {
  const cardW = 110;
  const gap = 4;
  const totalW = PHASES.length * cardW + (PHASES.length - 1) * gap;
  const startX = (800 - totalW) / 2;
  const cardY = 40;
  const cardH = 100;

  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 200"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          {PHASES.map((p, i) => {
            const x = startX + i * (cardW + gap);
            const cx = x + cardW / 2;
            return (
              <g key={p.phase}>
                <rect
                  x={x}
                  y={cardY}
                  width={cardW}
                  height={cardH}
                  rx="8"
                  fill="var(--diagram-primary-soft)"
                  stroke="var(--diagram-primary)"
                  strokeWidth="1.25"
                />
                <text
                  x={cx}
                  y={cardY + 40}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  fill="var(--diagram-primary)"
                >
                  {p.phase}
                </text>
                <text
                  x={cx}
                  y={cardY + 72}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--diagram-primary)"
                  opacity={0.85}
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
                >
                  {p.skill}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        각 단계마다{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          한 Skill 이 절차를 자동화
        </span>
        합니다 — 보조 도구(Agent · Hook · Rule)는 본문 표 참조
      </figcaption>
    </DiagramFrame>
  );
}
