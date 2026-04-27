'use client';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import {
  type SyntheticEvent,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from 'react';
import {
  actionResponse,
  pageFeedback,
  type ActionResponse,
  type PageFeedback,
} from './schema';
import { z } from 'zod/mini';
import { usePathname } from 'fumadocs-core/framework';

const pageFeedbackResult = z.extend(pageFeedback, {
  response: actionResponse,
});

/**
 * A feedback component to be attached at the end of page
 */
export function Feedback({
  onSendAction,
}: {
  onSendAction: (feedback: PageFeedback) => Promise<ActionResponse>;
}) {
  const url = usePathname();
  const { previous, setPrevious } = useSubmissionStorage(url, (v) => {
    const result = pageFeedbackResult.safeParse(v);
    return result.success ? result.data : null;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function submit(e?: SyntheticEvent) {
    startTransition(async () => {
      const feedback: PageFeedback = { url, message };
      const response = await onSendAction(feedback);
      setPrevious({ response, ...feedback });
      setMessage('');
      setIsOpen(false);
    });

    e?.preventDefault();
  }

  return (
    <section className="mt-12 pt-6 border-t flex flex-col gap-3">
      {previous ? (
        <div className="px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl">
          <p>피드백을 주셔서 감사합니다!</p>
          <div className="flex flex-row items-center gap-2">
            <a
              href={previous.response?.githubUrl}
              rel="noreferrer noopener"
              target="_blank"
              className={cn(buttonVariants({ variant: 'default' }), 'text-xs')}
            >
              GitHub에서 보기
            </a>
            <button
              className={cn(buttonVariants({ variant: 'secondary' }), 'text-xs')}
              onClick={() => {
                setPrevious(null);
                setIsOpen(true);
              }}
            >
              다시 보내기
            </button>
          </div>
        </div>
      ) : isOpen ? (
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <textarea
            autoFocus
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-none focus-visible:outline-none placeholder:text-fd-muted-foreground"
            placeholder="오타·잘못된 설명·개선 제안 등 자유롭게 남겨주세요..."
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === 'Enter') submit(e);
            }}
          />
          <div className="flex flex-row justify-end gap-2">
            <button
              type="button"
              className={cn(buttonVariants({ variant: 'secondary' }), 'px-3')}
              onClick={() => {
                setIsOpen(false);
                setMessage('');
              }}
            >
              취소
            </button>
            <button
              type="submit"
              className={cn(buttonVariants({ variant: 'default' }), 'px-3')}
              disabled={isPending}
            >
              보내기
            </button>
          </div>
        </form>
      ) : (
        <button
          className={cn(buttonVariants({ variant: 'secondary' }), 'self-end gap-2 px-4')}
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="size-4" />
          피드백 남기기
        </button>
      )}
    </section>
  );
}

function useSubmissionStorage<Result>(blockId: string, validate: (v: unknown) => Result | null) {
  const storageKey = `docs-feedback-${blockId}`;
  const [value, setValue] = useState<Result | null>(null);
  const validateCallback = useEffectEvent(validate);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);
    if (item === null) return;
    const validated = validateCallback(JSON.parse(item));

    if (validated !== null) setValue(validated);
  }, [storageKey]);

  return {
    previous: value,
    setPrevious(result: Result | null) {
      if (result) localStorage.setItem(storageKey, JSON.stringify(result));
      else localStorage.removeItem(storageKey);

      setValue(result);
    },
  };
}
