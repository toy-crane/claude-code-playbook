import { DiagramFrame } from './primitives';

export function ToolUseFlow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 300"
          className="w-full min-w-[560px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="tuf-arrow-primary"
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
              id="tuf-arrow-muted"
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

          {/* Tool group label */}
          <text
            x="400"
            y="22"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            Tool (외부 시스템)
          </text>

          {/* Connections (drawn before nodes so arrows sit beneath) */}
          {/* 질문 → LLM 판단 */}
          <path
            d="M 110 160 L 148 160"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#tuf-arrow-primary)"
          />
          {/* LLM → Read (dashed, not selected) */}
          <path
            d="M 290 160 Q 315 160 338 70"
            stroke="var(--diagram-text-muted)"
            strokeDasharray="4 3"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tuf-arrow-muted)"
          />
          {/* LLM → WebSearch (selected) */}
          <path
            d="M 290 160 Q 315 160 338 130"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#tuf-arrow-primary)"
          />
          {/* LLM → Bash (dashed) */}
          <path
            d="M 290 160 Q 315 160 338 190"
            stroke="var(--diagram-text-muted)"
            strokeDasharray="4 3"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tuf-arrow-muted)"
          />
          {/* LLM → Edit (dashed) */}
          <path
            d="M 290 160 Q 315 160 338 250"
            stroke="var(--diagram-text-muted)"
            strokeDasharray="4 3"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tuf-arrow-muted)"
          />
          {/* WebSearch → LLM 답변 생성 */}
          <path
            d="M 460 130 Q 485 130 508 160"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#tuf-arrow-primary)"
          />
          {/* LLM 답변 → 사용자 답변 */}
          <path
            d="M 650 160 L 688 160"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#tuf-arrow-primary)"
          />

          {/* Labels on paths */}
          <text
            x="315"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-primary)"
          >
            질문에 따라 선택
          </text>
          <text
            x="485"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-primary)"
          >
            결과 반환
          </text>

          {/* 사용자 질문 — actor (pill) */}
          <rect
            x="10"
            y="140"
            width="100"
            height="40"
            rx="20"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="60"
            y="165"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            사용자 질문
          </text>

          {/* LLM 판단 */}
          <rect
            x="150"
            y="130"
            width="140"
            height="60"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="220"
            y="155"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            LLM 판단
          </text>
          <text
            x="220"
            y="175"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            어떤 Tool 을 쓸까?
          </text>

          {/* Tool chips */}
          <ToolChip y={50} label="Read" />
          <ToolChip y={110} label="WebSearch" selected />
          <ToolChip y={170} label="Bash" />
          <ToolChip y={230} label="Edit" />

          {/* LLM 답변 생성 */}
          <rect
            x="510"
            y="130"
            width="140"
            height="60"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="580"
            y="155"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            LLM 답변 생성
          </text>
          <text
            x="580"
            y="175"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            결과 + 질문
          </text>

          {/* 사용자 답변 — actor */}
          <rect
            x="690"
            y="140"
            width="100"
            height="40"
            rx="20"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="740"
            y="165"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            사용자 답변
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        LLM 은 여러 Tool 중{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          하나를 골라 호출
        </span>
        하고, 결과를 Context 에 넣어 답변을 만듭니다
      </figcaption>
    </DiagramFrame>
  );
}

function ToolChip({
  y,
  label,
  selected,
}: {
  y: number;
  label: string;
  selected?: boolean;
}) {
  const fill = selected ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = selected ? 'var(--diagram-primary)' : 'var(--diagram-border)';
  const color = selected ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  return (
    <g>
      <rect
        x="340"
        y={y}
        width="120"
        height="40"
        rx="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={selected ? 1.5 : 1.25}
      />
      <text
        x="400"
        y={y + 25}
        textAnchor="middle"
        fontSize="13"
        fill={color}
        fontWeight={selected ? 600 : 400}
      >
        {label}
      </text>
    </g>
  );
}
