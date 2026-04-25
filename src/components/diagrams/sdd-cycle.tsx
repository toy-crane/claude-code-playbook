import { DiagramFrame } from './primitives';

const STAGES = [
  { label: 'Ideate', artifact: 'idea.md', muted: true },
  { label: 'Specify', artifact: 'spec.md' },
  { label: 'Sketch', artifact: 'wireframe.html' },
  { label: 'Plan', artifact: 'plan.md' },
  { label: 'Build', artifact: '코드 + learnings.md' },
  { label: 'Compound', artifact: 'Skill · Hook 갱신' },
];

export function SddCycle() {
  const boxWidth = 100;
  const gap = 14;
  const totalWidth = STAGES.length * boxWidth + (STAGES.length - 1) * gap;
  const startX = (800 - totalWidth) / 2;
  const boxY = 140;
  const boxHeight = 56;

  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 300"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="sdd-arrow-primary"
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
              id="sdd-arrow-warning"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-warning)" />
            </marker>
          </defs>

          {/* Loop-back label — above the arch */}
          <text
            x="400"
            y="40"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-warning)"
            fontWeight="600"
          >
            다음 사이클의 도구 갱신
          </text>

          {/* Loop-back arch from Compound top → Ideate top */}
          <path
            d={`M ${startX + 5 * (boxWidth + gap) + boxWidth / 2} ${boxY} C ${
              startX + 5 * (boxWidth + gap) + boxWidth / 2
            } 55, ${startX + boxWidth / 2} 55, ${startX + boxWidth / 2} ${boxY}`}
            stroke="var(--diagram-warning)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            markerEnd="url(#sdd-arrow-warning)"
          />

          {/* Stage boxes */}
          {STAGES.map((stage, i) => {
            const x = startX + i * (boxWidth + gap);
            return (
              <StageBox
                key={stage.label}
                x={x}
                y={boxY}
                width={boxWidth}
                height={boxHeight}
                label={stage.label}
                artifact={stage.artifact}
                muted={stage.muted}
                index={i + 1}
              />
            );
          })}

          {/* Inter-stage arrows (forward flow) */}
          {STAGES.slice(0, -1).map((_, i) => {
            const x1 = startX + i * (boxWidth + gap) + boxWidth;
            const x2 = startX + (i + 1) * (boxWidth + gap) - 2;
            return (
              <line
                key={`arrow-${i}`}
                x1={x1}
                y1={boxY + boxHeight / 2}
                x2={x2}
                y2={boxY + boxHeight / 2}
                stroke="var(--diagram-primary)"
                strokeWidth="1.5"
                markerEnd="url(#sdd-arrow-primary)"
              />
            );
          })}

          {/* "이 챕터의 시작점" indicator on Specify */}
          <text
            x={startX + 1 * (boxWidth + gap) + boxWidth / 2}
            y={boxY + boxHeight + 50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            ↑ 이 챕터의 시작점
          </text>

          {/* "사용 안 함" indicator on Ideate */}
          <text
            x={startX + boxWidth / 2}
            y={boxY + boxHeight + 50}
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            (사용 안 함)
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        각 단계의 출력이 다음의 입력 —{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-warning)' }}
        >
          Compound가 다음 사이클의 도구를 갱신
        </span>
        합니다
      </figcaption>
    </DiagramFrame>
  );
}

function StageBox({
  x,
  y,
  width,
  height,
  label,
  artifact,
  muted,
  index,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  artifact: string;
  muted?: boolean;
  index: number;
}) {
  const fill = muted ? 'var(--diagram-bg-card)' : 'var(--diagram-primary-soft)';
  const stroke = muted ? 'var(--diagram-border-strong)' : 'var(--diagram-primary)';
  const labelColor = muted ? 'var(--diagram-text-muted)' : 'var(--diagram-primary)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.25"
        strokeDasharray={muted ? '4 3' : undefined}
      />
      <text
        x={x + width / 2}
        y={y + 24}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill={labelColor}
      >
        {`${index}. ${label}`}
      </text>
      <text
        x={x + width / 2}
        y={y + 44}
        textAnchor="middle"
        fontSize="10"
        fill={muted ? 'var(--diagram-text-muted)' : 'var(--diagram-primary)'}
        opacity={muted ? 0.7 : 0.85}
      >
        {artifact}
      </text>
    </g>
  );
}
