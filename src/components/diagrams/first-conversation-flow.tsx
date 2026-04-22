import { DiagramFrame } from './primitives';

export function FirstConversationFlow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 390"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="fcf-arrow"
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

          {/* Timeline vertical line — split around the zone divider */}
          <line
            x1="170"
            y1="50"
            x2="170"
            y2="190"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />
          <line
            x1="170"
            y1="220"
            x2="170"
            y2="360"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />

          {/* Zone divider — dashed yellow line */}
          <line
            x1="20"
            y1="205"
            x2="780"
            y2="205"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* Zone labels (left) */}
          <text
            x="30"
            y="95"
            fontSize="14"
            fontWeight="700"
            fill="var(--diagram-text)"
          >
            읽기
          </text>
          <text x="30" y="113" fontSize="11" fill="var(--diagram-text-muted)">
            승인 불필요
          </text>

          <text
            x="30"
            y="270"
            fontSize="14"
            fontWeight="700"
            fill="var(--diagram-text)"
          >
            쓰기
          </text>
          <text
            x="30"
            y="288"
            fontSize="11"
            fontWeight="600"
            fill="var(--diagram-yellow)"
          >
            승인 필요
          </text>

          <StepRow n={1} y={60} prompt={'"프로젝트 설명해줘"'} tool="Read" />
          <StepRow
            n={2}
            y={130}
            prompt={'"@app/page.tsx 설명해줘"'}
            tool="Read"
          />
          <StepRow n={3} y={240} prompt={'"README 수정해줘"'} tool="Edit" />
          <StepRow n={4} y={310} prompt={'"커밋해줘"'} tool="Bash" />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        읽기는 자유롭게,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-yellow)' }}
        >
          쓰기·셸 실행은 승인 후
        </span>{' '}
        진행됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function StepRow({
  n,
  y,
  prompt,
  tool,
}: {
  n: number;
  y: number;
  prompt: string;
  tool: string;
}) {
  return (
    <g>
      {/* Dot on timeline */}
      <circle
        cx="170"
        cy={y + 18}
        r="6"
        fill="var(--diagram-bg-panel)"
        stroke="var(--diagram-border-strong)"
        strokeWidth="2"
      />

      {/* Step label */}
      <text
        x="195"
        y={y + 4}
        fontSize="11"
        fontWeight="600"
        fill="var(--diagram-text-muted)"
      >
        Step {n}
      </text>

      {/* Prompt card */}
      <rect
        x="195"
        y={y + 12}
        width="330"
        height="40"
        rx="8"
        fill="var(--diagram-bg-card)"
        stroke="var(--diagram-border-strong)"
        strokeWidth="1.25"
      />
      <text
        x="360"
        y={y + 37}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-text)"
      >
        {prompt}
      </text>

      {/* Arrow → tool */}
      <line
        x1="535"
        y1={y + 32}
        x2="588"
        y2={y + 32}
        stroke="var(--diagram-text-muted)"
        strokeWidth="1.25"
        markerEnd="url(#fcf-arrow)"
      />

      {/* Tool name */}
      <text
        x="600"
        y={y + 37}
        fontSize="13"
        fontWeight="600"
        fill="var(--diagram-text)"
      >
        {tool} tool
      </text>
    </g>
  );
}
