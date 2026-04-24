import { DiagramFrame } from './primitives';

export function McpArchitecture() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ma-arrow-primary"
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
              id="ma-arrow-muted"
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

          {/* Host container (Claude Code) */}
          <rect
            x="30"
            y="80"
            width="260"
            height="200"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x="160"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text-muted)"
          >
            MCP Host
          </text>
          <text
            x="160"
            y="112"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            Claude Code
          </text>

          {/* MCP Client (inside Host) */}
          <rect
            x="60"
            y="140"
            width="200"
            height="60"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="160"
            y="165"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            MCP Client
          </text>
          <text
            x="160"
            y="183"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            Tool 호출 담당
          </text>

          <text
            x="160"
            y="235"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            사용자가 쓰는
          </text>
          <text
            x="160"
            y="250"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            AI 코딩 앱
          </text>

          {/* MCP Server */}
          <rect
            x="350"
            y="130"
            width="180"
            height="80"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
          />
          <text
            x="440"
            y="158"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            MCP Server
          </text>
          <text
            x="440"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontFamily="ui-monospace, monospace"
          >
            claude-in-chrome
          </text>
          <text
            x="440"
            y="196"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            (Tool 여러 개 노출)
          </text>

          {/* External: Chrome */}
          <rect
            x="590"
            y="130"
            width="180"
            height="80"
            rx="8"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="680"
            y="158"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            Chrome
          </text>
          <text
            x="680"
            y="178"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            렌더링된 페이지
          </text>
          <text
            x="680"
            y="196"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            DOM · 콘솔 · 네트워크
          </text>

          {/* Client → Server */}
          <path
            d="M 260 170 L 348 170"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#ma-arrow-primary)"
          />
          <text
            x="304"
            y="162"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-primary)"
          >
            stdio · JSON
          </text>

          {/* Server → External */}
          <path
            d="M 530 170 L 588 170"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#ma-arrow-muted)"
          />
          <text
            x="559"
            y="162"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            CDP
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Host 가 Client 를 품고, Client 가{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          MCP Server
        </span>
        {' '}를 통해 외부 시스템에 닿습니다
      </figcaption>
    </DiagramFrame>
  );
}
