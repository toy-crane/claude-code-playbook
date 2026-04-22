import { DiagramFrame } from './primitives';

const BAR_X = 40;
const BAR_Y = 50;
const BAR_W = 720;
const BAR_H = 110;

type Zone = { w: number; label: string; sub: string; accent?: boolean };

const ZONES: Zone[] = [
  { w: 200, label: 'Smart Zone', sub: '초반 — 높은 주의력', accent: true },
  { w: 320, label: 'Dumb Zone', sub: '중간 — Lost in the Middle' },
  { w: 200, label: 'Smart Zone', sub: '후반 — 다시 주목', accent: true },
];

const PLACED = ZONES.reduce<Array<Zone & { x: number }>>((acc, z) => {
  const prev = acc[acc.length - 1];
  const x = prev ? prev.x + prev.w : BAR_X;
  acc.push({ ...z, x });
  return acc;
}, []);

export function SmartDumbZone() {
  const placed = PLACED;

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
              id="sdz-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-text-muted)" />
            </marker>
            {/* Clip the segment fills to the outer rounded shape so corners follow the bar */}
            <clipPath id="sdz-bar-clip">
              <rect
                x={BAR_X}
                y={BAR_Y}
                width={BAR_W}
                height={BAR_H}
                rx="10"
              />
            </clipPath>
          </defs>

          {/* Segment fills (no strokes) inside the rounded clip */}
          <g clipPath="url(#sdz-bar-clip)">
            {placed.map((z) => (
              <rect
                key={`fill-${z.x}`}
                x={z.x}
                y={BAR_Y}
                width={z.w}
                height={BAR_H}
                fill={
                  z.accent
                    ? 'var(--diagram-primary-soft)'
                    : 'var(--diagram-bg-card)'
                }
              />
            ))}
          </g>

          {/* Outer rounded border — single stroke, no overlap */}
          <rect
            x={BAR_X}
            y={BAR_Y}
            width={BAR_W}
            height={BAR_H}
            rx="10"
            fill="none"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
          />

          {/* Zone labels */}
          {placed.map((z) => {
            const cx = z.x + z.w / 2;
            const titleColor = z.accent
              ? 'var(--diagram-primary)'
              : 'var(--diagram-text-muted)';
            return (
              <g key={`label-${z.x}`}>
                <text
                  x={cx}
                  y={BAR_Y + 50}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="700"
                  fill={titleColor}
                >
                  {z.label}
                </text>
                <text
                  x={cx}
                  y={BAR_Y + 80}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--diagram-text-muted)"
                >
                  {z.sub}
                </text>
              </g>
            );
          })}

          {/* Direction axis below */}
          <line
            x1={BAR_X}
            y1="195"
            x2={BAR_X + BAR_W - 5}
            y2="195"
            stroke="var(--diagram-text-muted)"
            strokeWidth="1.25"
            markerEnd="url(#sdz-arrow)"
          />
          <text
            x={BAR_X + BAR_W / 2}
            y="218"
            textAnchor="middle"
            fontSize="11"
            fill="var(--diagram-text-muted)"
          >
            Context 길이
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        초반과 후반은 잘 보지만,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          중간에 묻은 정보는 놓치기 쉽습니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}
