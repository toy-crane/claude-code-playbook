import { DiagramFrame } from './primitives';

export function ToolDefinitionAnatomy() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnatomyCard
          index="①"
          label="Tool 이름"
          codeLabel={`"get-weather"`}
          description="Claude 가 이 도구를 식별하는 ID"
          note="동사 + 명사 형태로 명확하게"
        />
        <AnatomyCard
          index="②"
          label="설정 객체"
          codeLabel="{ description, inputSchema }"
          description="Claude 의 선택 근거와 입력 계약"
          note="description 이 가장 중요"
        />
        <AnatomyCard
          index="③"
          label="실행 함수"
          codeLabel="async ({ city }) => { ... }"
          description="실제 API 호출 · 데이터 가공"
          note={`{ content: [...] } 표준 형식 반환`}
        />
      </div>
      <figcaption
        className="mt-6 pt-4 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        <code
          className="px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: 'var(--diagram-primary-soft)',
            color: 'var(--diagram-primary)',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '11px',
          }}
        >
          server.registerTool()
        </code>
        {' '}의 세 인자가{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          Tool 의 품질
        </span>
        을 결정합니다
      </figcaption>
    </DiagramFrame>
  );
}

function AnatomyCard({
  index,
  label,
  codeLabel,
  description,
  note,
}: {
  index: string;
  label: string;
  codeLabel: string;
  description: string;
  note: string;
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
          {label}
        </h3>
      </div>
      <div
        className="rounded border px-2 py-1.5 text-[11px] leading-snug break-words"
        style={{
          backgroundColor: 'var(--diagram-primary-soft)',
          borderColor: 'var(--diagram-primary)',
          color: 'var(--diagram-primary)',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {codeLabel}
      </div>
      <p className="text-xs m-0 leading-snug" style={{ color: 'var(--diagram-text)' }}>
        {description}
      </p>
      <p
        className="text-[11px] m-0 leading-snug"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {note}
      </p>
    </section>
  );
}
