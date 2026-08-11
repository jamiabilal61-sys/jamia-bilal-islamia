-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
alter table public.faculty_members add column if not exists employee_number text;
alter table public.faculty_members add column if not exists designation text not null default 'استاد';
alter table public.faculty_members add column if not exists joining_date date;
alter table public.faculty_members add column if not exists basic_salary numeric(12,2) not null default 0 check (basic_salary >= 0);
alter table public.faculty_members add column if not exists bank_details text;
create unique index if not exists faculty_employee_number_unique on public.faculty_members(employee_number) where employee_number is not null;

create table if not exists public.employee_attendance (
 id uuid primary key default gen_random_uuid(), employee_id uuid not null references public.faculty_members(id) on delete cascade,
 attendance_date date not null, status text not null check(status in ('حاضر','غیر حاضر','رخصت','نصف دن')),
 check_in time, check_out time, notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(employee_id,attendance_date)
);
create table if not exists public.employee_payroll (
 id uuid primary key default gen_random_uuid(), employee_id uuid not null references public.faculty_members(id) on delete restrict,
 payroll_month date not null, basic_salary numeric(12,2) not null default 0, working_days integer not null default 0,
 present_days numeric(6,1) not null default 0, absent_days numeric(6,1) not null default 0, leave_days numeric(6,1) not null default 0,
 attendance_deduction numeric(12,2) not null default 0, allowances numeric(12,2) not null default 0,
 other_deductions numeric(12,2) not null default 0, net_salary numeric(12,2) not null default 0,
 payment_status text not null default 'زیرِ ادائیگی' check(payment_status in ('زیرِ ادائیگی','ادا شدہ','روکا گیا')),
 paid_at date, payment_method text, reference_number text, notes text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(employee_id,payroll_month)
);
create index if not exists employee_attendance_date_idx on public.employee_attendance(attendance_date);
create index if not exists employee_payroll_month_idx on public.employee_payroll(payroll_month);
alter table public.employee_attendance enable row level security; alter table public.employee_payroll enable row level security;
revoke all on public.employee_attendance from anon, authenticated; revoke all on public.employee_payroll from anon, authenticated;
