import { DiagramFrame } from './primitives';

export function ModelSelectionGuide() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 250"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="msg-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-border-strong)" />
            </marker>
          </defs>

          <ModelCard
            x={40}
            y={40}
            name="Haiku"
            use="단순 수정 · 빠른 질문"
          />
          <ModelCard
            x={300}
            y={40}
            name="Sonnet"
            use="일반 개발 작업"
            accent
            badge="기본 추천"
          />
          <ModelCard
            x={560}
            y={40}
            name="Opus"
            use="아키텍처 · 깊은 추론"
          />

          <line
            x1="60"
            y1="190"
            x2="740"
            y2="190"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
            markerStart="url(#msg-arrow)"
            markerEnd="url(#msg-arrow)"
          />

          <text
            x="60"
            y="215"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            빠르고 저렴
          </text>
          <text
            x="740"
            y="215"
            textAnchor="end"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            깊고 강력
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        작업 난이도에 맞춰 모델을 바꾸면{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          비용과 품질을 함께 조절
        </span>
        할 수 있습니다
      </figcaption>
    </DiagramFrame>
  );
}

function ModelCard({
  x,
  y,
  name,
  use,
  accent,
  badge,
}: {
  x: number;
  y: number;
  name: string;
  use: string;
  accent?: boolean;
  badge?: string;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border-strong)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="110"
        rx="12"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      {badge && (
        <g>
          <rect
            x={x + 65}
            y={y - 13}
            width="70"
            height="22"
            rx="11"
            fill="var(--diagram-primary)"
          />
          <text
            x={x + 100}
            y={y + 2}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#ffffff"
          >
            {badge}
          </text>
        </g>
      )}
      <text
        x={x + 100}
        y={y + 50}
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={titleColor}
      >
        {name}
      </text>
      <line
        x1={x + 50}
        y1={y + 70}
        x2={x + 150}
        y2={y + 70}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      <text
        x={x + 100}
        y={y + 92}
        textAnchor="middle"
        fontSize="12"
        fill="var(--diagram-text-muted)"
      >
        {use}
      </text>
    </g>
  );
}
