-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.student_fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  academic_session text not null,
  fee_month text not null check (fee_month ~ '^\d{4}-\d{2}$'),
  fee_type text not null default 'ماہانہ فیس',
  amount_due numeric(12,2) not null default 0 check (amount_due >= 0),
  amount_paid numeric(12,2) not null default 0 check (amount_paid >= 0),
  payment_method text,
  paid_at timestamptz,
  receipt_number text unique,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, academic_session, fee_month, fee_type)
);

create table if not exists public.student_attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  academic_session text not null,
  attendance_date date not null,
  attendance_status text not null default 'حاضر' check (attendance_status in ('حاضر','غیر حاضر','رخصت','تاخیر')),
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, attendance_date)
);

create index if not exists student_fees_student_month_idx on public.student_fees(student_id, fee_month);
create index if not exists student_attendance_date_idx on public.student_attendance(attendance_date);
create index if not exists student_attendance_student_idx on public.student_attendance(student_id);
alter table public.student_fees enable row level security;
alter table public.student_attendance enable row level security;
revoke all on public.student_fees from anon, authenticated;
revoke all on public.student_attendance from anon, authenticated;
