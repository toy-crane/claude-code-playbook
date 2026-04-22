import { DiagramFrame } from './primitives';

export function UnverifiedFlow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 380"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="uvf-arrow-muted"
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

          {/* Top timeline axis: 기능 추가 → */}
          <line
            x1="40"
            y1="35"
            x2="760"
            y2="35"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1"
            strokeDasharray="3 3"
            markerEnd="url(#uvf-arrow-muted)"
          />
          <text
            x="400"
            y="22"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            기능 추가 →
          </text>

          {/* Stage labels */}
          <StageLabel x={140} title="초기 구현" subtitle="기능 5 개" />
          <StageLabel x={400} title="필터 추가" subtitle="기능 10 개" />
          <StageLabel x={660} title="기능이 쌓이면" subtitle="기능 30 개" />

          {/* Dashed vertical separators between stages */}
          <line
            x1="270"
            y1="90"
            x2="270"
            y2="360"
            stroke="var(--diagram-border)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <line
            x1="530"
            y1="90"
            x2="530"
            y2="360"
            stroke="var(--diagram-border)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* Left row labels */}
          <text
            x="30"
            y="128"
            textAnchor="start"
            fontSize="12"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            AI
          </text>
          <text
            x="30"
            y="143"
            textAnchor="start"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            코드 작성
          </text>

          <text
            x="30"
            y="260"
            textAnchor="start"
            fontSize="12"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            사람
          </text>
          <text
            x="30"
            y="275"
            textAnchor="start"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            체크리스트 검증
          </text>

          {/* AI blocks — same size across stages (constant effort) */}
          <AiBlock cx={140} />
          <AiBlock cx={400} />
          <AiBlock cx={660} />

          {/* Human verification bars — growing proportionally to checklist size */}
          <ChecklistBar cx={140} count={5} />
          <ChecklistBar cx={400} count={10} />
          <ChecklistBar cx={660} count={30} accent />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        AI 의{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          코드 작성 비용은 그대로
        </span>
        인데, 사람의{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-danger)' }}>
          체크리스트는 기능이 쌓일수록 누적됩니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function StageLabel({
  x,
  title,
  subtitle,
}: {
  x: number;
  title: string;
  subtitle: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={62}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-text)"
        fontWeight="600"
      >
        {title}
      </text>
      <text
        x={x}
        y={80}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {subtitle}
      </text>
    </g>
  );
}

function AiBlock({ cx }: { cx: number }) {
  return (
    <g>
      <rect
        x={cx - 60}
        y={105}
        width="120"
        height="50"
        rx="8"
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.25"
      />
      <text
        x={cx}
        y={127}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-primary)"
        fontWeight="600"
      >
        코드 생성
      </text>
      <text
        x={cx}
        y={144}
        textAnchor="middle"
        fontSize="10"
        fill="var(--diagram-primary)"
        opacity="0.75"
      >
        기능 구현
      </text>
    </g>
  );
}

function ChecklistBar({
  cx,
  count,
  accent,
}: {
  cx: number;
  count: number;
  accent?: boolean;
}) {
  const height = count * 4.8;
  const yBottom = 340;
  const yTop = yBottom - height;
  const width = 96;
  const fill = accent
    ? 'var(--diagram-danger-soft)'
    : 'var(--diagram-bg-card)';
  const stroke = accent
    ? 'var(--diagram-danger)'
    : 'var(--diagram-border-strong)';
  const color = accent ? 'var(--diagram-danger)' : 'var(--diagram-text)';
  const stripeCount = Math.max(1, Math.floor(height / 14));

  return (
    <g>
      <rect
        x={cx - width / 2}
        y={yTop}
        width={width}
        height={height}
        rx="4"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* Stripes suggest stacked checklist rows */}
      {Array.from({ length: stripeCount - 1 }).map((_, i) => (
        <line
          key={i}
          x1={cx - width / 2 + 6}
          x2={cx + width / 2 - 6}
          y1={yTop + (height / stripeCount) * (i + 1)}
          y2={yTop + (height / stripeCount) * (i + 1)}
          stroke={stroke}
          strokeWidth="0.75"
          opacity="0.35"
        />
      ))}
      <text
        x={cx}
        y={yTop - 8}
        textAnchor="middle"
        fontSize="13"
        fill={color}
        fontWeight="600"
      >
        {count} 항목
      </text>
    </g>
  );
}
