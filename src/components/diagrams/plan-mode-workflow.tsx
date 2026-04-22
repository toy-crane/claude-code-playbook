import { DiagramFrame } from './primitives';

export function PlanModeWorkflow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 340"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="pmw-arrow-primary"
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
              id="pmw-arrow-danger"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-danger)" />
            </marker>
            <marker
              id="pmw-arrow-success"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-success)" />
            </marker>
          </defs>

          {/* Phase labels */}
          <PhaseLabel x={158} label="Phase 1 · 탐색" />
          <PhaseLabel x={474} label="Phase 2 · 계획" />
          <PhaseLabel x={711} label="Phase 3 · 실행" />

          {/* Phase separators (dashed verticals) */}
          <line
            x1="316"
            y1="35"
            x2="316"
            y2="280"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <line
            x1="632"
            y1="35"
            x2="632"
            y2="280"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* Feedback loop label */}
          <text
            x="474"
            y="95"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-danger)"
            fontWeight="600"
          >
            수정 필요 → 다시 계획
          </text>

          {/* Feedback loop arch: 검토 top → 계획 top */}
          <path
            d="M 553 170 C 553 105, 395 105, 395 170"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            markerEnd="url(#pmw-arrow-danger)"
          />

          {/* Box 1: Shift+Tab (neutral actor pill) */}
          <rect
            x="15"
            y="170"
            width="128"
            height="55"
            rx="27"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="79"
            y="195"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontWeight="500"
          >
            Shift+Tab
          </text>
          <text
            x="79"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            진입
          </text>

          {/* B1 → B2 */}
          <line
            x1="143"
            y1="197"
            x2="171"
            y2="197"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#pmw-arrow-primary)"
          />

          {/* Box 2: 탐색 */}
          <StepBox x={173} label="코드베이스 탐색" sub="Read · Grep · Glob" />

          {/* B2 → B3 */}
          <line
            x1="301"
            y1="197"
            x2="329"
            y2="197"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#pmw-arrow-primary)"
          />

          {/* Box 3: 계획 제안 */}
          <StepBox x={331} label="계획 제안" sub="+ 미해결 질문" />

          {/* B3 → B4 */}
          <line
            x1="459"
            y1="197"
            x2="487"
            y2="197"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#pmw-arrow-primary)"
          />

          {/* Box 4: 검토 */}
          <StepBox x={489} label="개발자 검토" sub="러버덕 대화" />

          {/* B4 → B5 (success / approval) */}
          <line
            x1="617"
            y1="197"
            x2="645"
            y2="197"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
            markerEnd="url(#pmw-arrow-success)"
          />
          <text
            x="631"
            y="187"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            승인
          </text>

          {/* Box 5: 코드 작성 (success accent) */}
          <rect
            x="647"
            y="170"
            width="128"
            height="55"
            rx="8"
            fill="var(--diagram-success-soft)"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
          />
          <text
            x="711"
            y="195"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            코드 작성
          </text>
          <text
            x="711"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-success)"
          >
            계획대로 실행
          </text>

          {/* Bottom caption on approved flow */}
          <text
            x="400"
            y="270"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            파일 수정은 차단 — 탐색과 대화만 가능
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Shift+Tab 으로 진입해{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          탐색 · 계획
        </span>
        을 끝낸 뒤 승인하면 코드가 작성됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function PhaseLabel({ x, label }: { x: number; label: string }) {
  return (
    <text
      x={x}
      y="55"
      textAnchor="middle"
      fontSize="12"
      fill="var(--diagram-text-muted)"
      fontWeight="600"
    >
      {label}
    </text>
  );
}

function StepBox({
  x,
  label,
  sub,
}: {
  x: number;
  label: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y="170"
        width="128"
        height="55"
        rx="8"
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.25"
      />
      <text
        x={x + 64}
        y="195"
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-primary)"
        fontWeight="600"
      >
        {label}
      </text>
      <text
        x={x + 64}
        y="212"
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-primary)"
        opacity="0.75"
      >
        {sub}
      </text>
    </g>
  );
}
