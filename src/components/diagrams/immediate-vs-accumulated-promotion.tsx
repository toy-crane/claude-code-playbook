import { DiagramFrame } from './primitives';

export function ImmediateVsAccumulatedPromotion() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <ImmediateBlock />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <AccumulatedBlock />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        강한 신호는{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-success)' }}
        >
          한 사이클 안에서 즉시 승격
        </span>
        , 약한 신호는{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-warning)' }}
        >
          여러 사이클 누적 후 승격
        </span>
        됩니다
      </figcaption>
    </DiagramFrame>
  );
}

function ImmediateBlock() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-success)' }}
        >
          즉시 승격
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          강한 신호 — 1 사이클 안에서 처리
        </span>
      </header>
      <ListBlock label="언제">
        <li>/execute-plan Step 6 (구현 도중 발견)</li>
      </ListBlock>
      <ListBlock label="applied 상태">
        <li>rule (즉시 적용)</li>
      </ListBlock>
      <ListBlock label="예시">
        <li>같은 에러를 두 번 만남</li>
        <li>plan에 빠진 규약을 발견</li>
        <li>명백한 보안·데이터 손실 위험</li>
      </ListBlock>
    </section>
  );
}

function AccumulatedBlock() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-warning)' }}
        >
          누적 회고
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          약한 신호 — 여러 사이클 누적 후
        </span>
      </header>
      <ListBlock label="언제">
        <li>/self-improve (3~5 사이클 누적 후)</li>
      </ListBlock>
      <ListBlock label="applied 상태">
        <li>not-yet (누적 대기) → rule (승격 후)</li>
      </ListBlock>
      <ListBlock label="예시">
        <li>PR마다 반복되는 코드 톤 지적</li>
        <li>매번 재발견되는 디렉터리 패턴</li>
        <li>여러 feature에서 반복된 우회</li>
      </ListBlock>
    </section>
  );
}

function ListBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="text-xs font-semibold m-0 mb-1"
        style={{ color: 'var(--diagram-text-muted)' }}
      >
        {label}
      </p>
      <ul
        className="list-disc list-inside text-xs space-y-1 m-0"
        style={{ color: 'var(--diagram-text)' }}
      >
        {children}
      </ul>
    </div>
  );
}
