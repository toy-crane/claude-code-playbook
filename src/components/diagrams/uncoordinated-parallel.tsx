import { DiagramFrame } from './primitives';

export function UncoordinatedParallel() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="up-arrow-muted"
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

          {/* Subagent A → Merge */}
          <path
            d="M 220 180 L 360 240"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#up-arrow-muted)"
          />
          {/* Subagent B → Merge */}
          <path
            d="M 580 180 L 440 240"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#up-arrow-muted)"
          />

          {/* 통신 불가 line in the narrow gap between subagents */}
          <line
            x1="383"
            y1="125"
            x2="417"
            y2="125"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {/* X mark centered in the gap */}
          <g stroke="var(--diagram-danger)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="392" y1="113" x2="408" y2="137" />
            <line x1="408" y1="113" x2="392" y2="137" />
          </g>
          {/* 통신 불가 label above both boxes */}
          <text
            x="400"
            y="48"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-danger)"
          >
            통신 불가
          </text>

          {/* DB Subagent */}
          <rect
            x="60"
            y="70"
            width="320"
            height="110"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="220"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            DB Subagent
          </text>
          <rect
            x="150"
            y="125"
            width="140"
            height="34"
            rx="6"
            fill="var(--diagram-bg-panel)"
            stroke="var(--diagram-border)"
            strokeWidth="1"
          />
          <text
            x="220"
            y="146"
            textAnchor="middle"
            fontSize="12"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="var(--diagram-text-muted)"
          >
            id: UUID
          </text>

          {/* Backend Subagent */}
          <rect
            x="420"
            y="70"
            width="320"
            height="110"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="580"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            Backend Subagent
          </text>
          <rect
            x="500"
            y="125"
            width="160"
            height="34"
            rx="6"
            fill="var(--diagram-bg-panel)"
            stroke="var(--diagram-border)"
            strokeWidth="1"
          />
          <text
            x="580"
            y="146"
            textAnchor="middle"
            fontSize="12"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="var(--diagram-text-muted)"
          >
            user_id: integer
          </text>

          {/* Merge box */}
          <rect
            x="280"
            y="240"
            width="240"
            height="60"
            rx="8"
            fill="var(--diagram-danger-soft)"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="264"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-danger)"
          >
            Merge
          </text>
          <text
            x="400"
            y="284"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-danger)"
          >
            ⚠ 통합 시점에 충돌 발견
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        두 Subagent는 작업 도중에{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-danger)' }}>
          서로 대화할 채널
        </span>
        이 없어, 통합 시점에야 인터페이스 충돌을 발견합니다
      </figcaption>
    </DiagramFrame>
  );
}
