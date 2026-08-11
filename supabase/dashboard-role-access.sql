create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  full_name text not null,
  role text not null check (role in ('super_admin','manager','accountant','teacher','warden','librarian','clerk','custom')),
  permissions text[] not null default '{}',
  password_hash text not null,
  password_salt text not null,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id bigint generated always as identity primary key,
  admin_user_id uuid references public.admin_users(id) on delete set null,
  username text not null,
  action text not null,
  module text not null,
  record_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.admin_audit_logs enable row level security;

create index if not exists admin_audit_logs_created_idx on public.admin_audit_logs(created_at desc);
create index if not exists admin_audit_logs_user_idx on public.admin_audit_logs(admin_user_id);
