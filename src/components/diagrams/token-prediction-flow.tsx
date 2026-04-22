import { DiagramFrame } from './primitives';

export function TokenPredictionFlow() {
  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[600px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="tp-arrow-primary"
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
              id="tp-arrow-cyan"
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
              id="tp-arrow-muted"
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

          {/* Candidate group label */}
          <text
            x="600"
            y="22"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            다음 단어 후보
          </text>

          {/* 입력 → LLM */}
          <path
            d="M 220 170 L 258 170"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#tp-arrow-primary)"
          />

          {/* LLM → 후보들 fan-out */}
          {/* → 밥을 (selected, cyan) */}
          <path
            d="M 400 170 Q 425 170 448 65"
            stroke="var(--diagram-success)"
            strokeWidth="1.75"
            fill="none"
            markerEnd="url(#tp-arrow-cyan)"
          />
          {/* → 파스타를 */}
          <path
            d="M 400 170 Q 425 170 448 135"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tp-arrow-muted)"
          />
          {/* → 국수를 */}
          <path
            d="M 400 170 Q 425 170 448 205"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tp-arrow-muted)"
          />
          {/* → ... (dashed) */}
          <path
            d="M 400 170 Q 425 170 448 275"
            stroke="var(--diagram-text-muted)"
            strokeDasharray="4 3"
            strokeWidth="1.25"
            fill="none"
            markerEnd="url(#tp-arrow-muted)"
          />

          {/* 입력 텍스트 label */}
          <text
            x="120"
            y="130"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            입력 텍스트
          </text>

          {/* 입력 텍스트 카드 */}
          <rect
            x="20"
            y="145"
            width="200"
            height="50"
            rx="10"
            fill="var(--diagram-bg-card)"
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="120"
            y="176"
            textAnchor="middle"
            fontSize="14"
            fill="var(--diagram-text)"
          >
            &ldquo;나는 오늘 점심에&rdquo;
          </text>

          {/* LLM 블록 */}
          <rect
            x="260"
            y="135"
            width="140"
            height="70"
            rx="8"
            fill="var(--diagram-primary-soft)"
            stroke="var(--diagram-primary)"
            strokeWidth="1.5"
          />
          <text
            x="330"
            y="165"
            textAnchor="middle"
            fontSize="14"
            fill="var(--diagram-primary)"
            fontWeight="600"
          >
            LLM
          </text>
          <text
            x="330"
            y="185"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            확률 예측 시스템
          </text>

          {/* 후보 chips */}
          <CandidateChip y={45} label="밥을" prob="35%" selected />
          <CandidateChip y={115} label="파스타를" prob="25%" />
          <CandidateChip y={185} label="국수를" prob="20%" />
          <CandidateChip y={255} label="..." prob="20%" dashed />

          {/* 선택 label */}
          <text
            x="762"
            y="70"
            textAnchor="start"
            fontSize="11"
            fill="var(--diagram-success)"
            fontWeight="600"
          >
            선택
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        &ldquo;정답&rdquo;이 아니라{' '}
        <span className="font-semibold" style={{ color: 'var(--diagram-primary)' }}>
          &ldquo;가장 그럴듯한 다음 단어&rdquo;
        </span>
        를 선택 — 이것을 반복
      </figcaption>
    </DiagramFrame>
  );
}

function CandidateChip({
  y,
  label,
  prob,
  selected,
  dashed,
}: {
  y: number;
  label: string;
  prob: string;
  selected?: boolean;
  dashed?: boolean;
}) {
  const fill = selected ? 'var(--diagram-success-soft)' : 'var(--diagram-bg-card)';
  const stroke = selected ? 'var(--diagram-success)' : 'var(--diagram-border)';
  const color = selected
    ? 'var(--diagram-success)'
    : dashed
      ? 'var(--diagram-text-muted)'
      : 'var(--diagram-text)';
  const quoted = label === '...' ? label : `“${label}”`;
  return (
    <g opacity={dashed ? 0.75 : 1}>
      <rect
        x="450"
        y={y}
        width="300"
        height="40"
        rx="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={selected ? 1.5 : 1.25}
        strokeDasharray={dashed ? '4 3' : undefined}
      />
      <text
        x="475"
        y={y + 25}
        textAnchor="start"
        fontSize="13"
        fill={color}
        fontWeight={selected ? 600 : 400}
      >
        {quoted}
      </text>
      <text
        x="725"
        y={y + 25}
        textAnchor="end"
        fontSize="13"
        fill={color}
        fontWeight={selected ? 600 : 400}
      >
        {prob}
      </text>
    </g>
  );
}
