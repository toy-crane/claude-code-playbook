import { PILLARS } from '../_data';
import { FadeIn } from './fade-in';

export function Pillars() {
  return (
    <section
      id="about"
      className="w-full max-w-[1100px] mx-auto px-6 md:px-10 pt-20 md:pt-[80px] pb-20 md:pb-[100px] border-t border-fd-border"
    >
      <FadeIn>
        <div className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-fd-muted-foreground mb-[18px]">
          이 강의가 다루는 것
        </div>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[760px]">
          Claude Code를 왜 써야 하는지부터,
          <br />
          어떻게 배워야 제대로 배우는지까지.
        </h2>
        <p className="text-[15px] md:text-[17px] text-fd-muted-foreground max-w-[640px] leading-[1.6]">
          단순 사용법이 아닙니다. 도구의 동작 원리부터 손에 익혀, 실전 워크플로우를 한 번 끝까지 완주하는 강의입니다.
        </p>
      </FadeIn>

      <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-fd-border border border-fd-border rounded-lg overflow-hidden">
        {PILLARS.map((p, i) => (
          <FadeIn
            key={p.n}
            delay={i * 100}
            className="bg-fd-background px-7 pt-8 pb-9"
          >
            <div className="font-mono text-xs text-fd-muted-foreground tracking-[0.18em] uppercase mb-[18px] flex gap-2.5 items-center">
              <span>{p.n}</span>
              <span className="w-6 h-px bg-fd-border" />
              <span>{p.label}</span>
            </div>
            <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.01em] mb-3.5">
              {p.title}
            </h3>
            <p className="text-[14.5px] text-fd-muted-foreground leading-[1.65]">
              {p.body}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
