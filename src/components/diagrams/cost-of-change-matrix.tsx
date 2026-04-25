import { DiagramFrame } from './primitives';

export function CostOfChangeMatrix() {
  return (
    <DiagramFrame>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
        <HighCostBlock />
        <div
          className="hidden md:block self-stretch border-l"
          style={{ borderColor: 'var(--diagram-border-strong)' }}
          aria-hidden
        />
        <LowCostBlock />
      </div>
      <figcaption
        className="mt-6 pt-6 text-center text-xs border-t"
        style={{
          color: 'var(--diagram-text-muted)',
          borderColor: 'var(--diagram-border)',
        }}
      >
        후속 수정이 비싼 결정만 묻고,{' '}
        <span
          className="font-semibold"
          style={{ color: 'var(--diagram-primary)' }}
        >
          나머지는 기본값을 제안
        </span>
        합니다
      </figcaption>
    </DiagramFrame>
  );
}

function HighCostBlock() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-danger)' }}
        >
          변경 비용 높음
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          묻는다 — 한 번에 한 질문, 2~4 선택지
        </span>
      </header>
      <ListBlock label="분류">
        <li>권한 경계 (로그인 / 게스트 / 익명)</li>
        <li>데이터 모델 (저장 / 일회성)</li>
        <li>사용자 노출 범위</li>
        <li>외부 시스템 연결 방식</li>
      </ListBlock>
      <ListBlock label="feedme.wiki 예시">
        <li>변환 실패 시 동작 (재시도 / 에러 / 부분)</li>
        <li>외부 LLM 열기 (새 탭 / 같은 창)</li>
        <li>프리셋과 직접 입력 결합 규칙</li>
      </ListBlock>
    </section>
  );
}

function LowCostBlock() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        <h3
          className="text-base font-bold m-0"
          style={{ color: 'var(--diagram-success)' }}
        >
          변경 비용 낮음
        </h3>
        <span className="text-xs" style={{ color: 'var(--diagram-text-muted)' }}>
          기본값 — 사용자 수정 여지를 남긴다
        </span>
      </header>
      <ListBlock label="분류">
        <li>카피 문구</li>
        <li>기본 정렬 순서</li>
        <li>에러 메시지 톤</li>
        <li>입력 필드 placeholder</li>
      </ListBlock>
      <ListBlock label="feedme.wiki 예시">
        <li>프리셋 순서 (요약 / 번역 / 쉽게 설명)</li>
        <li>다크모드 기본값 (시스템 설정 따름)</li>
        <li>다운로드 파일명 패턴</li>
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
