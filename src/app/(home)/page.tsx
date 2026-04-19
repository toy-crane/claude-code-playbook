import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 px-4 py-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Claude Code 강의</h1>
      <p className="text-fd-muted-foreground mb-2">
        개발자를 위한 Agentic 코딩 워크샵
      </p>
      <p className="text-fd-muted-foreground mb-8 max-w-2xl mx-auto">
        LLM 기초부터 Context 관리, Plan/Task 시스템, MCP 개발까지 실습 중심으로 배우는 Claude Code 완전 가이드
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/docs"
          className="inline-flex items-center px-6 py-3 rounded-md bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          강의 시작하기
        </Link>
        <Link
          href="/docs/prerequisites"
          className="inline-flex items-center px-6 py-3 rounded-md border border-fd-border font-medium hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          사전 준비사항
        </Link>
      </div>
    </div>
  );
}
