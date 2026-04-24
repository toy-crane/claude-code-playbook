import { DiagramFrame } from './primitives';

export function SubagentVsTeams() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 380"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="svt-arrow-primary"
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
              id="svt-arrow-muted"
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

          {/* Center divider */}
          <line
            x1="400"
            y1="20"
            x2="400"
            y2="360"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Side labels */}
          <text
            x="200"
            y="40"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--diagram-text)"
          >
            Subagent
          </text>
          <text
            x="200"
            y="58"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            상위-하위 · 위임
          </text>
          <text
            x="600"
            y="40"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--diagram-primary)"
          >
            Agent Teams
          </text>
          <text
            x="600"
            y="58"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            동료 · 협업
          </text>

          {/* === LEFT: Subagent === */}
          {/* Arrows: delegate down */}
          <path
            d="M 200 120 L 120 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#svt-arrow-primary)"
          />
          <path
            d="M 200 120 L 280 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#svt-arrow-primary)"
          />
          {/* Return results up (dashed muted) */}
          <path
            d="M 110 230 L 190 140"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#svt-arrow-muted)"
          />
          <path
            d="M 290 230 L 210 140"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#svt-arrow-muted)"
          />
          {/* Labels */}
          <text
            x="145"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            위임
          </text>
          <text
            x="255"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            위임
          </text>

          {/* X between subagents */}
          <line
            x1="160"
            y1="250"
            x2="240"
            y2="250"
            stroke="var(--diagram-danger)"
            strokeWidth="1.25"
            strokeDasharray="5 4"
          />
          <g stroke="var(--diagram-danger)" strokeWidth="2" strokeLinecap="round">
            <line x1="194" y1="242" x2="206" y2="258" />
            <line x1="206" y1="242" x2="194" y2="258" />
          </g>
          <text
            x="200"
            y="278"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-danger)"
          >
            통신 불가
          </text>

          {/* Main Agent */}
          <rect
            x="140"
            y="78"
            width="120"
            height="44"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="105"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Main Agent
          </text>

          {/* Subagent A */}
          <rect
            x="60"
            y="185"
            width="100"
            height="50"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="110"
            y="215"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            Subagent A
          </text>

          {/* Subagent B */}
          <rect
            x="240"
            y="185"
            width="100"
            height="50"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="290"
            y="215"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            Subagent B
          </text>

          {/* Left summary list */}
          <g transform="translate(50, 305)">
            <text fontSize="10" fill="var(--diagram-text-muted)">
              · 단방향 · 작업 끝나면 종료
            </text>
            <text y="16" fontSize="10" fill="var(--diagram-text-muted)">
              · Task 공유 없음 · 비용 낮음
            </text>
          </g>

          {/* === RIGHT: Agent Teams === */}
          {/* Arrows: Team Lead ↔ Teammates (primary solid) */}
          <path
            d="M 600 120 L 520 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#svt-arrow-primary)"
          />
          <path
            d="M 600 120 L 680 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#svt-arrow-primary)"
          />
          {/* Return to Lead */}
          <path
            d="M 510 230 L 590 140"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#svt-arrow-muted)"
          />
          <path
            d="M 690 230 L 610 140"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#svt-arrow-muted)"
          />
          {/* Peer-to-peer bidirectional */}
          <path
            d="M 560 250 L 640 250"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerStart="url(#svt-arrow-primary)"
            markerEnd="url(#svt-arrow-primary)"
          />
          <text
            x="600"
            y="278"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            팀원 간 직접 메시지
          </text>

          {/* Team Lead */}
          <rect
            x="540"
            y="78"
            width="120"
            height="44"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="600"
            y="105"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Team Lead
          </text>

          {/* Teammate A */}
          <rect
            x="460"
            y="185"
            width="100"
            height="50"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="510"
            y="215"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            Teammate A
          </text>

          {/* Teammate B */}
          <rect
            x="640"
            y="185"
            width="100"
            height="50"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="690"
            y="215"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            Teammate B
          </text>

          {/* Right summary list */}
          <g transform="translate(450, 305)">
            <text fontSize="10" fill="var(--diagram-text-muted)">
              · 양방향 · 세션 동안 지속
            </text>
            <text y="16" fontSize="10" fill="var(--diagram-text-muted)">
              · Task 공유 · 비용 높음
            </text>
          </g>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Subagent 는 결과만 반환하고 종료, Agent Teams 는{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          팀원끼리 직접 메시지
        </span>
        를 주고받으며 세션 동안 지속합니다
      </figcaption>
    </DiagramFrame>
  );
}
