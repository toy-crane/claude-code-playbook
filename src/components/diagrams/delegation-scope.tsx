import { DiagramFrame } from './primitives';

export function DelegationScope() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 420"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ds-arrow"
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
            x1="40"
            y1="30"
            x2="40"
            y2="390"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="390"
            x2="780"
            y2="390"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Axis labels */}
          <text x="45" y="20" fontSize="11" fill="var(--diagram-text-muted)">
            경계 두께 ↑
          </text>
          <text
            x="775"
            y="410"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            위임 단위 →
          </text>

          {/* Stage 1 → Stage 2 */}
          <path
            d="M 250 305 Q 274 305 298 205"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#ds-arrow)"
          />
          {/* Stage 2 → Stage 3 */}
          <path
            d="M 500 205 Q 524 205 548 105"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#ds-arrow)"
          />

          {/* Stage cards (bottom-left → top-right staircase) */}
          <StageCard
            x={50}
            y={260}
            title="1. 함수 한 개"
            scope="단위 · 입출력 정의"
            boundary="경계 · 테스트 몇 개"
            tools="Plan / Task + 테스트"
          />
          <StageCard
            x={300}
            y={160}
            title="2. 화면 · 컴포넌트"
            scope="단위 · 시나리오 3~5개"
            boundary="경계 · 성공 기준 + UI 구조"
            tools="Plan / Task + Skill"
          />
          <StageCard
            x={550}
            y={60}
            title="3. 기능 전체"
            scope="단위 · 여러 화면 · 시스템 연결"
            boundary="경계 · spec.md (명세)"
            tools="SDD 6단계 사이클"
            accent
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        위임 단위가 커질수록{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          경계가 더 단단해져야 합니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function StageCard({
  x,
  y,
  title,
  scope,
  boundary,
  tools,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  scope: string;
  boundary: string;
  tools: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="90"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 16}
        y={y + 24}
        fontSize="14"
        fontWeight="600"
        fill={titleColor}
      >
        {title}
      </text>
      <text x={x + 16} y={y + 50} fontSize="11" fill="var(--diagram-text-muted)">
        {scope}
      </text>
      <text x={x + 16} y={y + 70} fontSize="11" fill="var(--diagram-text-muted)">
        {boundary}
      </text>
      <text
        x={x + 100}
        y={y + 108}
        textAnchor="middle"
        fontSize="10"
        fill={accent ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)'}
        fontWeight={accent ? 600 : 400}
      >
        {tools}
      </text>
    </g>
  );
}
