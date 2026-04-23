import type { ReactNode } from 'react';
import { DiagramFrame } from './primitives';

export function SkillAutoTrigger() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <CallPath
          header="Command"
          subtitle="수동 호출"
          input="/commit"
          inputKind="slash"
          middle={null}
          output="commit.md 로드 → 실행"
          accent={false}
        />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <CallPath
          header="Skill"
          subtitle="자동 호출"
          input="변경사항 커밋해줘"
          inputKind="natural"
          middle="Claude 가 description 매칭"
          output="Skill(commit) 로드 → 실행"
          accent
        />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        Skill 은{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          자연어 요청만으로도
        </span>{' '}
        Claude 가 스스로 꺼냅니다
      </figcaption>
    </DiagramFrame>
  );
}

type CallPathProps = {
  header: string;
  subtitle: string;
  input: string;
  inputKind: 'slash' | 'natural';
  middle: string | null;
  output: string;
  accent: boolean;
};

function CallPath({
  header,
  subtitle,
  input,
  inputKind,
  middle,
  output,
  accent,
}: CallPathProps) {
  const headerColor = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-baseline gap-2">
        <h3
          className="text-base font-bold m-0"
          style={{ color: headerColor }}
        >
          {header}
        </h3>
        <span
          className="text-xs"
          style={{ color: 'var(--diagram-text-muted)' }}
        >
          {subtitle}
        </span>
      </header>

      <InputCard kind={inputKind}>{input}</InputCard>
      <DownArrow accent={accent} />

      {middle ? (
        <>
          <JudgmentCard>{middle}</JudgmentCard>
          <DownArrow accent={accent} />
        </>
      ) : (
        <div
          className="rounded-md border border-dashed px-3 py-2 text-[11px] text-center"
          style={{
            borderColor: 'var(--diagram-border)',
            color: 'var(--diagram-text-muted)',
          }}
        >
          판단 단계 없음
        </div>
      )}

      <OutputCard accent={accent}>{output}</OutputCard>
    </section>
  );
}

function InputCard({
  kind,
  children,
}: {
  kind: 'slash' | 'natural';
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-md border px-3 py-2.5 text-xs"
      style={{
        backgroundColor: 'var(--diagram-bg-card)',
        borderColor: 'var(--diagram-border)',
      }}
    >
      <div
        className="uppercase tracking-wider text-[10px] mb-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {kind === 'slash' ? '사용자 입력 (슬래시)' : '사용자 입력 (자연어)'}
      </div>
      <code
        className="font-mono"
        style={{ color: 'var(--diagram-text)' }}
      >
        {kind === 'natural' ? `"${children}"` : children}
      </code>
    </div>
  );
}

function JudgmentCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-md border px-3 py-2.5 text-xs"
      style={{
        backgroundColor: 'var(--diagram-primary-soft)',
        borderColor: 'var(--diagram-primary)',
      }}
    >
      <div
        className="uppercase tracking-wider text-[10px] mb-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        Claude 내부 판단
      </div>
      <div style={{ color: 'var(--diagram-text)' }}>{children}</div>
    </div>
  );
}

function OutputCard({
  accent,
  children,
}: {
  accent: boolean;
  children: ReactNode;
}) {
  const bg = accent
    ? 'var(--diagram-primary-soft)'
    : 'var(--diagram-bg-card)';
  const border = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-border-strong)';
  const color = accent ? 'var(--diagram-primary)' : 'var(--diagram-text)';
  return (
    <div
      className="rounded-md border px-3 py-2.5 text-xs font-medium"
      style={{
        backgroundColor: bg,
        borderColor: border,
        color,
      }}
    >
      <div
        className="uppercase tracking-wider text-[10px] mb-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        결과
      </div>
      {children}
    </div>
  );
}

function DownArrow({ accent }: { accent: boolean }) {
  const color = accent
    ? 'var(--diagram-primary)'
    : 'var(--diagram-text-muted)';
  return (
    <div
      className="flex items-center justify-center"
      style={{ color }}
      aria-hidden
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 3v10m-4-4l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
