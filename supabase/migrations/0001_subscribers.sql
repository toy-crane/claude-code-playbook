create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'landing',
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create unique index if not exists subscribers_email_unique
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;
