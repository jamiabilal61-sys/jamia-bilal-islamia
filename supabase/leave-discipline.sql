-- جامعہ بلال: رخصت اور نظم و ضبط
create extension if not exists pgcrypto;

create table if not exists public.leave_discipline_records (
  id uuid primary key default gen_random_uuid(),
  academic_session text not null,
  person_type text not null check (person_type in ('طالب علم','استاد')),
  person_id uuid not null,
  person_name text not null,
  person_number text,
  department text,
  contact_number text,
  record_type text not null check (record_type in ('رخصت','نظم و ضبط')),
  start_date date,
  end_date date,
  return_date date,
  reason text not null,
  action_taken text,
  guardian_notified boolean not null default false,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leave_dates_valid check (end_date is null or start_date is null or end_date >= start_date)
);

create index if not exists leave_discipline_person_idx on public.leave_discipline_records(person_id, created_at desc);
create index if not exists leave_discipline_type_idx on public.leave_discipline_records(record_type, status);
alter table public.leave_discipline_records enable row level security;
-- Service-role secret استعمال کرنے والی محفوظ Admin API ہی اس جدول تک رسائی رکھتی ہے۔
