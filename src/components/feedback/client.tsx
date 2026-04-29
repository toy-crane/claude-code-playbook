'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, MessageSquare } from 'lucide-react';
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
  title,
  onSendAction,
}: {
  title: string;
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
      const feedback: PageFeedback = { url, title, message };
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
            <Button asChild size="xs">
              <a
                href={previous.response?.githubUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub에서 보기
              </a>
            </Button>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => {
                setPrevious(null);
                setIsOpen(true);
              }}
            >
              다시 보내기
            </Button>
          </div>
        </div>
      ) : isOpen ? (
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <Textarea
            autoFocus
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none"
            placeholder="오타·잘못된 설명·개선 제안 등 자유롭게 남겨주세요..."
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === 'Enter') submit(e);
            }}
          />
          <div className="flex flex-row justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsOpen(false);
                setMessage('');
              }}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              보내기
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="secondary"
          className="self-end"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare />
          피드백 남기기
        </Button>
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
