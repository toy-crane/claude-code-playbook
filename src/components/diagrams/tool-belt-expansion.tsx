import { DiagramFrame } from './primitives';

type ToolGroup = {
  label: string;
  variant: 'builtin' | 'mcp';
  tools: string[];
};

const BUILTIN_TOOLS = [
  'Read',
  'Write',
  'Edit',
  'Bash',
  'Grep',
  'Glob',
  'WebFetch',
  'WebSearch',
];
const CHROME_TOOLS = [
  'list_tabs',
  'open_url',
  'click',
  'type',
  'read_console',
  'screenshot',
];
const FIGMA_TOOLS = [
  'write_to_canvas',
  'extract_design_context',
  'get_design_tokens',
];

export function ToolBeltExpansion() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.3fr] gap-4 md:gap-5 items-start">
        <BeltCard
          title="MCP 없이"
          subtitle="내장 Tool 만"
          totalCount={BUILTIN_TOOLS.length}
          groups={[
            { label: '내장 Tool', variant: 'builtin', tools: BUILTIN_TOOLS },
          ]}
        />

        <CommandArrow />

        <BeltCard
          title="MCP 를 꽂으면"
          subtitle="내장 + MCP Tool"
          totalCount={
            BUILTIN_TOOLS.length + CHROME_TOOLS.length + FIGMA_TOOLS.length
          }
          highlighted
          groups={[
            { label: '내장 Tool', variant: 'builtin', tools: BUILTIN_TOOLS },
            {
              label: '+ Claude in Chrome',
              variant: 'mcp',
              tools: CHROME_TOOLS,
            },
            { label: '+ Figma MCP', variant: 'mcp', tools: FIGMA_TOOLS },
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
        MCP 를 꽂을 때마다 Claude 가 쓸 수 있는{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Tool 이 늘어납니다
        </span>
      </figcaption>
    </DiagramFrame>
  );
}

function BeltCard({
  title,
  subtitle,
  groups,
  totalCount,
  highlighted,
}: {
  title: string;
  subtitle: string;
  groups: ToolGroup[];
  totalCount: number;
  highlighted?: boolean;
}) {
  return (
    <section
      className="rounded-lg border p-4 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: highlighted
          ? 'var(--diagram-primary)'
          : 'var(--diagram-border-strong)',
        borderWidth: highlighted ? 1.5 : 1,
      }}
    >
      <header className="flex flex-col gap-0.5">
        <span
          className="text-[11px] tracking-wide uppercase"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {subtitle}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className="text-sm font-bold m-0"
            style={{
              color: highlighted
                ? 'var(--diagram-primary)'
                : 'var(--diagram-text)',
            }}
          >
            {title}
          </h3>
          <span
            className="text-[11px] font-semibold whitespace-nowrap"
            style={{
              color: highlighted
                ? 'var(--diagram-primary)'
                : 'var(--diagram-text-muted)',
            }}
          >
            Tool {totalCount} 개
          </span>
        </div>
      </header>

      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <span
            className="text-[10px] font-semibold tracking-wide"
            style={{
              color:
                group.variant === 'mcp'
                  ? 'var(--diagram-primary)'
                  : 'var(--diagram-text-muted)',
            }}
          >
            {group.label}
          </span>
          <div className="flex flex-wrap gap-1">
            {group.tools.map((t) => (
              <ToolChip key={t} label={t} variant={group.variant} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ToolChip({
  label,
  variant,
}: {
  label: string;
  variant: 'builtin' | 'mcp';
}) {
  const isMcp = variant === 'mcp';
  return (
    <span
      className="rounded-md border px-2 py-0.5 text-[10.5px] whitespace-nowrap"
      style={{
        backgroundColor: isMcp
          ? 'var(--diagram-primary-soft)'
          : 'var(--diagram-bg-card)',
        borderColor: isMcp
          ? 'var(--diagram-primary)'
          : 'var(--diagram-border)',
        color: isMcp
          ? 'var(--diagram-primary)'
          : 'var(--diagram-text-muted)',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      {label}
    </span>
  );
}

function CommandArrow() {
  return (
    <div
      className="hidden md:flex flex-col items-center justify-center gap-2 py-4"
      aria-hidden
    >
      <CommandCode label="claude --chrome" />
      <span className="text-[11px]" style={{ color: 'var(--diagram-text-muted)' }}>
        +
      </span>
      <CommandCode label="claude mcp add figma" />
      <svg
        width="28"
        height="20"
        viewBox="0 0 28 20"
        fill="none"
        style={{ color: 'var(--diagram-primary)', marginTop: 4 }}
      >
        <path
          d="M2 10h22M18 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CommandCode({ label }: { label: string }) {
  return (
    <code
      className="rounded border px-2 py-0.5 text-[11px]"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-primary)',
        color: 'var(--diagram-primary)',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      {label}
    </code>
  );
}
