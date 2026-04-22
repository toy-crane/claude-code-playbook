import { DiagramFrame } from './primitives';

export function AgentLoop() {
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
              id="agl-arrow-primary"
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
              id="agl-arrow-danger"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-danger)" />
            </marker>
          </defs>

          {/* Loop-back label — above the arch */}
          <text
            x="265"
            y="42"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            에러가 있으면 반복
          </text>

          {/* Loop-back arch from 확인 top → 시도 top (dashed danger) */}
          <path
            d="M 425 160 C 425 58, 105 58, 105 160"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            markerEnd="url(#agl-arrow-danger)"
          />

          {/* 3 step boxes — AI-autonomous zone */}
          <StepBox x={50} label="시도" sub="코드 작성" />
          <StepBox x={210} label="실행" sub="돌려본다" />
          <StepBox x={370} label="확인" sub="에러 읽기" />

          {/* Inter-step arrows */}
          <line
            x1="160"
            y1="185"
            x2="208"
            y2="185"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#agl-arrow-primary)"
          />
          <line
            x1="320"
            y1="185"
            x2="368"
            y2="185"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#agl-arrow-primary)"
          />

          {/* Zone label under AI area */}
          <text
            x="240"
            y="245"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            AI 가 자력으로 판정 — 에이전트 루프
          </text>

          {/* Exit arrow (에러 없음) from 확인 → 원하는 동작인가 */}
          <line
            x1="480"
            y1="185"
            x2="578"
            y2="185"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#agl-arrow-primary)"
          />
          <text
            x="529"
            y="176"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            에러 없음
          </text>

          {/* 원하는 동작인가? — 사람 판정 box */}
          <rect
            x="580"
            y="150"
            width="180"
            height="70"
            rx="8"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="670"
            y="180"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontWeight="600"
          >
            원하는 동작인가?
          </text>
          <text
            x="670"
            y="200"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            브라우저에서 확인
          </text>

          {/* Zone label under 사람 area */}
          <text
            x="670"
            y="245"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            사람 판정 — 다음 레슨의 자리
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        에이전트 루프는{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          실행 에러까지 자력으로 해결
        </span>
        합니다. 원하는 동작인지의 판정은 아직 사람 몫입니다.
      </figcaption>
    </DiagramFrame>
  );
}

function StepBox({ x, label, sub }: { x: number; label: string; sub: string }) {
  return (
    <g>
      <rect
        x={x}
        y={160}
        width={110}
        height={50}
        rx={8}
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.25"
      />
      <text
        x={x + 55}
        y={184}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-primary)"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={x + 55}
        y={200}
        textAnchor="middle"
        fontSize="10"
        fill="var(--diagram-primary)"
        opacity={0.75}
      >
        {sub}
      </text>
    </g>
  );
}
