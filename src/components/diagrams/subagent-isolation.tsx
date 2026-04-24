import { DiagramFrame } from './primitives';

export function SubagentIsolation() {
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
              id="si-arrow-primary"
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
              id="si-arrow-success"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-success)" />
            </marker>
          </defs>

          {/* delegate arrow (left → right) */}
          <path
            d="M 350 130 L 442 130"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#si-arrow-primary)"
          />
          <text
            x="396"
            y="120"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            위임
          </text>

          {/* return conclusion (right → left) */}
          <path
            d="M 450 230 L 358 230"
            stroke="var(--diagram-success)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#si-arrow-success)"
          />
          <text
            x="396"
            y="220"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            결론만 반환
          </text>

          {/* === Left: Main Context (clean) === */}
          <rect
            x="40"
            y="40"
            width="310"
            height="280"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="195"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            메인 컨텍스트
          </text>
          <text
            x="195"
            y="78"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            깨끗하게 유지
          </text>

          {/* user request */}
          <rect
            x="65"
            y="105"
            width="260"
            height="40"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="195"
            y="130"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            &quot;인증 코드 정리해줘&quot;
          </text>

          {/* conclusion (returned) */}
          <rect
            x="65"
            y="205"
            width="260"
            height="70"
            rx="6"
            fill="var(--diagram-success-soft)"
            stroke="var(--diagram-success)"
            strokeWidth="1.25"
          />
          <text
            x="195"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            결론 요약
          </text>
          <text
            x="195"
            y="246"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text)"
          >
            auth.ts:142 (JWT)
          </text>
          <text
            x="195"
            y="262"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text)"
          >
            갱신 로직 설명
          </text>

          {/* === Right: Subagent Context === */}
          <rect
            x="450"
            y="40"
            width="310"
            height="280"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <text
            x="605"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontWeight="600"
          >
            Subagent 컨텍스트
          </text>
          <text
            x="605"
            y="78"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            작업 후 폐기
          </text>

          {/* file cards inside subagent */}
          <SubFileCard x={470} y={100} label="auth.ts" />
          <SubFileCard x={555} y={100} label="token.ts" />
          <SubFileCard x={645} y={100} label="login.tsx" />

          <SubFileCard x={470} y={140} label="session.ts" />
          <SubFileCard x={555} y={140} label="middleware" />
          <SubFileCard x={645} y={140} label="user.ts" />

          <SubFileCard x={470} y={180} label="api.ts" />
          <SubFileCard x={555} y={180} label="hooks.ts" />
          <SubFileCard x={645} y={180} label="config.ts" />

          <SubFileCard x={470} y={220} label="..." muted />
          <SubFileCard x={555} y={220} label="..." muted />
          <SubFileCard x={645} y={220} label="..." muted />

          <text
            x="605"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            탐색 코드 누적 (수천 줄)
          </text>
          <text
            x="605"
            y="297"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            메인에는 영향 없음
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Subagent 가 별도 컨텍스트에서 탐색하고,{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-success)' }}>
          메인에는 결론 텍스트만
        </span>{' '}
        남깁니다
      </figcaption>
    </DiagramFrame>
  );
}

function SubFileCard({
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
        height="28"
        rx="4"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
      <text
        x={x + 40}
        y={y + 18}
        textAnchor="middle"
        fontSize="10"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}
