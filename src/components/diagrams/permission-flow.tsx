import { DiagramFrame } from './primitives';

export function PermissionFlow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 280"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="pf-arrow-primary"
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
              id="pf-arrow-cyan"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-cyan)" />
            </marker>
            <marker
              id="pf-arrow-pink"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-pink)" />
            </marker>
          </defs>

          {/* AI 가 행동 요청 (top) */}
          <rect
            x="290"
            y="20"
            width="220"
            height="48"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="49"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            AI 가 행동 요청
          </text>

          {/* AI → 사용자 선택 */}
          <line
            x1="400"
            y1="68"
            x2="400"
            y2="98"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#pf-arrow-primary)"
          />

          {/* 사용자 선택 (yellow — user input required) */}
          <rect
            x="290"
            y="100"
            width="220"
            height="48"
            rx="10"
            fill="var(--diagram-yellow-soft)"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="129"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            사용자 선택
          </text>

          {/* Branch arrows: 사용자 선택 → 3 outcomes */}
          {/* Left: Yes (cyan) */}
          <path
            d="M 340 148 Q 340 175 165 198"
            stroke="var(--diagram-cyan)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#pf-arrow-cyan)"
          />
          <text
            x="220"
            y="175"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-cyan)"
          >
            Yes (y)
          </text>

          {/* Center: Always (primary) */}
          <line
            x1="400"
            y1="148"
            x2="400"
            y2="198"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            markerEnd="url(#pf-arrow-primary)"
          />
          <text
            x="412"
            y="178"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Always (a)
          </text>

          {/* Right: No (pink) */}
          <path
            d="M 460 148 Q 460 175 635 198"
            stroke="var(--diagram-pink)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#pf-arrow-pink)"
          />
          <text
            x="525"
            y="175"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-pink)"
          >
            No (n)
          </text>

          {/* Outcome boxes */}
          <OutcomeBox
            x={50}
            label="이번 한 번만 실행"
            color="cyan"
          />
          <OutcomeBox
            x={290}
            label="이후 자동 허용"
            sub="settings.json 에 저장"
            color="primary"
            accent
          />
          <OutcomeBox
            x={530}
            label="차단"
            sub="AI 가 다른 방법 모색"
            color="pink"
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        한 번만 허용할지,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          앞으로도 자동 허용할지
        </span>{' '}
        — 매 prompt 마다 한 번씩 결정합니다
      </figcaption>
    </DiagramFrame>
  );
}

function OutcomeBox({
  x,
  label,
  sub,
  color,
  accent,
}: {
  x: number;
  label: string;
  sub?: string;
  color: 'cyan' | 'primary' | 'pink';
  accent?: boolean;
}) {
  const fill = `var(--diagram-${color}-soft)`;
  const stroke = `var(--diagram-${color})`;
  return (
    <g>
      <rect
        x={x}
        y={200}
        width="220"
        height={sub ? 64 : 50}
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 110}
        y={sub ? 224 : 230}
        textAnchor="middle"
        fontSize="13"
        fontWeight={accent ? 600 : 500}
        fill={stroke}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + 110}
          y={246}
          textAnchor="middle"
          fontSize="11"
          fill="var(--diagram-text-muted)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}
