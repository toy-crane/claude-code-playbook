import { DiagramFrame } from './primitives';

export function MemoryLifecycle() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 360"
          className="w-full min-w-[720px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ml-arrow-primary"
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
              id="ml-arrow-yellow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-yellow)" />
            </marker>
          </defs>

          {/* SESSION 1 (top-left) */}
          <SessionBox
            x={20}
            y={20}
            title="Session 1"
            userQuote={'"비유는 빼고 정의만 써줘"'}
            claudeLine="Claude: 선호를 관찰 → 저장"
          />

          {/* SESSION 2 (top-right) */}
          <SessionBox
            x={540}
            y={20}
            title="Session 2 (며칠 뒤)"
            userQuote="개념 설명 요청"
            claudeLine="Claude: 비유 없이 정의만"
            accent
          />

          {/* MEMORY FILE (bottom-center) */}
          <MemoryFile x={330} y={180} />

          {/* ① Arrow: Session 1 bottom → Memory top-left */}
          <path
            d="M 140 150 C 140 195, 240 205, 335 200"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#ml-arrow-yellow)"
          />
          <text
            x="170"
            y="238"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
          >
            ① 대화 중 자동 기록
          </text>

          {/* ② Arrow: Memory top-right → Session 2 bottom */}
          <path
            d="M 465 200 C 560 205, 660 195, 660 150"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#ml-arrow-primary)"
          />
          <text
            x="490"
            y="238"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
          >
            ② 다음 세션 시작 시 자동 로드
          </text>

          {/* timeline bar */}
          <line
            x1="30"
            y1="315"
            x2="770"
            y2="315"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text x="30" y="335" fontSize="11" fill="var(--diagram-text-muted)">
            오늘
          </text>
          <text
            x="770"
            y="335"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            며칠 뒤
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        한 세션에서의 교정이{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          다음 세션까지 자동으로 이어집니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function SessionBox({
  x,
  y,
  title,
  userQuote,
  claudeLine,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  userQuote: string;
  claudeLine: string;
  accent?: boolean;
}) {
  const width = 240;
  const height = 130;
  const fill = accent
    ? 'var(--diagram-primary-soft)'
    : 'var(--diagram-bg-card)';
  const stroke = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="12"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 18}
        y={y + 28}
        fontSize="13"
        fontWeight="700"
        fill={titleColor}
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {title}
      </text>
      <line
        x1={x + 18}
        y1={y + 40}
        x2={x + width - 18}
        y2={y + 40}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      <text
        x={x + 18}
        y={y + 64}
        fontSize="12"
        fill="var(--diagram-text-muted)"
      >
        사용자:
      </text>
      <text
        x={x + 18}
        y={y + 84}
        fontSize="12"
        fill="var(--diagram-text)"
        fontStyle="italic"
      >
        {userQuote}
      </text>
      <text
        x={x + 18}
        y={y + 114}
        fontSize="12"
        fill="var(--diagram-text-muted)"
      >
        {claudeLine}
      </text>
    </g>
  );
}

function MemoryFile({ x, y }: { x: number; y: number }) {
  const w = 140;
  const h = 100;
  return (
    <g>
      {/* file shape with folded corner */}
      <path
        d={`M ${x} ${y} L ${x + w - 20} ${y} L ${x + w} ${y + 20} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
        fill="var(--diagram-yellow-soft)"
        stroke="var(--diagram-yellow)"
        strokeWidth="1.75"
      />
      {/* fold line */}
      <path
        d={`M ${x + w - 20} ${y} L ${x + w - 20} ${y + 20} L ${x + w} ${y + 20}`}
        fill="none"
        stroke="var(--diagram-yellow)"
        strokeWidth="1"
      />
      <text
        x={x + w / 2}
        y={y + 40}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="var(--diagram-text)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        MEMORY.md
      </text>
      <text
        x={x + w / 2}
        y={y + 64}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        ~/.claude/projects/
      </text>
      <text
        x={x + w / 2}
        y={y + 84}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        (디스크에 영구 저장)
      </text>
    </g>
  );
}
