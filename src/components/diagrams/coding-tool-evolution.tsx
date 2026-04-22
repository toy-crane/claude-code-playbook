import { DiagramFrame } from './primitives';

export function CodingToolEvolution() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 420"
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
            x1="40"
            y1="30"
            x2="40"
            y2="390"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="390"
            x2="780"
            y2="390"
            stroke="var(--diagram-border-strong)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Axis labels */}
          <text
            x="45"
            y="20"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            맥락 범위 ↑
          </text>
          <text
            x="775"
            y="410"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            자율성 →
          </text>

          {/* Arrows between cards (edge-middle → edge-middle, drawn beneath cards) */}
          {/* Stage 1 right-mid → Stage 2 left-mid */}
          <path
            d="M 250 305 L 300 205"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cte-arrow-muted)"
          />
          {/* Stage 2 right-mid → Stage 3 left-mid */}
          <path
            d="M 500 205 L 550 105"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cte-arrow-muted)"
          />

          {/* Stage cards (bottom-left → top-right staircase) */}
          <StageCard
            x={50}
            y={260}
            title="1. 자동완성"
            context="맥락 · 현재 파일의 한 줄"
            action="행동 · 다음 단어 제안"
            tools="GitHub Copilot · Tabnine"
          />
          <StageCard
            x={300}
            y={160}
            title="2. 대화형 편집"
            context="맥락 · 프로젝트의 여러 파일"
            action="행동 · 요청 → 코드 편집"
            tools="Cursor · Windsurf · Copilot Chat"
          />
          <StageCard
            x={550}
            y={60}
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
        width="200"
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
        x={x + 100}
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
