import { DiagramFrame } from './primitives';

export function RepetitivePrompts() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 340"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="rp-arrow-muted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-text-muted)" />
            </marker>
            <marker
              id="rp-arrow-primary"
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

          {/* Group labels */}
          <text
            x="140"
            y="24"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
            letterSpacing="1"
          >
            매번 반복되는 프롬프트
          </text>
          <text
            x="640"
            y="24"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
            letterSpacing="1"
          >
            파일 하나 + 슬래시 한 단어
          </text>

          {/* Left: 5 repetitive prompt cards */}
          <PromptCard y={50} />
          <PromptCard y={105} />
          <PromptCard y={160} />
          <PromptCard y={215} />
          <PromptCard y={270} />

          {/* Fan-in arrows: right edge of each prompt (x=250) → left edge of /commit card (x=540) */}
          <path
            d="M 252 68 Q 400 68 538 180"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#rp-arrow-muted)"
          />
          <path
            d="M 252 123 Q 400 123 538 182"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#rp-arrow-muted)"
          />
          <path
            d="M 252 178 L 538 184"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#rp-arrow-primary)"
          />
          <path
            d="M 252 233 Q 400 233 538 186"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#rp-arrow-muted)"
          />
          <path
            d="M 252 288 Q 400 288 538 188"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#rp-arrow-muted)"
          />

          {/* Right: /commit command card */}
          <rect
            x="540"
            y="145"
            width="200"
            height="80"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="2"
          />
          <text
            x="640"
            y="180"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            /commit
          </text>
          <text
            x="640"
            y="205"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            commit.md
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        자주 쓰는 프롬프트를 파일 하나에 저장하고{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          슬래시 한 단어
        </span>
        로 호출합니다
      </figcaption>
    </DiagramFrame>
  );
}

function PromptCard({ y }: { y: number }) {
  return (
    <g>
      <rect
        x="30"
        y={y}
        width="220"
        height="36"
        rx="6"
        fill="var(--diagram-bg-card)"
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      <text
        x="46"
        y={y + 16}
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        이 PR 을 리뷰해줘. 보안·성능·타입…
      </text>
      <line
        x1="46"
        y1={y + 24}
        x2="234"
        y2={y + 24}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      <line
        x1="46"
        y1={y + 30}
        x2="180"
        y2={y + 30}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
    </g>
  );
}
