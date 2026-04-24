import { DiagramFrame } from './primitives';

type Tool = {
  name: string;
  description: string;
  selected?: boolean;
};

const TOOLS: Tool[] = [
  { name: 'Read', description: '파일 읽기' },
  { name: 'Bash', description: '셸 명령 실행' },
  { name: 'WebSearch', description: '웹 검색' },
  { name: 'screenshot', description: '현재 탭 스크린샷 (Claude in Chrome)' },
  {
    name: 'get-weather',
    description: '도시 이름으로 현재 날씨를 조회합니다',
    selected: true,
  },
];

export function ToolSelectionByDescription() {
  return (
    <DiagramFrame>
      <div className="flex flex-col items-center gap-3">
        {/* User query */}
        <div
          className="rounded-full border px-4 py-2 text-[13px]"
          style={{
            backgroundColor: 'var(--diagram-bg-card)',
            borderColor: 'var(--diagram-border-strong)',
            color: 'var(--diagram-text)',
          }}
        >
          사용자 질문: &quot;서울 날씨 어때?&quot;
        </div>

        <DownArrow label="각 Tool 의 description 을 비교" />

        {/* Tool list */}
        <section
          className="w-full rounded-lg border p-4 flex flex-col gap-2"
          style={{
            backgroundColor: 'var(--diagram-bg-card)',
            borderColor: 'var(--diagram-border-strong)',
          }}
        >
          <header
            className="text-[11px] tracking-wide uppercase pb-1"
            style={{ color: 'var(--diagram-text-muted)' }}
          >
            Claude 가 쓸 수 있는 Tool (내장 + MCP)
          </header>
          {TOOLS.map((tool) => (
            <ToolRow key={tool.name} tool={tool} />
          ))}
        </section>

        <DownArrow label="description 매칭 → 호출" accent />

        {/* Tool call result */}
        <div
          className="rounded-md border px-3 py-2 text-[12px]"
          style={{
            backgroundColor: 'var(--diagram-primary-soft)',
            borderColor: 'var(--diagram-primary)',
            color: 'var(--diagram-primary)',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          get-weather({'{'} city: &quot;Seoul&quot; {'}'})
        </div>
      </div>
      <figcaption
        className="mt-6 pt-4 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        Tool 은 이름이 아니라{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          description
        </span>
        {' '}으로 매칭됩니다 — 내가 만든 Tool 도 같은 목록에서 함께 경쟁합니다
      </figcaption>
    </DiagramFrame>
  );
}

function ToolRow({ tool }: { tool: Tool }) {
  const { name, description, selected } = tool;
  return (
    <div
      className="flex items-center gap-3 rounded-md border px-3 py-2"
      style={{
        backgroundColor: selected
          ? 'var(--diagram-primary-soft)'
          : 'var(--diagram-bg-card)',
        borderColor: selected
          ? 'var(--diagram-primary)'
          : 'var(--diagram-border)',
        borderWidth: selected ? 1.5 : 1,
      }}
    >
      <span
        className="text-[12px] font-semibold min-w-[120px]"
        style={{
          color: selected
            ? 'var(--diagram-primary)'
            : 'var(--diagram-text-muted)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {name}
      </span>
      <span
        className="text-[11px] flex-1 leading-snug"
        style={{
          color: selected ? 'var(--diagram-text)' : 'var(--diagram-text-muted)',
        }}
      >
        &quot;{description}&quot;
      </span>
      {selected && (
        <span
          className="text-[10px] font-semibold whitespace-nowrap"
          style={{ color: 'var(--diagram-primary)' }}
        >
          ← 매칭
        </span>
      )}
    </div>
  );
}

function DownArrow({ label, accent }: { label: string; accent?: boolean }) {
  const color = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-text-muted)';
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="text-[11px]" style={{ color }}>
        {label}
      </span>
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
        <path
          d="M7 2v11m-4-4l4 4 4-4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
