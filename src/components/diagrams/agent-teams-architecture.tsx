import { DiagramFrame } from './primitives';

export function AgentTeamsArchitecture() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 400"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ata-arrow-primary"
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
              id="ata-arrow-warning"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-warning)" />
            </marker>
          </defs>

          {/* Team Lead → Shared Task */}
          <path
            d="M 400 90 L 400 138"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#ata-arrow-primary)"
          />
          <text
            x="412"
            y="118"
            fontSize="11"
            fill="var(--diagram-primary)"
          >
            Task 생성 / 할당
          </text>

          {/* Shared Task → Teammates (dashed warning) */}
          <path
            d="M 330 210 Q 250 230 160 267"
            stroke="var(--diagram-warning)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#ata-arrow-warning)"
          />
          <path
            d="M 400 220 L 400 267"
            stroke="var(--diagram-warning)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#ata-arrow-warning)"
          />
          <path
            d="M 470 210 Q 550 230 640 267"
            stroke="var(--diagram-warning)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#ata-arrow-warning)"
          />

          {/* Peer-to-peer messages between teammates (bidirectional, between boxes) */}
          <path
            d="M 210 300 L 325 300"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerStart="url(#ata-arrow-primary)"
            markerEnd="url(#ata-arrow-primary)"
          />
          <path
            d="M 475 300 L 590 300"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerStart="url(#ata-arrow-primary)"
            markerEnd="url(#ata-arrow-primary)"
          />
          <text
            x="267"
            y="293"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            메시지
          </text>
          <text
            x="533"
            y="293"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            메시지
          </text>

          {/* Team Lead */}
          <rect
            x="300"
            y="30"
            width="200"
            height="60"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Team Lead
          </text>
          <text
            x="400"
            y="75"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            조율 전담 (메인 세션)
          </text>

          {/* Shared Task List */}
          <rect
            x="260"
            y="140"
            width="280"
            height="80"
            rx="8"
            fill="var(--diagram-warning-soft)"
            stroke="var(--diagram-warning)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="168"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            공유 Task 리스트
          </text>
          <text
            x="400"
            y="188"
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="var(--diagram-text-muted)"
          >
            ~/.claude/tasks/{'{team-name}'}/
          </text>
          <text
            x="400"
            y="207"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            모든 팀원이 동일 디렉토리 공유
          </text>

          {/* Teammate A */}
          <Teammate x={60} y={270} label="DB Agent" />
          {/* Teammate B */}
          <Teammate x={330} y={270} label="Backend Agent" />
          {/* Teammate C */}
          <Teammate x={600} y={270} label="Frontend Agent" />

          {/* Legend */}
          <g transform="translate(40, 370)">
            <line
              x1="0"
              y1="0"
              x2="24"
              y2="0"
              stroke="var(--diagram-primary)"
              strokeWidth="1.5"
            />
            <text x="30" y="4" fontSize="10" fill="var(--diagram-text-muted)">
              peer-to-peer 메시지 (양방향)
            </text>
            <line
              x1="220"
              y1="0"
              x2="244"
              y2="0"
              stroke="var(--diagram-warning)"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <text x="250" y="4" fontSize="10" fill="var(--diagram-text-muted)">
              Task 연결 (공유 리스트)
            </text>
          </g>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        각 팀원이 독립 Context 에서 돌면서, 공유 Task 와{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          팀원 간 직접 메시지
        </span>
        로 조율합니다
      </figcaption>
    </DiagramFrame>
  );
}

function Teammate({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="140"
        height="60"
        rx="8"
        fill="var(--diagram-bg-card)"
        stroke="var(--diagram-border-strong)"
        strokeWidth="1.25"
      />
      <text
        x={x + 70}
        y={y + 28}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--diagram-text)"
      >
        {label}
      </text>
      <text
        x={x + 70}
        y={y + 46}
        textAnchor="middle"
        fontSize="10"
        fill="var(--diagram-text-muted)"
      >
        Teammate · 독립 Context
      </text>
    </g>
  );
}
