'use client';

import { useState, useTransition } from 'react';
import { FadeIn } from './fade-in';
import { subscribe } from '@/lib/actions/subscribe';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Status =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function Subscribe() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [consent, setConsent] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await subscribe({
        email: formData.get('email'),
        consent: formData.get('consent') === 'on',
        website: formData.get('website') ?? '',
      });
      if (result.ok) setStatus({ kind: 'success' });
      else setStatus({ kind: 'error', message: result.error });
    });
  }

  return (
    <section
      id="subscribe"
      className="w-full max-w-[1100px] mx-auto px-6 md:px-10 pt-20 md:pt-[80px] pb-20 md:pb-[100px] border-t border-fd-border"
    >
      <FadeIn>
        <div className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-fd-muted-foreground mb-[18px]">
          Coming Soon
        </div>
      </FadeIn>
      <FadeIn delay={80}>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[760px]">
          온라인 강의 출시 알림 받기
        </h2>
      </FadeIn>
      <FadeIn delay={160}>
        <p className="text-[15px] md:text-[17px] text-fd-muted-foreground max-w-[640px] leading-[1.6] mb-8">
          이 자료를 기반으로 한 영상 강의를 준비하고 있습니다. 출시되면 가장 먼저 알려드릴게요.
        </p>
      </FadeIn>
      <FadeIn delay={240}>
        {status.kind === 'success' ? (
          <p className="text-[15px] text-fd-foreground">
            신청이 완료되었습니다. 출시 시 메일로 알려드릴게요.
          </p>
        ) : (
          <form action={onSubmit} className="flex flex-col gap-3 max-w-[520px]">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="flex-1"
              />
              <Button type="submit" disabled={pending || !consent}>
                {pending ? '신청 중…' : '알림 신청'}
              </Button>
            </div>

            <Label
              htmlFor="subscribe-consent"
              className="text-[13px] font-normal text-fd-muted-foreground cursor-pointer"
            >
              <Checkbox
                id="subscribe-consent"
                name="consent"
                required
                checked={consent}
                onCheckedChange={(value) => setConsent(value === true)}
              />
              <span>
                <span className="text-fd-foreground/80 mr-1">(필수)</span>
                강의 출시 및 관련 소식을 이메일로 받는 데 동의합니다.
              </span>
            </Label>

            {status.kind === 'error' && (
              <p className="text-[13px] text-red-500">{status.message}</p>
            )}
          </form>
        )}
      </FadeIn>
    </section>
  );
}
