import { DiagramFrame } from './primitives';

export function SessionLifecycle() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 240"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="sl-arrow-primary"
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
              id="sl-arrow-muted"
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

          {/* /clear loopback arch — from "대화 진행" top back to "빈 Context" top */}
          <text
            x="370"
            y="32"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
          >
            /clear — Context 만 비움 · 같은 세션 유지
          </text>
          <path
            d="M 510 100 C 510 50, 230 50, 230 100"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            markerEnd="url(#sl-arrow-muted)"
          />

          {/* claude pill (start trigger) */}
          <rect
            x="20"
            y="115"
            width="80"
            height="40"
            rx="20"
            fill="var(--diagram-warning-soft)"
            stroke="var(--diagram-warning)"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="140"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            claude
          </text>

          {/* claude → 빈 Context */}
          <line
            x1="105"
            y1="135"
            x2="128"
            y2="135"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#sl-arrow-primary)"
          />

          {/* 빈 Context state */}
          <StateCard
            x={130}
            y={100}
            label="Session 시작"
            sub="Context 비어 있음"
          />

          {/* arrow: 빈 Context → 대화 진행 */}
          <line
            x1="335"
            y1="135"
            x2="388"
            y2="135"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#sl-arrow-primary)"
          />
          <text
            x="361"
            y="125"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            대화 시작
          </text>

          {/* 대화 진행 state (accent) */}
          <StateCard
            x={390}
            y={100}
            label="대화 진행"
            sub="Context 누적"
            accent
          />

          {/* arrow: 대화 진행 → 종료 */}
          <line
            x1="595"
            y1="135"
            x2="648"
            y2="135"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#sl-arrow-primary)"
          />
          <text
            x="621"
            y="125"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            /exit
          </text>

          {/* 종료 pill */}
          <rect
            x="650"
            y="115"
            width="130"
            height="40"
            rx="20"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="715"
            y="140"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text-muted)"
          >
            세션 종료
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Context 가 차오르면{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          /clear 로 비우거나 /exit 로 종료
        </span>{' '}
        — 두 갈래만 기억하면 됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function StateCard({
  x,
  y,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="205"
        height="70"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 102}
        y={y + 30}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={titleColor}
      >
        {label}
      </text>
      <text
        x={x + 102}
        y={y + 52}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {sub}
      </text>
    </g>
  );
}
