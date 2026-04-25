import { DiagramFrame } from './primitives';

const STAGES = [
  { label: 'Specify', x: 90, y: 90, accent: true },
  { label: 'Sketch', x: 230, y: 115 },
  { label: 'Plan', x: 370, y: 150 },
  { label: 'Build', x: 510, y: 195 },
  { label: 'Compound', x: 650, y: 250 },
];

export function SpecAmplification() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="sa-arrow-danger"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-danger)" />
            </marker>
            <linearGradient id="sa-drift-fill" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--diagram-danger)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--diagram-danger)" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* "올바른 방향" reference line — dashed at top */}
          <line
            x1="60"
            y1="60"
            x2="740"
            y2="60"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text
            x="745"
            y="64"
            fontSize="11"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            올바른 방향
          </text>

          {/* Drift wedge — between correct line and actual path */}
          <path
            d={`M 90 60 L 650 60 L 650 250 L 90 90 Z`}
            fill="url(#sa-drift-fill)"
            stroke="none"
          />

          {/* Drift connecting line through stage centers */}
          <path
            d={`M ${STAGES[0].x + 40} ${STAGES[0].y + 18} L ${
              STAGES[1].x + 40
            } ${STAGES[1].y + 18} L ${STAGES[2].x + 40} ${
              STAGES[2].y + 18
            } L ${STAGES[3].x + 40} ${STAGES[3].y + 18} L ${
              STAGES[4].x + 40
            } ${STAGES[4].y + 18}`}
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#sa-arrow-danger)"
          />

          {/* Stage boxes */}
          {STAGES.map((s) => (
            <StageMark
              key={s.label}
              x={s.x}
              y={s.y}
              label={s.label}
              accent={s.accent}
            />
          ))}

          {/* Drift gap labels — small "오차" markers under arrows */}
          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            Spec의 작은 오차 → 후속 단계로 갈수록 빠르게 커짐
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        AI는 사고를 증폭합니다 —{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-danger)' }}
        >
          Spec이 잘못되면 후속 4단계가 같은 방향으로 잘못
        </span>
        됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function StageMark({
  x,
  y,
  label,
  accent,
}: {
  x: number;
  y: number;
  label: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const textColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="80"
        height="36"
        rx="6"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.5 : 1.25}
      />
      <text
        x={x + 40}
        y={y + 23}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}
