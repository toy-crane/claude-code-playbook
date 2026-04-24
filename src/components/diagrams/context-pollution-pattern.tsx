import { DiagramFrame } from './primitives';

export function ContextPollutionPattern() {
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
              id="cpp-arrow"
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

          {/* connection arrows (drawn before nodes so they sit beneath) */}
          <path
            d="M 130 150 L 168 150"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cpp-arrow)"
          />
          <path
            d="M 632 150 L 670 150"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cpp-arrow)"
          />

          {/* user request actor */}
          <rect
            x="20"
            y="130"
            width="110"
            height="40"
            rx="20"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="75"
            y="148"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            사용자 요청
          </text>
          <text
            x="75"
            y="164"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            (한 줄)
          </text>

          {/* main context — bloated container */}
          <rect
            x="170"
            y="30"
            width="460"
            height="240"
            rx="10"
            fill="var(--diagram-danger-soft)"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="52"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            메인 컨텍스트
          </text>
          <text
            x="400"
            y="68"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            탐색 과정의 코드가 누적
          </text>

          {/* file cards — row 1 */}
          <FileCard x={193} y={88} label="auth.ts" />
          <FileCard x={283} y={88} label="token.ts" />
          <FileCard x={373} y={88} label="login.tsx" />
          <FileCard x={463} y={88} label="session.ts" />
          <FileCard x={553} y={88} label="middleware" />

          {/* file cards — row 2 */}
          <FileCard x={193} y={138} label="user.ts" />
          <FileCard x={283} y={138} label="api.ts" />
          <FileCard x={373} y={138} label="hooks.ts" />
          <FileCard x={463} y={138} label="config.ts" />
          <FileCard x={553} y={138} label="route.ts" />

          {/* file cards — row 3 (muted) */}
          <FileCard x={193} y={188} label="..." muted />
          <FileCard x={283} y={188} label="..." muted />
          <FileCard x={373} y={188} label="..." muted />
          <FileCard x={463} y={188} label="..." muted />
          <FileCard x={553} y={188} label="..." muted />

          <text
            x="400"
            y="248"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            수천 줄 누적
          </text>

          {/* conclusion actor */}
          <rect
            x="672"
            y="130"
            width="110"
            height="40"
            rx="20"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="727"
            y="148"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            결론 요약
          </text>
          <text
            x="727"
            y="164"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            (한 문단)
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        입력은 짧고 결론도 짧지만,{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-danger)' }}>
          중간 탐색 과정이 메인 컨텍스트를 부풀립니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function FileCard({
  x,
  y,
  label,
  muted,
}: {
  x: number;
  y: number;
  label: string;
  muted?: boolean;
}) {
  const fill = muted ? 'var(--diagram-bg-panel)' : 'var(--diagram-bg-card)';
  const stroke = muted ? 'var(--diagram-border)' : 'var(--diagram-border-strong)';
  const color = muted ? 'var(--diagram-text-muted)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="80"
        height="32"
        rx="4"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
      <text
        x={x + 40}
        y={y + 21}
        textAnchor="middle"
        fontSize="11"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}
