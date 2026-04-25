import type { ReactNode } from 'react';
import { FadeIn } from './fade-in';

export function Projects() {
  return (
    <section
      id="projects"
      className="w-full max-w-[var(--fd-layout-width,100rem)] mx-auto px-4 md:px-6 pt-20 md:pt-[80px] pb-20 md:pb-[100px] border-t border-fd-border"
    >
      <div className="max-w-[1100px]">
      <FadeIn>
        <div className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-fd-muted-foreground mb-[18px]">
          강의를 끝내면
        </div>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[760px]">
          함께 한 번, 혼자 한 번.
          <br />
          두 프로젝트를 완성합니다.
        </h2>
        <p className="text-[15px] md:text-[17px] text-fd-muted-foreground max-w-[640px] leading-[1.6]">
          실제 서비스 하나를 가이드를 따라 끝까지 만들어보고, 그 다음에는 원하는 주제로 설계부터 배포까지 직접 완성합니다.
        </p>
      </FadeIn>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn>
          <ProjectCard
            n="01"
            tag="가이드 프로젝트"
            title="feedme.wiki 클론"
            chips={['Plan Mode', 'Skills', 'MCP', 'Custom Agent', '배포']}
            placeholder={false}
          >
            URL을 붙여 넣으면 본문을 Markdown으로 변환하는 서비스. 강의에서 배운 도구를 실제 서비스 하나에 적용해보며 AI 협업 워크플로우를 체득합니다.
          </ProjectCard>
        </FadeIn>
        <FadeIn delay={100}>
          <ProjectCard
            n="02"
            tag="자유 프로젝트"
            title="개인 프로젝트"
            chips={['Spec Driven', 'Agent Teams', 'Claude Hunt 등록']}
            placeholder
          >
            이번엔 가이드 없이. 원하는 주제로 SDD를 활용해 설계부터 배포까지. 마지막 날{' '}
            <a
              href="https://claude-hunt.com"
              target="_blank"
              rel="noreferrer"
              className="text-fd-foreground underline underline-offset-[3px]"
            >
              Claude Hunt
            </a>
            에 올려 수강생 투표로 1·2·3등을 가립니다.
          </ProjectCard>
        </FadeIn>
      </div>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  n: string;
  tag: string;
  title: string;
  chips: string[];
  placeholder: boolean;
  children: ReactNode;
};

function ProjectCard({ n, tag, title, chips, placeholder, children }: ProjectCardProps) {
  return (
    <div className="border border-fd-border rounded-[10px] bg-fd-background pt-8 px-7 pb-7 flex flex-col gap-5 h-full">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs text-fd-muted-foreground tracking-[0.18em] uppercase">
          {n}
        </span>
        <span className="w-6 h-px bg-fd-border" />
        <span className="font-mono text-xs text-fd-muted-foreground tracking-[0.18em] uppercase">
          {tag}
        </span>
      </div>

      <div
        className={`h-[200px] rounded-lg flex items-center justify-center text-fd-muted-foreground text-[13px] font-mono text-center px-6 ${
          placeholder
            ? 'border-[1.5px] border-dashed border-fd-border bg-transparent'
            : 'border border-fd-border bg-fd-secondary'
        }`}
      >
        {placeholder ? <span>직접 만들 프로젝트</span> : <BrowserMock />}
      </div>

      <div>
        <h3 className="text-2xl font-bold leading-[1.2] tracking-[-0.01em] mb-2.5">
          {title}
        </h3>
        <p className="text-[14.5px] text-fd-muted-foreground leading-[1.65]">
          {children}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {chips.map((c) => (
          <span
            key={c}
            className="text-[11.5px] font-mono px-2.5 py-1 rounded bg-fd-secondary border border-fd-border text-fd-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="w-full max-w-[360px] rounded-md overflow-hidden border border-fd-border bg-fd-background text-left">
      <div className="flex items-center gap-1.5 px-2.5 py-[7px] border-b border-fd-border">
        <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-2.5 text-[10.5px] text-fd-muted-foreground font-mono">
          feedme.wiki/?url=…
        </span>
      </div>
      <div className="px-3.5 pt-3.5 pb-4 flex flex-col gap-1.5">
        <div className="h-2 w-[70%] rounded-sm bg-fd-border" />
        <div className="h-[5px] w-[92%] rounded-sm bg-fd-secondary" />
        <div className="h-[5px] w-[88%] rounded-sm bg-fd-secondary" />
        <div className="h-[5px] w-[60%] rounded-sm bg-fd-secondary" />
        <div className="h-[5px] w-[94%] rounded-sm bg-fd-secondary mt-1" />
        <div className="h-[5px] w-[76%] rounded-sm bg-fd-secondary" />
      </div>
    </div>
  );
}
