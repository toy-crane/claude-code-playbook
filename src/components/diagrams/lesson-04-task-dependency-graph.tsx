import { DiagramFrame } from './primitives';

export function Lesson04TaskDependencyGraph() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 360"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="ltdg-arrow-primary"
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

          {/* Column labels */}
          <text
            x="160"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text-muted)"
          >
            독립적으로 시작 가능
          </text>
          <text
            x="640"
            y="22"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text-muted)"
          >
            blockedBy 로 대기
          </text>

          {/* Arrows (drawn first so they sit beneath cards) */}
          {/* Task 1 → Task 3 */}
          <path
            d="M 260 70 Q 400 70 538 110"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#ltdg-arrow-primary)"
          />
          {/* Task 2 → Task 3 */}
          <path
            d="M 260 150 Q 400 150 538 110"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#ltdg-arrow-primary)"
          />
          {/* Task 5 → Task 6 */}
          <path
            d="M 260 310 L 538 310"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#ltdg-arrow-primary)"
          />

          {/* Independent tasks (column 1) */}
          <TaskCard x={60} y={40} id="1" label="마감일 설정" />
          <TaskCard x={60} y={120} id="2" label="정렬 기능" />
          <TaskCard x={60} y={200} id="4" label="검색 기능" />
          <TaskCard x={60} y={280} id="5" label="카테고리 태그" />

          {/* Dependent tasks (column 2) */}
          <TaskCard
            x={540}
            y={80}
            id="3"
            label="마감일순 정렬"
            focal
            subtitle="blockedBy: [1, 2]"
          />
          <TaskCard
            x={540}
            y={280}
            id="6"
            label="카테고리별 필터"
            focal
            subtitle="blockedBy: [5]"
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        독립 Task 는 바로 시작하고, blockedBy 가 있는 Task 는{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          선행 Task 가 끝날 때까지 대기
        </span>
        합니다
      </figcaption>
    </DiagramFrame>
  );
}

function TaskCard({
  x,
  y,
  id,
  label,
  focal,
  subtitle,
}: {
  x: number;
  y: number;
  id: string;
  label: string;
  focal?: boolean;
  subtitle?: string;
}) {
  const fill = focal ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const stroke = focal ? 'var(--diagram-primary)' : 'var(--diagram-border-strong)';
  const labelColor = focal ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="60"
        rx="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={focal ? 1.5 : 1.25}
      />
      <text
        x={x + 16}
        y={subtitle ? y + 25 : y + 35}
        fontSize="13"
        fill={labelColor}
        fontWeight={focal ? 600 : 500}
      >
        Task {id}: {label}
      </text>
      {subtitle && (
        <text
          x={x + 16}
          y={y + 45}
          fontSize="11"
          fill="var(--diagram-text-muted)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}
