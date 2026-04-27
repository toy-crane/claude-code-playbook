'use server';

import { z } from 'zod/mini';
import { getSupabaseAdmin } from '@/lib/supabase';

const SubscribeSchema = z.object({
  email: z.email(),
  consent: z.literal(true),
  website: z.optional(z.string()),
});

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; code?: 'duplicate' | 'invalid' | 'unknown' };

export async function subscribe(input: unknown): Promise<SubscribeResult> {
  const parsed = SubscribeSchema.safeParse(input);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    let error = '입력이 올바르지 않습니다.';
    if (field === 'email') error = '올바른 이메일 형식이 아닙니다.';
    else if (field === 'consent') error = '수신 동의가 필요합니다.';
    return { ok: false, error, code: 'invalid' };
  }

  if (parsed.data.website) {
    return { ok: true };
  }

  const { error } = await getSupabaseAdmin()
    .from('subscribers')
    .insert({ email: parsed.data.email.toLowerCase(), source: 'landing' });

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: '이미 구독 중인 이메일입니다.', code: 'duplicate' };
    }
    return { ok: false, error: '잠시 후 다시 시도해주세요.', code: 'unknown' };
  }

  return { ok: true };
}
