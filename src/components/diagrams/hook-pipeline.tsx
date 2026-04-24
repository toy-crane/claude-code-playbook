import { DiagramFrame } from './primitives';

export function HookPipeline() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 280"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="hp-arrow-primary"
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

          {/* Connector arrows (drawn first, sit beneath shapes) */}
          <line
            x1="240"
            y1="100"
            x2="288"
            y2="100"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            markerEnd="url(#hp-arrow-primary)"
          />
          <line
            x1="510"
            y1="100"
            x2="558"
            y2="100"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
            markerEnd="url(#hp-arrow-primary)"
          />

          {/* Stage 1: Event */}
          <StageBox x={20} label="①" title="Event" subtitle="언제 발동?" />
          <ExampleList
            x={20}
            items={['PostToolUse', 'Stop', 'PreToolUse']}
          />

          {/* Stage 2: Matcher */}
          <StageBox x={290} label="②" title="Matcher" subtitle="어떤 조건?" />
          <ExampleList
            x={290}
            items={['"Write|Edit"', '"Bash"', '(생략 = 모두)']}
          />

          {/* Stage 3: Handler */}
          <StageBox x={560} label="③" title="Handler" subtitle="무엇을 실행?" />
          <ExampleList
            x={560}
            items={['command', 'prompt', 'http · mcp_tool · agent']}
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Hook 은{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          세 요소의 조합
        </span>
        으로 정의됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function StageBox({
  x,
  label,
  title,
  subtitle,
}: {
  x: number;
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={55}
        width={220}
        height={90}
        rx={10}
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.5"
      />
      <text
        x={x + 110}
        y={82}
        textAnchor="middle"
        fontSize="14"
        fill="var(--diagram-primary)"
        fontWeight="700"
      >
        {label} {title}
      </text>
      <text
        x={x + 110}
        y={110}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-text-muted)"
      >
        {subtitle}
      </text>
    </g>
  );
}

function ExampleList({ x, items }: { x: number; items: string[] }) {
  return (
    <g>
      <text
        x={x + 110}
        y={170}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        예시
      </text>
      {items.map((item, i) => (
        <g key={item}>
          <rect
            x={x + 30}
            y={180 + i * 28}
            width={160}
            height={22}
            rx={5}
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border)"
            strokeWidth="1"
          />
          <text
            x={x + 110}
            y={195 + i * 28}
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-text)"
          >
            {item}
          </text>
        </g>
      ))}
    </g>
  );
}
