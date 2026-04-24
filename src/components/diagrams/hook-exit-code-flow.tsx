import { DiagramFrame } from './primitives';

export function HookExitCodeFlow() {
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
              id="hec-arrow-success"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-success)" />
            </marker>
            <marker
              id="hec-arrow-primary"
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
              id="hec-arrow-danger"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-danger)" />
            </marker>
          </defs>

          {/* Branch 1: exit 0 → 통과 (top) */}
          <path
            d="M 195 160 Q 245 160 278 75"
            stroke="var(--diagram-success)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#hec-arrow-success)"
          />
          <line
            x1="400"
            y1="75"
            x2="518"
            y2="75"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
            markerEnd="url(#hec-arrow-success)"
          />
          <text
            x="459"
            y="65"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-success)"
          >
            문제 없음
          </text>

          {/* Branch 2: exit 2 → Claude (middle, main path) */}
          <line
            x1="195"
            y1="170"
            x2="278"
            y2="170"
            stroke="var(--diagram-primary)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#hec-arrow-primary)"
          />
          <line
            x1="400"
            y1="170"
            x2="518"
            y2="170"
            stroke="var(--diagram-primary)"
            strokeWidth="2"
            markerEnd="url(#hec-arrow-primary)"
          />
          <text
            x="459"
            y="160"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            stderr 전달
          </text>

          {/* Branch 3: 기타 → 사용자만 (bottom) */}
          <path
            d="M 195 180 Q 245 180 278 265"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 3"
            markerEnd="url(#hec-arrow-danger)"
          />
          <line
            x1="400"
            y1="265"
            x2="518"
            y2="265"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#hec-arrow-danger)"
          />
          <text
            x="459"
            y="255"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-danger)"
          >
            stderr 전달
          </text>

          {/* Script source box (drawn on top of arrows) */}
          <rect
            x="30"
            y="140"
            width="165"
            height="60"
            rx="8"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="112"
            y="164"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontWeight="600"
          >
            Hook 스크립트
          </text>
          <text
            x="112"
            y="184"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            exit code 반환
          </text>

          {/* Exit code labels */}
          <ExitCodeBox
            x={280}
            y={55}
            label="exit 0"
            tone="success"
            bold={false}
          />
          <ExitCodeBox x={280} y={150} label="exit 2" tone="primary" bold />
          <ExitCodeBox
            x={280}
            y={245}
            label="기타 (1, 3…)"
            tone="danger"
            bold={false}
          />

          {/* Outcome boxes */}
          <OutcomeBox
            x={520}
            y={55}
            tone="success"
            title="통과"
            detail="Claude 는 계속 진행"
          />
          <OutcomeBox
            x={520}
            y={150}
            tone="primary"
            title="Claude 에게 피드백"
            detail="에러 인식 → 자동 수정"
            bold
          />
          <OutcomeBox
            x={520}
            y={245}
            tone="danger"
            title="사용자 transcript 에만"
            detail="Claude 는 에러를 모름"
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Claude 에게 에러를 전달하려면 스크립트가{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          exit 2
        </span>
        로 끝나야 합니다
      </figcaption>
    </DiagramFrame>
  );
}

function ExitCodeBox({
  x,
  y,
  label,
  tone,
  bold,
}: {
  x: number;
  y: number;
  label: string;
  tone: 'success' | 'primary' | 'danger';
  bold?: boolean;
}) {
  const fill = `var(--diagram-${tone}-soft)`;
  const stroke = `var(--diagram-${tone})`;
  const color = `var(--diagram-${tone})`;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={120}
        height={40}
        rx={6}
        fill={fill}
        stroke={stroke}
        strokeWidth={bold ? 1.75 : 1.25}
      />
      <text
        x={x + 60}
        y={y + 25}
        textAnchor="middle"
        fontSize="13"
        fill={color}
        fontWeight={bold ? 700 : 600}
      >
        {label}
      </text>
    </g>
  );
}

function OutcomeBox({
  x,
  y,
  tone,
  title,
  detail,
  bold,
}: {
  x: number;
  y: number;
  tone: 'success' | 'primary' | 'danger';
  title: string;
  detail: string;
  bold?: boolean;
}) {
  const isNeutralLook = tone !== 'primary';
  const fill = isNeutralLook ? 'var(--diagram-bg-card)' : `var(--diagram-${tone}-soft)`;
  const stroke = isNeutralLook ? 'var(--diagram-border)' : `var(--diagram-${tone})`;
  const titleColor = `var(--diagram-${tone})`;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={250}
        height={40}
        rx={6}
        fill={fill}
        stroke={stroke}
        strokeWidth={bold ? 1.5 : 1}
      />
      <text
        x={x + 125}
        y={y + 17}
        textAnchor="middle"
        fontSize="12"
        fill={titleColor}
        fontWeight={bold ? 700 : 600}
      >
        {title}
      </text>
      <text
        x={x + 125}
        y={y + 32}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {detail}
      </text>
    </g>
  );
}
