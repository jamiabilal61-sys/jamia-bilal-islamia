create table if not exists public.system_backup_history (
  id uuid primary key default gen_random_uuid(),
  backup_name text not null,
  status text not null default 'completed',
  table_count integer not null default 0,
  row_count integer not null default 0,
  created_by text,
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.system_backup_history enable row level security;
create index if not exists system_backup_history_created_idx on public.system_backup_history(created_at desc);

-- براؤزر سے براہ راست رسائی بند رہے گی؛ صرف Server-side service key استعمال ہوگی۔
revoke all on table public.system_backup_history from anon, authenticated;
revoke all on table public.admin_audit_logs from anon, authenticated;
