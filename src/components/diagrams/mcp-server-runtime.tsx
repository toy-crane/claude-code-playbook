import { DiagramFrame } from './primitives';

export function McpServerRuntime() {
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
              id="msr-arrow-primary"
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
              id="msr-arrow-muted"
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

          {/* Group labels */}
          <text
            x="110"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            내 프로젝트 폴더
          </text>
          <text
            x="400"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            Claude Code 실행 시
          </text>
          <text
            x="690"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            외부 API
          </text>

          {/* Arrows (beneath nodes) */}
          {/* .mcp.json → Claude Code */}
          <path
            d="M 200 100 Q 270 100 328 155"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#msr-arrow-primary)"
          />
          {/* index.ts → Claude Code (spawned) */}
          <path
            d="M 200 240 Q 270 240 328 188"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#msr-arrow-primary)"
          />
          {/* Claude Code / Server → Open-Meteo */}
          <path
            d="M 500 170 L 608 170"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#msr-arrow-muted)"
          />

          {/* Labels on arrows */}
          <text
            x="265"
            y="85"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-primary)"
          >
            등록 정보 읽기
          </text>
          <text
            x="265"
            y="258"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-primary)"
          >
            서브프로세스로 실행
          </text>
          <text
            x="554"
            y="162"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            HTTPS
          </text>

          {/* .mcp.json file box (top-left) */}
          <rect
            x="40"
            y="70"
            width="160"
            height="60"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="120"
            y="92"
            textAnchor="middle"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fill="var(--diagram-text)"
          >
            .mcp.json
          </text>
          <text
            x="120"
            y="112"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            서버 등록 정보
          </text>

          {/* index.ts file box (bottom-left) */}
          <rect
            x="40"
            y="210"
            width="160"
            height="60"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="120"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fill="var(--diagram-text)"
          >
            src/index.ts
          </text>
          <text
            x="120"
            y="252"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            MCP 서버 소스
          </text>

          {/* Claude Code + Spawned Server (middle) */}
          <rect
            x="330"
            y="90"
            width="170"
            height="170"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
          />
          <text
            x="415"
            y="115"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Claude Code
          </text>
          {/* inner box: server subprocess */}
          <rect
            x="350"
            y="135"
            width="130"
            height="80"
            rx="6"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
          />
          <text
            x="415"
            y="160"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            weather MCP
          </text>
          <text
            x="415"
            y="177"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            bun run index.ts
          </text>
          <text
            x="415"
            y="194"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            (stdio 통신)
          </text>
          <text
            x="415"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            같은 프로세스 트리
          </text>

          {/* Open-Meteo (right) */}
          <rect
            x="610"
            y="130"
            width="160"
            height="80"
            rx="8"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="690"
            y="160"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            Open-Meteo
          </text>
          <text
            x="690"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            날씨 API
          </text>
          <text
            x="690"
            y="196"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            API 키 불필요
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Claude Code 가 시작될 때{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          내 로컬 파일
        </span>
        을 서브프로세스로 띄워 외부 API 에 닿습니다
      </figcaption>
    </DiagramFrame>
  );
}
