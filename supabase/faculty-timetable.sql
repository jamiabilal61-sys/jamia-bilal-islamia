-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.faculty_members (
 id uuid primary key default gen_random_uuid(), teacher_name text not null, father_name text not null default '', phone text not null default '',
 qualification text not null default '', specialization text not null default '', teachable_subjects text[] not null default '{}',
 available_days integer[] not null default '{1,2,3,4,5,6}', max_periods_daily integer not null default 5 check(max_periods_daily between 1 and 10),
 max_periods_weekly integer not null default 24 check(max_periods_weekly between 1 and 60), employment_type text not null default 'کل وقتی',
 status text not null default 'فعال' check(status in ('فعال','غیر فعال','رخصت')), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.teaching_requirements (
 id uuid primary key default gen_random_uuid(), academic_session text not null, department text not null, class_name text not null, subject_name text not null,
 weekly_periods integer not null check(weekly_periods between 1 and 20), preferred_teacher_id uuid references public.faculty_members(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(academic_session,department,class_name,subject_name)
);
create table if not exists public.timetable_periods (
 id uuid primary key default gen_random_uuid(), academic_session text not null, department text not null, class_name text not null, subject_name text not null,
 teacher_id uuid not null references public.faculty_members(id) on delete restrict, day_number integer not null check(day_number between 1 and 6),
 period_number integer not null check(period_number between 1 and 10), created_at timestamptz not null default now(),
 unique(academic_session,department,class_name,day_number,period_number), unique(academic_session,teacher_id,day_number,period_number)
);
create index if not exists faculty_status_idx on public.faculty_members(status);
create index if not exists timetable_session_idx on public.timetable_periods(academic_session);
alter table public.faculty_members enable row level security; alter table public.teaching_requirements enable row level security; alter table public.timetable_periods enable row level security;
revoke all on public.faculty_members from anon, authenticated; revoke all on public.teaching_requirements from anon, authenticated; revoke all on public.timetable_periods from anon, authenticated;
