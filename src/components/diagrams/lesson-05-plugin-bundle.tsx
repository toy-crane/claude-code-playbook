import { DiagramFrame } from './primitives';

type Component = {
  kind: string;
  example: string;
};

const COMPONENTS: Component[] = [
  { kind: 'Skills', example: '/skill-creator' },
  { kind: 'Commands', example: '/skill-eval' },
  { kind: 'MCP 서버', example: 'skills-db' },
  { kind: 'Hooks', example: 'pre-save' },
];

export function Lesson05PluginBundle() {
  return (
    <DiagramFrame>
      <section className="flex flex-col items-center gap-3">
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          Plugin = 번들
        </div>
        <div
          className="w-full max-w-xl rounded-lg border-2 px-5 py-4"
          style={{
            borderColor: 'var(--diagram-primary)',
            backgroundColor: 'var(--diagram-primary-soft)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div
                className="text-sm font-semibold font-mono"
                style={{ color: 'var(--diagram-primary)' }}
              >
                skill-creator
              </div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: 'var(--diagram-text-muted)' }}
              >
                Anthropic 공식 Plugin
              </div>
            </div>
            <code
              className="text-[11px] px-2 py-1 rounded border"
              style={{
                color: 'var(--diagram-text-muted)',
                borderColor: 'var(--diagram-border)',
                backgroundColor: 'var(--diagram-bg-card)',
              }}
            >
              /plugin
            </code>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {COMPONENTS.map((c) => (
              <ComponentCard key={c.kind} kind={c.kind} example={c.example} />
            ))}
          </div>
        </div>
      </section>
      <figcaption
        className="mt-6 text-center text-xs"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        하나의 Plugin 에{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Skills · Commands · MCP · Hooks
        </span>{' '}
        가 함께 번들됩니다 (skills.sh 는 SKILL.md 파일 하나만 설치)
      </figcaption>
    </DiagramFrame>
  );
}

function ComponentCard({ kind, example }: Component) {
  return (
    <div
      className="rounded-md border px-3 py-2"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border)',
      }}
    >
      <div
        className="text-[11px] font-semibold mb-0.5"
        style={{ color: 'var(--diagram-text)' }}
      >
        {kind}
      </div>
      <code
        className="text-[10px] font-mono"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {example}
      </code>
    </div>
  );
}
