import { DiagramFrame } from './primitives';

export function KnowledgeCutoffTimeline() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <linearGradient id="kc-known-bg" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0"
                stopColor="var(--diagram-success-soft)"
                stopOpacity="0.25"
              />
              <stop
                offset="1"
                stopColor="var(--diagram-success-soft)"
                stopOpacity="0.9"
              />
            </linearGradient>
            <linearGradient id="kc-unknown-bg" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0"
                stopColor="var(--diagram-danger-soft)"
                stopOpacity="0.25"
              />
              <stop
                offset="1"
                stopColor="var(--diagram-danger-soft)"
                stopOpacity="0.9"
              />
            </linearGradient>
          </defs>

          {/* Background regions */}
          <rect
            x="20"
            y="60"
            width="380"
            height="200"
            rx="6"
            fill="url(#kc-known-bg)"
          />
          <rect
            x="400"
            y="60"
            width="380"
            height="200"
            rx="6"
            fill="url(#kc-unknown-bg)"
          />

          {/* Region labels */}
          <text
            x="210"
            y="95"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="var(--diagram-success)"
          >
            AI 가 아는 영역
          </text>
          <text
            x="590"
            y="95"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="var(--diagram-danger)"
          >
            AI 가 모르는 영역
          </text>

          {/* Event cards */}
          <rect
            x="85"
            y="135"
            width="250"
            height="50"
            rx="10"
            fill="var(--diagram-success-soft)"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
          />
          <text
            x="210"
            y="165"
            textAnchor="middle"
            fontSize="14"
            fill="var(--diagram-success)"
            fontWeight="500"
          >
            React 18 출시
          </text>

          <rect
            x="465"
            y="135"
            width="250"
            height="50"
            rx="10"
            fill="var(--diagram-danger-soft)"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
          />
          <text
            x="590"
            y="165"
            textAnchor="middle"
            fontSize="14"
            fill="var(--diagram-danger)"
            fontWeight="500"
          >
            새 라이브러리 v2 출시
          </text>

          {/* Timeline line */}
          <line
            x1="20"
            y1="260"
            x2="780"
            y2="260"
            stroke="var(--diagram-danger)"
            strokeWidth="2"
          />

          {/* Dots + year labels */}
          <TimelineDot cx={80} label="2023" />
          <TimelineDot cx={240} label="2024" />
          <TimelineDot cx={400} label="2025 초" cutoff />
          <TimelineDot cx={590} label="2025" />
          <TimelineDot cx={750} label="2026" />

          {/* Knowledge Cutoff vertical dashed line */}
          <line
            x1="400"
            y1="40"
            x2="400"
            y2="272"
            stroke="var(--diagram-danger)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x="400"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            Knowledge Cutoff
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Cutoff 이후의 질문 →{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-danger)' }}>
          AI 가 모르지만 그럴듯하게 답변
        </span>{' '}
        (Hallucination 발생)
      </figcaption>
    </DiagramFrame>
  );
}

function TimelineDot({
  cx,
  label,
  cutoff,
}: {
  cx: number;
  label: string;
  cutoff?: boolean;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={260}
        r={cutoff ? 7 : 6}
        fill={cutoff ? 'var(--diagram-danger-soft)' : 'var(--diagram-bg-card)'}
        stroke="var(--diagram-danger)"
        strokeWidth={cutoff ? 2.5 : 2}
      />
      <text
        x={cx}
        y={290}
        textAnchor="middle"
        fontSize="12"
        fill={cutoff ? 'var(--diagram-danger)' : 'var(--diagram-text-muted)'}
        fontWeight={cutoff ? 600 : 400}
      >
        {label}
      </text>
    </g>
  );
}
