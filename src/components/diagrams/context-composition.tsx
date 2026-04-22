import { DiagramFrame } from './primitives';

const BAR_X = 40;
const BAR_Y = 80;
const BAR_H = 70;

type Segment = { w: number; lines: string[]; accent?: boolean };

const SEGMENTS: Segment[] = [
  { w: 100, lines: ['System', 'Prompt'] },
  { w: 130, lines: ['내장 도구 정의'] },
  { w: 120, lines: ['MCP 도구 설명'] },
  { w: 100, lines: ['CLAUDE.md'] },
  { w: 80, lines: ['사용자', '메시지'], accent: true },
  { w: 190, lines: ['도구 응답 (Tool Responses)'] },
];

const PLACED = SEGMENTS.reduce<Array<Segment & { x: number }>>((acc, s) => {
  const prev = acc[acc.length - 1];
  const x = prev ? prev.x + prev.w : BAR_X;
  acc.push({ ...s, x });
  return acc;
}, []);

const TOTAL_W = PLACED.reduce((sum, s) => sum + s.w, 0);
const ACCENT = PLACED.find((s) => s.accent)!;
const DIVIDERS = PLACED.slice(1)
  .map((s) => s.x)
  .filter((dx) => dx !== ACCENT.x && dx !== ACCENT.x + ACCENT.w);

export function ContextComposition() {
  const placed = PLACED;
  const totalW = TOTAL_W;
  const accent = ACCENT;
  const dividers = DIVIDERS;

  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 240"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          <defs>
            <marker
              id="cc-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-yellow)" />
            </marker>
          </defs>

          {/* Per-segment fills (no stroke) — under the outer frame */}
          {placed.map((s) => (
            <rect
              key={`fill-${s.x}`}
              x={s.x}
              y={BAR_Y}
              width={s.w}
              height={BAR_H}
              fill="var(--diagram-bg-card)"
            />
          ))}

          {/* Outer rounded frame — single neutral border, no overlap anywhere */}
          <rect
            x={BAR_X}
            y={BAR_Y}
            width={totalW}
            height={BAR_H}
            rx="6"
            fill="none"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
          />

          {/* Internal divider lines — single 1px line between non-accent neighbors */}
          {dividers.map((dx) => (
            <line
              key={`div-${dx}`}
              x1={dx}
              y1={BAR_Y}
              x2={dx}
              y2={BAR_Y + BAR_H}
              stroke="var(--diagram-text-muted)"
              strokeWidth="1.25"
            />
          ))}

          {/* Non-accent labels */}
          {placed
            .filter((s) => !s.accent)
            .map((s) => (
              <SegmentLabel
                key={`label-${s.x}`}
                x={s.x}
                w={s.w}
                lines={s.lines}
              />
            ))}

          {/* Accent rect — drawn LAST, slightly extending past the outer frame
              so the yellow border is fully visible on all four sides */}
          <rect
            x={accent.x - 2}
            y={BAR_Y - 2}
            width={accent.w + 4}
            height={BAR_H + 4}
            rx="7"
            fill="var(--diagram-yellow-soft)"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.75"
          />
          <SegmentLabel x={accent.x} w={accent.w} lines={accent.lines} accent />

          {/* Arrow + note pointing up to the accent segment */}
          <line
            x1={accent.x + accent.w / 2}
            y1="180"
            x2={accent.x + accent.w / 2}
            y2="158"
            stroke="var(--diagram-yellow)"
            strokeWidth="1.5"
            markerEnd="url(#cc-arrow)"
          />
          <text
            x={accent.x + accent.w / 2}
            y="200"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--diagram-yellow)"
          >
            사용자가 직접 쓰는 영역
          </text>
          <text
            x={accent.x + accent.w / 2}
            y="216"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            전체의 작은 한 칸
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        사용자 메시지는 한 칸일 뿐 —{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-text)' }}
        >
          System Prompt · 도구 설명 · 이전 응답
        </span>
        이 책상의 대부분을 차지합니다
      </figcaption>
    </DiagramFrame>
  );
}

function SegmentLabel({
  x,
  w,
  lines,
  accent,
}: {
  x: number;
  w: number;
  lines: string[];
  accent?: boolean;
}) {
  const cx = x + w / 2;
  const startY = lines.length === 2 ? 105 : 115;
  const color = accent ? 'var(--diagram-yellow)' : 'var(--diagram-text)';
  return (
    <g>
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={startY + i * 16}
          textAnchor="middle"
          fontSize="12"
          fontWeight={accent ? 600 : 500}
          fill={color}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
