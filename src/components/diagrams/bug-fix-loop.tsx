import { DiagramFrame } from './primitives';

export function BugFixLoop() {
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
              id="bfl-arrow-primary"
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
              id="bfl-arrow-pink"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-pink)" />
            </marker>
            <marker
              id="bfl-arrow-cyan"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-cyan)" />
            </marker>
          </defs>

          {/* 개발자 label */}
          <text
            x="85"
            y="155"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            개발자
          </text>

          {/* "버그 고쳐줘" pill */}
          <rect
            x="20"
            y="170"
            width="130"
            height="50"
            rx="25"
            fill="var(--diagram-yellow-soft)"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.5"
          />
          <text
            x="85"
            y="201"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-text)"
          >
            &ldquo;버그 고쳐줘&rdquo;
          </text>

          {/* 개발자 → 1. 탐색 arrow */}
          <path
            d="M 155 195 L 188 195"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#bfl-arrow-primary)"
          />

          {/* 5 step boxes */}
          <StepBox x={190} label="1. 탐색" />
          <StepBox x={310} label="2. 읽기" />
          <StepBox x={430} label="3. 쓰기" />
          <StepBox x={550} label="4. 실행" />
          <StepBox x={670} label="5. 확인" />

          {/* Inter-step arrows */}
          {[288, 408, 528, 648].map((sx) => (
            <path
              key={sx}
              d={`M ${sx} 195 L ${sx + 22} 195`}
              stroke="var(--diagram-primary)"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#bfl-arrow-primary)"
            />
          ))}

          {/* Feedback loop label (placed above the arch apex, no overlap) */}
          <text
            x="480"
            y="40"
            textAnchor="middle"
            fontSize="12"
            fill="var(--diagram-pink)"
            fontWeight="600"
          >
            실패하면 1~4 를 반복
          </text>

          {/* Feedback loop: 5. 확인 → 1. 탐색 (smooth dashed pink arch, apex ~y=70 below label) */}
          <path
            d="M 720 173 C 720 50, 240 50, 240 173"
            stroke="var(--diagram-pink)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
            markerEnd="url(#bfl-arrow-pink)"
          />

          {/* AI 의 자율 루프 label */}
          <text
            x="430"
            y="250"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            AI 의 자율 루프
          </text>

          {/* Success branch: 5. 확인 → 수정 완료 */}
          <path
            d="M 720 225 L 720 265"
            stroke="var(--diagram-cyan)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#bfl-arrow-cyan)"
          />
          <text
            x="735"
            y="250"
            textAnchor="start"
            fontSize="11"
            fill="var(--diagram-cyan)"
            fontWeight="600"
          >
            성공
          </text>

          {/* 수정 완료 box */}
          <rect
            x="645"
            y="270"
            width="150"
            height="44"
            rx="8"
            fill="var(--diagram-cyan-soft)"
            stroke="var(--diagram-cyan)"
            strokeWidth="1.5"
          />
          <text
            x="720"
            y="297"
            textAnchor="middle"
            fontSize="13"
            fill="var(--diagram-cyan)"
            fontWeight="600"
          >
            수정 완료
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        개발자는 방향만 주고, AI 는{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          탐색 · 수정 · 실행
        </span>
        을 스스로 반복합니다
      </figcaption>
    </DiagramFrame>
  );
}

function StepBox({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y="170"
        width="98"
        height="50"
        rx="8"
        fill="var(--diagram-primary-soft)"
        stroke="var(--diagram-primary)"
        strokeWidth="1.25"
      />
      <text
        x={x + 49}
        y="201"
        textAnchor="middle"
        fontSize="13"
        fill="var(--diagram-primary)"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  );
}
