import Link from 'next/link';
import { COURSE } from '../_data';
import { FadeIn } from './fade-in';
import { ExternalArrow } from './external-arrow';

export function Hero() {
  return (
    <section className="max-w-[1100px] px-6 md:px-10 pt-20 md:pt-[120px] pb-20 md:pb-[100px]">
      <FadeIn>
        <div className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-fd-muted-foreground mb-7">
          2026 · 실전 가이드
        </div>
      </FadeIn>
      <FadeIn delay={80}>
        <h1 className="text-[clamp(40px,7vw,84px)] font-extrabold leading-[1.04] tracking-[-0.025em] mb-6 max-w-[920px]">
          Claude Code,
          <br />
          제대로 배우기
        </h1>
      </FadeIn>
      <FadeIn delay={160}>
        <p className="text-lg md:text-[22px] leading-[1.5] text-fd-muted-foreground max-w-[640px] mb-10">
          손으로 익히는 Claude Code 실전 가이드. Claude Code를 써본 적은 있지만, 제대로 못 쓰고 있다고 느끼는 개발자를 위한 가이드입니다.
        </p>
      </FadeIn>
      <FadeIn delay={240}>
        <div className="flex gap-3.5 flex-wrap items-center">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-[15px] font-semibold bg-fd-primary text-fd-primary-foreground hover:opacity-80 transition-opacity"
          >
            Chapter 01부터 읽기
            <ExternalArrow size={14} />
          </Link>
          <span className="text-[13px] text-fd-muted-foreground font-mono">
            docs.claude-hunt.com · {COURSE.meta.chapters}개 챕터 · 무료 공개
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
