import { DiagramFrame } from './primitives';

const POINTS = [
  { count: 3, pct: 100, label: '거의 100%' },
  { count: 10, pct: 85, label: '85%' },
  { count: 20, pct: 65, label: '65%' },
];

const X0 = 90;
const X1 = 720;
const Y0 = 220; // bottom (0%)
const Y1 = 50; // top (100%)
const X_MAX = 25; // x-axis max value
const Y_MAX = 100; // y-axis max value

const xPos = (count: number) => X0 + (count / X_MAX) * (X1 - X0);
const yPos = (pct: number) => Y0 - (pct / Y_MAX) * (Y0 - Y1);

export function CurseOfInstructions() {
  const linePath = POINTS.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${xPos(p.count).toFixed(1)} ${yPos(p.pct).toFixed(1)}`,
  ).join(' ');

  return (
    <DiagramFrame>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 290"
          className="w-full min-w-[640px] h-auto"
          style={{ fontFamily: 'inherit' }}
        >
          {/* Y-axis grid lines + labels */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = yPos(pct);
            return (
              <g key={pct}>
                <line
                  x1={X0}
                  y1={y}
                  x2={X1}
                  y2={y}
                  stroke="var(--diagram-border)"
                  strokeWidth="1"
                  strokeDasharray={pct === 0 ? '0' : '3 3'}
                />
                <text
                  x={X0 - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="var(--diagram-text-muted)"
                >
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* X-axis */}
          <line
            x1={X0}
            y1={Y0}
            x2={X1}
            y2={Y0}
            stroke="var(--diagram-border-strong)"
            strokeWidth="1.25"
          />

          {/* X-axis tick labels */}
          {POINTS.map((p) => (
            <text
              key={p.count}
              x={xPos(p.count)}
              y={Y0 + 18}
              textAnchor="middle"
              fontSize="11"
              fill="var(--diagram-text-muted)"
            >
              {p.count}개
            </text>
          ))}

          {/* Trend line */}
          <path
            d={linePath}
            stroke="var(--diagram-primary)"
            strokeWidth="2"
            fill="none"
          />

          {/* Data points */}
          {POINTS.map((p) => (
            <g key={p.count}>
              <circle
                cx={xPos(p.count)}
                cy={yPos(p.pct)}
                r="6"
                fill="var(--diagram-primary)"
                stroke="var(--diagram-bg-panel)"
                strokeWidth="2"
              />
              <text
                x={xPos(p.count) + 14}
                y={yPos(p.pct) - 8}
                fontSize="12"
                fontWeight="600"
                fill="var(--diagram-primary)"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={(X0 + X1) / 2}
            y={Y0 + 42}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-text-muted)"
          >
            지침 수
          </text>
          <text
            x={30}
            y={(Y0 + Y1) / 2}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--diagram-text-muted)"
            transform={`rotate(-90 30 ${(Y0 + Y1) / 2})`}
          >
            준수율
          </text>
        </svg>
      </div>
      <figcaption
        className="mt-4 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        지침이 많아질수록{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          개별 준수율이 점진적으로 떨어집니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}
