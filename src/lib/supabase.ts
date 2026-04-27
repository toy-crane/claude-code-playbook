import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY must be set');
  }
  cached = createClient(url, secretKey, { auth: { persistSession: false } });
  return cached;
}
