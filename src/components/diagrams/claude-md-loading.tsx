import { DiagramFrame } from './primitives';

export function ClaudeMdLoading() {
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
              id="cml-arrow"
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

          <SourceCard
            x={80}
            title="프로젝트 CLAUDE.md"
            path="./CLAUDE.md"
            scope="팀 공유 · git 커밋"
          />
          <SourceCard
            x={460}
            title="개인 CLAUDE.md"
            path="~/.claude/CLAUDE.md"
            scope="개인 · 모든 프로젝트"
          />

          {/* Fan-in arrows merging into the Context slot */}
          <path
            d="M 220 130 Q 220 175 360 210"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cml-arrow)"
          />
          <path
            d="M 600 130 Q 600 175 460 210"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#cml-arrow)"
          />

          {/* Merge label between arrows */}
          <text
            x="410"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            새 세션 시작 시 병합
          </text>

          {/* Merged destination card */}
          <rect
            x="270"
            y="215"
            width="280"
            height="50"
            rx="10"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.75"
          />
          <text
            x="410"
            y="237"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            Context Window 의 CLAUDE.md 영역
          </text>
          <text
            x="410"
            y="254"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            매 새 세션 자동 로드
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        프로젝트와 개인 두 곳의 CLAUDE.md 가 병합되어{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          매 대화에 자동 주입
        </span>
        됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function SourceCard({
  x,
  title,
  path,
  scope,
}: {
  x: number;
  title: string;
  path: string;
  scope: string;
}) {
  const cx = x + 140;
  return (
    <g>
      <rect
        x={x}
        y={40}
        width="280"
        height="90"
        rx="10"
        fill="var(--diagram-bg-card)"
        stroke="var(--diagram-border-strong)"
        strokeWidth="1.25"
      />
      <text
        x={cx}
        y={68}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--diagram-text)"
      >
        {title}
      </text>
      <text
        x={cx}
        y={90}
        textAnchor="middle"
        fontSize="12"
        fill="var(--diagram-text-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {path}
      </text>
      <text
        x={cx}
        y={112}
        textAnchor="middle"
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {scope}
      </text>
    </g>
  );
}
