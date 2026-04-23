import { DiagramFrame } from './primitives';

export function Lesson04CapabilityVsProcedure() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
        <LayerCard
          role="도구 (Capability)"
          title="할 수 있게"
          items={[
            { label: 'gh CLI', sub: 'GitHub 접근' },
            { label: 'Chrome DevTools MCP', sub: '브라우저 상태' },
            { label: 'Weather MCP', sub: '내 API 감싸기' },
          ]}
        />
        <div
          className="hidden md:flex items-center justify-center"
          aria-hidden
        >
          <span
            className="rounded-full border-2 px-3 py-1 text-lg font-bold"
            style={{
              color: 'var(--diagram-primary)',
              borderColor: 'var(--diagram-primary)',
              backgroundColor: 'var(--diagram-bg-card)',
            }}
          >
            +
          </span>
        </div>
        <LayerCard
          role="절차 (Procedure)"
          title="매번 같게"
          items={[
            { label: 'code-review Skill', sub: '검사 항목 · 심각도' },
            { label: 'ui-bug-report Skill', sub: '리포트 템플릿' },
            { label: '기타 워크플로우 Skill', sub: '팀 기준 · 형식' },
          ]}
        />
      </div>
      <figcaption
        className="mt-6 pt-4 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        도구가 접근을 제공하고 Skill 이{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          매번 같은 절차
        </span>
        를 정의합니다 — 둘이 합쳐져야 반복 워크플로우가 일관됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function LayerCard({
  role,
  title,
  items,
}: {
  role: string;
  title: string;
  items: { label: string; sub: string }[];
}) {
  return (
    <section
      className="rounded-lg border p-4 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border-strong)',
      }}
    >
      <header className="flex flex-col gap-0.5">
        <span
          className="text-[11px] tracking-wide uppercase"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {role}
        </span>
        <h3
          className="text-sm font-bold m-0"
          style={{ color: 'var(--diagram-primary)' }}
        >
          {title}
        </h3>
      </header>
      <ul className="flex flex-col gap-2 list-none m-0 p-0">
        {items.map((it) => (
          <li
            key={it.label}
            className="rounded-md border px-3 py-2"
            style={{
              backgroundColor: 'var(--diagram-primary-soft)',
              borderColor: 'var(--diagram-primary)',
            }}
          >
            <div
              className="text-[12px] font-semibold leading-snug"
              style={{
                color: 'var(--diagram-primary)',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              {it.label}
            </div>
            <div
              className="text-[11px] leading-snug"
              style={{ color: 'var(--diagram-text-muted)' }}
            >
              {it.sub}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
