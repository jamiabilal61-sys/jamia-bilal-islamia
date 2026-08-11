-- جامعہ بلال: والدین و طالب علم پورٹل (ایک مرتبہ چلائیں)
create extension if not exists pgcrypto;

create table if not exists public.portal_accounts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references public.students(id) on delete cascade,
  username text not null unique,
  password_hash text not null,
  account_type text not null default 'والدین' check (account_type in ('والدین','طالب علم','مشترکہ')),
  guardian_name text,
  guardian_phone text,
  status text not null default 'فعال' check (status in ('فعال','غیر فعال')),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portal_notices (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  title text not null,
  message text not null,
  notice_type text not null default 'عمومی',
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists portal_notices_student_idx on public.portal_notices(student_id, published_at desc);
alter table public.portal_accounts enable row level security;
alter table public.portal_notices enable row level security;
revoke all on public.portal_accounts from anon, authenticated;
revoke all on public.portal_notices from anon, authenticated;

-- رسائی صرف Server-side Service Role API کے ذریعے ہوگی۔
