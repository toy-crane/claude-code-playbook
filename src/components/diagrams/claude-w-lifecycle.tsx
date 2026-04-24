import { DiagramFrame } from './primitives';

export function ClaudeWLifecycle() {
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
              id="cwl-arrow-primary"
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
              id="cwl-arrow-muted"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-text-muted)" />
            </marker>
            <marker
              id="cwl-arrow-success"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-success)" />
            </marker>
            <marker
              id="cwl-arrow-danger"
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

          {/* === Row 1: main flow === */}

          {/* claude -w trigger pill (widened to fit text) */}
          <rect
            x="18"
            y="78"
            width="152"
            height="40"
            rx="20"
            fill="var(--diagram-warning-soft)"
            stroke="var(--diagram-warning)"
            strokeWidth="1.5"
          />
          <text
            x="94"
            y="103"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            claude -w &lt;name&gt;
          </text>

          {/* trigger → Step 1 */}
          <line
            x1="172"
            y1="98"
            x2="191"
            y2="98"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-primary)"
          />

          {/* Step 1 */}
          <StepCard
            x={193}
            y={62}
            num="1"
            title="worktree 생성"
            sub=".claude/worktrees/<name>/"
          />

          {/* Step 1 → Step 2 */}
          <line
            x1="375"
            y1="98"
            x2="394"
            y2="98"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-primary)"
          />

          {/* Step 2 */}
          <StepCard
            x={396}
            y={62}
            num="2"
            title="Claude 세션"
            sub="해당 디렉토리에서 실행"
          />

          {/* Step 2 → Step 3 */}
          <line
            x1="578"
            y1="98"
            x2="597"
            y2="98"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-primary)"
          />

          {/* Step 3 */}
          <StepCard
            x={599}
            y={62}
            num="3"
            title="세션 종료"
            sub="Ctrl+C · /exit"
          />

          {/* === Fan-out from Step 3 bottom-center (690, 132) — straight lines === */}

          {/* arrow → 자동 삭제 (far left) */}
          <line
            x1="690"
            y1="132"
            x2="285"
            y2="215"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-muted)"
          />

          {/* arrow → Keep */}
          <line
            x1="690"
            y1="132"
            x2="489"
            y2="215"
            stroke="var(--diagram-success)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-success)"
          />

          {/* arrow → Remove (straight down) */}
          <line
            x1="690"
            y1="132"
            x2="690"
            y2="215"
            stroke="var(--diagram-danger)"
            strokeWidth="1.5"
            markerEnd="url(#cwl-arrow-danger)"
          />

          {/* === Row 2: outcome cards === */}
          <OutcomeCard
            x={193}
            y={220}
            title="자동 삭제"
            sub="변경 없음 · 프롬프트 없이 정리"
            tone="neutral"
          />
          <OutcomeCard
            x={396}
            y={220}
            title="Keep"
            sub="변경 있음 · --resume 로 이어가기"
            tone="success"
          />
          <OutcomeCard
            x={599}
            y={220}
            title="Remove"
            sub="변경 있음 · 로컬 변경·커밋 삭제"
            tone="danger"
          />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        한 커맨드가 생성·세션·정리를 묶어 처리하고,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          종료 시 변경 유무에 따라 분기
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function StepCard({
  x,
  y,
  num,
  title,
  sub,
}: {
  x: number;
  y: number;
  num: string;
  title: string;
  sub: string;
}) {
  const cx = x + 91;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="182"
        height="72"
        rx="10"
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.5"
      />
      {/* number badge in top-left corner */}
      <circle
        cx={x + 20}
        cy={y + 20}
        r="11"
        fill="var(--diagram-primary)"
      />
      <text
        x={x + 20}
        y={y + 24}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--diagram-bg-card)"
      >
        {num}
      </text>
      {/* title — centered */}
      <text
        x={cx}
        y={y + 34}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--diagram-primary)"
      >
        {title}
      </text>
      {/* subtitle — centered, muted, monospace */}
      <text
        x={cx}
        y={y + 56}
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--diagram-text-muted)"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
      >
        {sub}
      </text>
    </g>
  );
}

function OutcomeCard({
  x,
  y,
  title,
  sub,
  tone,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  tone: 'neutral' | 'success' | 'danger';
}) {
  const tokens = {
    neutral: {
      fill: 'var(--diagram-bg-card)',
      stroke: 'var(--diagram-border-strong)',
      title: 'var(--diagram-text)',
    },
    success: {
      fill: 'var(--diagram-success-soft)',
      stroke: 'var(--diagram-success)',
      title: 'var(--diagram-success)',
    },
    danger: {
      fill: 'var(--diagram-danger-soft)',
      stroke: 'var(--diagram-danger)',
      title: 'var(--diagram-danger)',
    },
  }[tone];
  const cx = x + 91;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width="182"
        height="76"
        rx="10"
        fill={tokens.fill}
        stroke={tokens.stroke}
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y={y + 32}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={tokens.title}
      >
        {title}
      </text>
      <text
        x={cx}
        y={y + 56}
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--diagram-text-muted)"
      >
        {sub}
      </text>
    </g>
  );
}
