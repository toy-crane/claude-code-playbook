import { DiagramFrame } from './primitives';

export function ClaudeMdVsMemory() {
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
              id="cvm-arrow-primary"
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
              id="cvm-arrow-warning"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-warning)" />
            </marker>
          </defs>

          {/* Column headers */}
          <text
            x="200"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
            letterSpacing="1"
          >
            팀이 공유하는 매뉴얼
          </text>
          <text
            x="600"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
            fontWeight="600"
            letterSpacing="1"
          >
            Claude 가 쌓는 관찰 노트
          </text>

          {/* LEFT: writer pill — 나 */}
          <Pill x={140} y={50} width={120} label="나" color="primary" />
          {/* arrow down with label */}
          <line
            x1="200"
            y1="82"
            x2="200"
            y2="112"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#cvm-arrow-primary)"
          />
          <text
            x="210"
            y="102"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            직접 씀
          </text>

          {/* LEFT: file card */}
          <FileCard
            x={100}
            y={120}
            title="CLAUDE.md"
            items={['팀 합의 규칙', '아키텍처 결정 이유', '제약사항']}
            accent="primary"
          />

          {/* LEFT: scope */}
          <ScopeTag
            x={100}
            y={275}
            label="git · 팀 전체에 공유"
            color="primary"
          />

          {/* Divider */}
          <line
            x1="400"
            y1="50"
            x2="400"
            y2="310"
            stroke="var(--diagram-border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* RIGHT: writer pill — Claude */}
          <Pill x={540} y={50} width={120} label="Claude" color="warning" />
          <line
            x1="600"
            y1="82"
            x2="600"
            y2="112"
            stroke="var(--diagram-warning)"
            strokeWidth="1.5"
            markerEnd="url(#cvm-arrow-warning)"
          />
          <text
            x="610"
            y="102"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            스스로 씀
          </text>

          {/* RIGHT: file card */}
          <FileCard
            x={500}
            y={120}
            title="Memory"
            items={['개인 선호', '자주 하는 교정', '작업 패턴']}
            accent="warning"
          />

          {/* RIGHT: scope */}
          <ScopeTag
            x={500}
            y={275}
            label="로컬 · 개인 전용"
            color="warning"
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        같은 두 파일처럼 보이지만{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          쓰는 사람과 닿는 범위
        </span>
        가 다릅니다
      </figcaption>
    </DiagramFrame>
  );
}

function Pill({
  x,
  y,
  width,
  label,
  color,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  color: 'primary' | 'warning';
}) {
  const fill =
    color === 'primary'
      ? 'var(--diagram-primary-soft)'
      : 'var(--diagram-warning-soft)';
  const stroke =
    color === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-warning)';
  const textFill =
    color === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="32"
        rx="16"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <text
        x={x + width / 2}
        y={y + 21}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={textFill}
      >
        {label}
      </text>
    </g>
  );
}

function FileCard({
  x,
  y,
  title,
  items,
  accent,
}: {
  x: number;
  y: number;
  title: string;
  items: string[];
  accent: 'primary' | 'warning';
}) {
  const fill =
    accent === 'primary'
      ? 'var(--diagram-primary-soft)'
      : 'var(--diagram-warning-soft)';
  const stroke =
    accent === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-warning)';
  const titleColor =
    accent === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="140"
        rx="12"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.75"
      />
      <text
        x={x + 100}
        y={y + 32}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={titleColor}
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {title}
      </text>
      <line
        x1={x + 20}
        y1={y + 48}
        x2={x + 180}
        y2={y + 48}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      {items.map((item, i) => (
        <text
          key={i}
          x={x + 24}
          y={y + 72 + i * 22}
          fontSize="12"
          fill="var(--diagram-text)"
        >
          · {item}
        </text>
      ))}
    </g>
  );
}

function ScopeTag({
  x,
  y,
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: 'primary' | 'warning';
}) {
  const textColor =
    color === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  const stroke =
    color === 'primary' ? 'var(--diagram-primary)' : 'var(--diagram-warning)';
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="200"
        height="30"
        rx="6"
        fill="var(--diagram-bg-card)"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text
        x={x + 100}
        y={y + 20}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}
