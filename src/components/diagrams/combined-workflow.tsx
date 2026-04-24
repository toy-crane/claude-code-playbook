import { DiagramFrame } from './primitives';

export function CombinedWorkflow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 260"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="cw-arrow-primary"
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

          {/* Arrows between steps (beneath boxes) */}
          <path
            d="M 175 125 L 213 125"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cw-arrow-primary)"
          />
          <path
            d="M 375 125 L 413 125"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cw-arrow-primary)"
          />
          <path
            d="M 575 125 L 613 125"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cw-arrow-primary)"
          />

          {/* Step 1: Skill 탐색 */}
          <StepBox
            x={15}
            y={75}
            role="Skill"
            title="탐색"
            subtitle="기준·체크리스트 로드"
            accent
          />
          {/* Step 2: Tool 접근 */}
          <StepBox
            x={215}
            y={75}
            role="Tool"
            title="접근"
            subtitle="데이터·상태 수집"
          />
          {/* Step 3: Skill 조율 */}
          <StepBox
            x={415}
            y={75}
            role="Skill"
            title="조율"
            subtitle="분석·구조화·포맷"
            accent
          />
          {/* Step 4: Tool 실행 */}
          <StepBox
            x={615}
            y={75}
            role="Tool"
            title="실행"
            subtitle="리뷰 등록·리포트 제출"
          />

          {/* Bottom label */}
          <text
            x="400"
            y="220"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            Skill 과 Tool 이 번갈아가며 작동 — 매번 같은 흐름, 같은 형식의 결과
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        코드 리뷰든 버그 리포트든{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          결합 패턴은 동일
        </span>
        합니다 — 도구가 접근, Skill 이 절차
      </figcaption>
    </DiagramFrame>
  );
}

function StepBox({
  x,
  y,
  role,
  title,
  subtitle,
  accent,
}: {
  x: number;
  y: number;
  role: string;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  const fill = accent ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = accent ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const roleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  const titleColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="160"
        height="100"
        rx="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={accent ? 1.75 : 1.25}
      />
      <text
        x={x + 80}
        y={y + 23}
        textAnchor="middle"
        fontSize="11"
        fill={roleColor}
        fontWeight={accent ? 600 : 400}
      >
        {role}
      </text>
      <text
        x={x + 80}
        y={y + 54}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill={titleColor}
      >
        {title}
      </text>
      <text
        x={x + 80}
        y={y + 80}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {subtitle}
      </text>
    </g>
  );
}
