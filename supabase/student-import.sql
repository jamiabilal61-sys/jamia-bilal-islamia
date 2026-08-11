create extension if not exists pgcrypto;
create table if not exists public.student_import_logs (
 id uuid primary key default gen_random_uuid(), file_name text not null, total_rows integer not null default 0,
 imported_rows integer not null default 0, skipped_rows integer not null default 0, imported_by text,
 created_at timestamptz not null default now()
);
alter table public.student_import_logs enable row level security;
revoke all on public.student_import_logs from anon, authenticated;
