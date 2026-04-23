import { DiagramFrame } from './primitives';

export function Lesson03IterativePlanningCycle() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 340"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ipc-arrow-primary"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-primary)" />
            </marker>
            <marker
              id="ipc-arrow-muted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-text-muted)" />
            </marker>
          </defs>

          {/* Clockwise arrows: 계획 → 실행 → 발견 → 다시 계획 → 계획 */}
          {/* 1. 계획 → 실행 (top) */}
          <line
            x1="244"
            y1="85"
            x2="556"
            y2="85"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            markerEnd="url(#ipc-arrow-muted)"
          />

          {/* 2. 실행 → 발견 (right) */}
          <line
            x1="650"
            y1="124"
            x2="650"
            y2="216"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            markerEnd="url(#ipc-arrow-muted)"
          />

          {/* 3. 발견 → 다시 계획 (bottom) — highlighted as the pivot */}
          <line
            x1="556"
            y1="255"
            x2="244"
            y2="255"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            markerEnd="url(#ipc-arrow-primary)"
          />
          <text
            x="400"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            새 세션에서
          </text>

          {/* 4. 다시 계획 → 계획 (left) */}
          <line
            x1="150"
            y1="216"
            x2="150"
            y2="124"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            markerEnd="url(#ipc-arrow-muted)"
          />

          {/* Nodes */}
          <CycleNode x={60} y={50} label="계획" />
          <CycleNode x={560} y={50} label="실행" />
          <CycleNode x={560} y={220} label="발견" accent />
          <CycleNode x={60} y={220} label="다시 계획" />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        실행 후 보이는 것은{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          새 세션의 다음 계획
        </span>
        으로 이어집니다
      </figcaption>
    </DiagramFrame>
  );
}

function CycleNode({
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
  const fill = accent
    ? 'var(--diagram-primary-soft)'
    : 'var(--diagram-bg-card)';
  const stroke = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border-strong)';
  const textColor = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-text)';
  const weight = accent ? 700 : 500;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={180}
        height={70}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <text
        x={x + 90}
        y={y + 44}
        textAnchor="middle"
        fontSize="16"
        fill={textColor}
        fontWeight={weight}
      >
        {label}
      </text>
    </g>
  );
}
