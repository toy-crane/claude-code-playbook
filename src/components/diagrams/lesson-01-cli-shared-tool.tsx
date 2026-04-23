import { DiagramFrame } from './primitives';

export function Lesson01CliSharedTool() {
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
              id="cst-arrow-primary"
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
              id="cst-arrow-muted"
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
            y="30"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            요청하는 쪽
          </text>
          <text
            x="410"
            y="30"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            공유 도구
          </text>
          <text
            x="720"
            y="30"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            외부 서비스
          </text>

          {/* Arrows (beneath nodes) */}
          {/* Developer → gh CLI */}
          <path
            d="M 180 107 Q 250 107 328 150"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cst-arrow-primary)"
          />
          {/* Claude → gh CLI */}
          <path
            d="M 180 237 Q 250 237 328 190"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cst-arrow-primary)"
          />
          {/* gh CLI → GitHub */}
          <path
            d="M 490 170 L 648 170"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cst-arrow-muted)"
          />

          {/* Command labels on arrows */}
          <text
            x="250"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, monospace"
          >
            gh issue list
          </text>
          <text
            x="250"
            y="257"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, monospace"
          >
            gh issue list
          </text>
          <text
            x="569"
            y="162"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            HTTPS
          </text>

          {/* Developer actor pill */}
          <rect
            x="40"
            y="85"
            width="140"
            height="44"
            rx="22"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="110"
            y="112"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            개발자
          </text>

          {/* Claude actor pill */}
          <rect
            x="40"
            y="215"
            width="140"
            height="44"
            rx="22"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="110"
            y="242"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            Claude
          </text>

          {/* gh CLI shared tool box (primary) */}
          <rect
            x="330"
            y="130"
            width="160"
            height="80"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
          />
          <text
            x="410"
            y="162"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, monospace"
          >
            gh CLI
          </text>
          <text
            x="410"
            y="188"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            설치된 도구 한 벌
          </text>

          {/* GitHub external */}
          <rect
            x="650"
            y="142"
            width="140"
            height="56"
            rx="8"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="720"
            y="168"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            GitHub
          </text>
          <text
            x="720"
            y="187"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            저장소 · 이슈 · PR
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        개발자와 Claude 가{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          같은 gh CLI
        </span>
        {' '}를 공유합니다 — 같은 명령, 같은 결과
      </figcaption>
    </DiagramFrame>
  );
}
