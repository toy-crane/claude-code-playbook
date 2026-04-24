import { DiagramFrame } from './primitives';

export function CheckoutVsWorktree() {
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
              id="cvw-arrow-muted"
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

          {/* === LEFT PANEL: git checkout === */}
          <rect
            x="30"
            y="30"
            width="350"
            height="310"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="205"
            y="55"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-text)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            git checkout
          </text>
          <text
            x="205"
            y="74"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            한 번에 한 브랜치만
          </text>

          {/* active working directory */}
          <rect
            x="75"
            y="100"
            width="260"
            height="80"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="205"
            y="124"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Working directory
          </text>
          <text
            x="205"
            y="154"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            ● main
          </text>

          {/* dormant branches label */}
          <text
            x="205"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            꺼내지 않은 브랜치 (파일은 보이지 않음)
          </text>

          <BranchPillMuted x={90} y={230} label="feature-a" />
          <BranchPillMuted x={225} y={230} label="feature-b" />

          {/* swap hint arrow */}
          <path
            d="M 138 290 Q 205 270 272 290"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#cvw-arrow-muted)"
          />
          <text
            x="205"
            y="316"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            전환 시 디렉토리 내용이 교체됩니다
          </text>

          {/* === RIGHT PANEL: git worktree === */}
          <rect
            x="420"
            y="30"
            width="350"
            height="310"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="595"
            y="55"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            git worktree
          </text>
          <text
            x="595"
            y="74"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            여러 브랜치를 동시에
          </text>

          {/* shared .git hub */}
          <rect
            x="510"
            y="100"
            width="170"
            height="42"
            rx="21"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="595"
            y="126"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-text)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            .git (공유)
          </text>

          {/* connectors from .git to each worktree */}
          <line
            x1="540"
            y1="142"
            x2="485"
            y2="185"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
          />
          <line
            x1="595"
            y1="142"
            x2="595"
            y2="185"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
          />
          <line
            x1="650"
            y1="142"
            x2="705"
            y2="185"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1"
          />

          {/* three working directories */}
          <WorktreeBox x={432} y={185} path="/" branch="main" />
          <WorktreeBox x={542} y={185} path="worktrees/feature-a/" branch="feature-a" />
          <WorktreeBox x={652} y={185} path="worktrees/feature-b/" branch="feature-b" />

          <text
            x="595"
            y="316"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            세 디렉토리가 나란히 존재 · 파일 상태가 각자 독립
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        checkout 은 한 번에 하나,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          worktree 는 여러 브랜치를 각각 별도 디렉토리에 동시에
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function BranchPillMuted({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="95"
        height="28"
        rx="14"
        fill="var(--diagram-bg-panel)"
        stroke="var(--diagram-border)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x={x + 47}
        y={y + 18}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {label}
      </text>
    </g>
  );
}

function WorktreeBox({
  x,
  y,
  path,
  branch,
}: {
  x: number;
  y: number;
  path: string;
  branch: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="106"
        height="96"
        rx="8"
        fill="var(--diagram-bg-card)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.25"
      />
      <text
        x={x + 53}
        y={y + 22}
        textAnchor="middle"
        fontSize="9"
        fill="var(--diagram-text-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {path}
      </text>
      <line
        x1={x + 12}
        y1={y + 32}
        x2={x + 94}
        y2={y + 32}
        stroke="var(--diagram-border)"
        strokeWidth="1"
      />
      <text
        x={x + 53}
        y={y + 52}
        textAnchor="middle"
        fontSize="10"
        fill="var(--diagram-text-muted)"
      >
        branch
      </text>
      <text
        x={x + 53}
        y={y + 74}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--diagram-primary)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {branch}
      </text>
    </g>
  );
}
