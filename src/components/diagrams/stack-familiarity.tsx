import { DiagramFrame } from './primitives';

export function StackFamiliarity() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 360"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="sf-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-primary)" />
            </marker>
          </defs>

          {/* Axes (dashed L) */}
          <line
            x1="60"
            y1="30"
            x2="60"
            y2="320"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="320"
            x2="770"
            y2="320"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Axis labels */}
          <text x="65" y="22" fontSize="11" fill="var(--diagram-text-muted)">
            코드 정확도 ↑
          </text>
          <text
            x="765"
            y="340"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            학습 데이터 밀도 →
          </text>

          {/* Trend curve (dashed, showing positive correlation) */}
          <path
            d="M 100 270 Q 380 270 560 110"
            stroke="var(--diagram-primary)"
            strokeDasharray="5 4"
            strokeWidth="1.25"
            fill="none"
            opacity="0.55"
            markerEnd="url(#sf-arrow)"
          />

          {/* Low-density stage card (muted) */}
          <StackCard
            x={90}
            y={200}
            title="낯선 프레임워크"
            sub="학습 데이터 희소"
            note="AI 추측 ↑"
          />

          {/* High-density stage card (accent primary) */}
          <StackCard
            x={480}
            y={70}
            title="Next.js + Shadcn"
            sub="학습 데이터 풍부"
            note="AI 추측 ↓"
            accent
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        같은 AI 라도{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          어떤 스택 위에서 시키느냐
        </span>
        에 따라 결과 품질이 달라집니다
      </figcaption>
    </DiagramFrame>
  );
}

function StackCard({
  x,
  y,
  title,
  sub,
  note,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  note: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  const noteColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="230"
        height="90"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 16}
        y={y + 26}
        fontSize="14"
        fontWeight="600"
        fill={titleColor}
      >
        {title}
      </text>
      <text x={x + 16} y={y + 50} fontSize="11" fill="var(--diagram-text-muted)">
        {sub}
      </text>
      <text
        x={x + 16}
        y={y + 74}
        fontSize="12"
        fontWeight={accent ? 600 : 500}
        fill={noteColor}
      >
        {note}
      </text>
    </g>
  );
}
