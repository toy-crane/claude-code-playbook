import { DiagramFrame } from './primitives';

export function GuessFillsGaps() {
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
              id="gfg-arrow-primary"
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

          {/* Column headers */}
          <text
            x="150"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            개발자 요청
          </text>
          <text
            x="640"
            y="28"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            AI 결과
          </text>

          {/* Arrows */}
          <path
            d="M 270 180 L 338 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#gfg-arrow-primary)"
          />
          <path
            d="M 460 180 L 528 180"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#gfg-arrow-primary)"
          />

          {/* Prompt card (left) */}
          <rect
            x="30"
            y="50"
            width="240"
            height="260"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="150"
            y="86"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            &ldquo;Todo 앱 만들어줘&rdquo;
          </text>
          <line
            x1="50"
            y1="108"
            x2="250"
            y2="108"
            stroke="var(--diagram-border)"
            strokeWidth="1"
          />
          <BlankRow y={132} label="완료 표시" />
          <BlankRow y={182} label="정렬 순서" />
          <BlankRow y={232} label="삭제 방식" />
          <BlankRow y={282} label="프레임워크" />

          {/* LLM block */}
          <rect
            x="340"
            y="150"
            width="120"
            height="60"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="178"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-primary)"
          >
            LLM
          </text>
          <text
            x="400"
            y="196"
            textAnchor="middle"
            fontSize="10"
            fill="var(--diagram-text-muted)"
          >
            확률 예측
          </text>

          {/* Result card (right) */}
          <rect
            x="530"
            y="50"
            width="240"
            height="260"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />
          <text
            x="650"
            y="86"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--diagram-text)"
          >
            &ldquo;Todo 앱 만들어줘&rdquo;
          </text>
          <line
            x1="550"
            y1="108"
            x2="750"
            y2="108"
            stroke="var(--diagram-border)"
            strokeWidth="1"
          />
          <FilledRow y={132} label="완료 표시" value="체크박스" />
          <FilledRow y={182} label="정렬 순서" value="생성순" />
          <FilledRow y={232} label="삭제 방식" value="즉시 삭제" />
          <FilledRow y={282} label="프레임워크" value="React" />
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        프롬프트에 남은 빈칸은{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          AI 가 &ldquo;그럴듯한 값&rdquo;으로 채웁니다
        </span>
        {' '}— 빈칸의 크기가 곧 추측의 크기
      </figcaption>
    </DiagramFrame>
  );
}

function BlankRow({ y, label }: { y: number; label: string }) {
  return (
    <g>
      <text
        x="50"
        y={y + 4}
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {label}
      </text>
      <rect
        x="140"
        y={y - 14}
        width="110"
        height="22"
        rx="4"
        fill="none"
        stroke="var(--diagram-border-strong)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text
        x="195"
        y={y + 2}
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-text-muted)"
        letterSpacing="2"
      >
        ？？？
      </text>
    </g>
  );
}

function FilledRow({ y, label, value }: { y: number; label: string; value: string }) {
  return (
    <g>
      <text
        x="550"
        y={y + 4}
        fontSize="11"
        fill="var(--diagram-text-muted)"
      >
        {label}
      </text>
      <rect
        x="640"
        y={y - 14}
        width="110"
        height="22"
        rx="4"
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1"
      />
      <text
        x="695"
        y={y + 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--diagram-primary)"
      >
        {value}
      </text>
    </g>
  );
}
