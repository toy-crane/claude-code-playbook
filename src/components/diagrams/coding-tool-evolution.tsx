import { DiagramFrame } from './primitives';

export function CodingToolEvolution() {
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
              id="cte-arrow-muted"
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

          {/* Axes (dashed, muted) */}
          <line
            x1="70"
            y1="40"
            x2="70"
            y2="370"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="70"
            y1="370"
            x2="780"
            y2="370"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Axis labels */}
          <text
            x="75"
            y="30"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            맥락 범위 ↑
          </text>
          <text
            x="775"
            y="390"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            자율성 →
          </text>

          {/* Arrows between cards (drawn first so they sit beneath the cards) */}
          {/* Stage 1 → Stage 2 */}
          <path
            d="M 300 270 L 320 210"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cte-arrow-muted)"
          />
          {/* Stage 2 → Stage 3 */}
          <path
            d="M 530 170 L 550 110"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cte-arrow-muted)"
          />

          {/* Stage cards (bottom-left → top-right staircase) */}
          <StageCard
            x={100}
            y={270}
            title="1. 자동완성"
            context="맥락 · 현재 파일의 한 줄"
            action="행동 · 다음 단어 제안"
            tools="GitHub Copilot · Tabnine"
          />
          <StageCard
            x={320}
            y={170}
            title="2. 대화형 편집"
            context="맥락 · 프로젝트의 여러 파일"
            action="행동 · 요청 → 코드 편집"
            tools="Cursor · Windsurf · Copilot Chat"
          />
          <StageCard
            x={540}
            y={70}
            title="3. Agentic"
            context="맥락 · 프로젝트 + 실행 환경"
            action="행동 · 방향 → 탐색·수정·실행 루프"
            tools="Claude Code · Codex · Gemini CLI"
            accent
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        단계를 거듭할수록{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-pink)' }}>
          맥락이 넓어지고 자율성이 커집니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function StageCard({
  x,
  y,
  title,
  context,
  action,
  tools,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  context: string;
  action: string;
  tools: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-pink-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent ? 'var(--diagram-pink)' : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-pink)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="210"
        height="90"
        rx="10"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 16}
        y={y + 24}
        fontSize="14"
        fontWeight="600"
        fill={titleColor}
      >
        {title}
      </text>
      <text
        x={x + 16}
        y={y + 50}
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {context}
      </text>
      <text
        x={x + 16}
        y={y + 70}
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {action}
      </text>
      {/* Tool footer below card */}
      <text
        x={x + 105}
        y={y + 108}
        textAnchor="middle"
        fontSize="10"
        fill={accent ? 'var(--diagram-pink)' : 'var(--diagram-text-muted)'}
        fontWeight={accent ? 600 : 400}
      >
        {tools}
      </text>
    </g>
  );
}
