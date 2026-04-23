import { DiagramFrame } from './primitives';

export function Lesson02McpThreeStrengths() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StrengthCard
          index="①"
          title="실행 중 앱 관찰"
          description="렌더링된 DOM · 콘솔 · 네트워크"
          examples={['Chrome DevTools', 'Playwright', 'Figma']}
        />
        <StrengthCard
          index="②"
          title="OAuth 가 복잡한 서비스"
          description="MCP 서버가 인증을 내장"
          examples={['Linear', 'Notion', 'Sentry']}
        />
        <StrengthCard
          index="③"
          title="팀 공유 설정"
          description=".mcp.json 파일 하나로"
          examples={['모든 MCP 서버 공통']}
        />
      </div>
      <figcaption
        className="mt-6 pt-4 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        CLI 가 대세인 시대에도{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          MCP 가 여전히 더 나은 영역
        </span>
        이 있습니다
      </figcaption>
    </DiagramFrame>
  );
}

function StrengthCard({
  index,
  title,
  description,
  examples,
}: {
  index: string;
  title: string;
  description: string;
  examples: string[];
}) {
  return (
    <section
      className="rounded-lg border p-4 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border-strong)',
      }}
    >
      <div className="flex items-baseline gap-2">
        <span
          className="text-xl font-bold leading-none"
          style={{ color: 'var(--diagram-primary)' }}
        >
          {index}
        </span>
        <h3
          className="text-[13px] font-bold m-0"
          style={{ color: 'var(--diagram-text)' }}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-xs m-0 leading-snug"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {examples.map((ex) => (
          <span
            key={ex}
            className="rounded-md border px-2 py-0.5 text-[11px] whitespace-nowrap"
            style={{
              backgroundColor: 'var(--diagram-primary-soft)',
              borderColor: 'var(--diagram-primary)',
              color: 'var(--diagram-primary)',
            }}
          >
            {ex}
          </span>
        ))}
      </div>
    </section>
  );
}
