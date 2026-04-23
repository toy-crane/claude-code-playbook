import { DiagramFrame } from './primitives';

type Rule = {
  name: string;
  paths: string | null;
  active: boolean;
};

export function RulesPathLoading() {
  return (
    <DiagramFrame>
      <div
        className="mb-4 flex items-center justify-center rounded-md border px-3 py-2 text-xs"
        style={{
          backgroundColor: 'var(--diagram-bg-card)',
          borderColor: 'var(--diagram-border-strong)',
          color: 'var(--diagram-text)',
        }}
      >
        같은 Claude Code 세션
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <ScenarioBlock
          file="components/ui/button.tsx"
          rules={[
            { name: 'shadcn.md', paths: 'components/ui/**', active: true },
            { name: 'workflow.md', paths: null, active: true },
          ]}
        />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <ScenarioBlock
          file="lib/todo-store.ts"
          rules={[
            { name: 'shadcn.md', paths: 'components/ui/**', active: false },
            { name: 'workflow.md', paths: null, active: true },
          ]}
        />
      </div>

      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        같은 세션이지만 작업 파일 경로에 따라{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          paths 매칭 규칙
        </span>
        만 켜집니다
      </figcaption>
    </DiagramFrame>
  );
}

function ScenarioBlock({ file, rules }: { file: string; rules: Rule[] }) {
  return (
    <section className="flex flex-col gap-3">
      <div
        className="rounded-md border px-3 py-2 text-xs"
        style={{
          backgroundColor: 'var(--diagram-bg-card)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        <div
          style={{ color: 'var(--diagram-text-muted)' }}
          className="mb-1"
        >
          작업 파일
        </div>
        <code style={{ color: 'var(--diagram-text)' }}>{file}</code>
      </div>

      <div
        className="text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        켜진 Rules
      </div>

      <div className="flex flex-col gap-2">
        {rules.map((rule) => (
          <RuleCard key={rule.name} {...rule} />
        ))}
      </div>
    </section>
  );
}

function RuleCard({ name, paths, active }: Rule) {
  const fg = active ? 'var(--diagram-primary)' : 'var(--diagram-text-muted)';
  const bg = active ? 'var(--diagram-primary-soft)' : 'var(--diagram-bg-card)';
  const border = active ? 'var(--diagram-primary)' : 'var(--diagram-border)';
  return (
    <div
      className="rounded-md border px-3 py-2 text-xs"
      style={{
        backgroundColor: bg,
        borderColor: border,
        borderStyle: active ? 'solid' : 'dashed',
        opacity: active ? 1 : 0.55,
      }}
    >
      <div className="flex items-center justify-between">
        <code style={{ color: fg, fontWeight: active ? 600 : 400 }}>
          {name}
        </code>
        <span style={{ color: fg, fontSize: '11px' }}>
          {active ? '켜짐' : '꺼짐'}
        </span>
      </div>
      <div
        style={{ color: 'var(--diagram-text-muted)' }}
        className="mt-1 text-[11px]"
      >
        paths: {paths ?? '없음 (전역)'}
      </div>
    </div>
  );
}
