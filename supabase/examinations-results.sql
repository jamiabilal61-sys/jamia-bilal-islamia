-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  academic_session text not null,
  exam_name text not null,
  department text not null,
  class_name text not null default '',
  exam_date date,
  status text not null default 'تیاری' check (status in ('تیاری','نتیجہ مکمل','شائع شدہ')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(academic_session, exam_name, department, class_name)
);

create table if not exists public.exam_subjects (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  subject_name text not null,
  total_marks numeric(7,2) not null check (total_marks > 0),
  passing_marks numeric(7,2) not null check (passing_marks >= 0 and passing_marks <= total_marks),
  display_order integer not null default 0,
  unique(exam_id, subject_name)
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  subject_id uuid not null references public.exam_subjects(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  obtained_marks numeric(7,2) check (obtained_marks >= 0),
  absent boolean not null default false,
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(exam_id, subject_id, student_id)
);

create index if not exists exams_session_idx on public.exams(academic_session);
create index if not exists exam_results_exam_idx on public.exam_results(exam_id);
create index if not exists exam_results_student_idx on public.exam_results(student_id);
alter table public.exams enable row level security;
alter table public.exam_subjects enable row level security;
alter table public.exam_results enable row level security;
revoke all on public.exams from anon, authenticated;
revoke all on public.exam_subjects from anon, authenticated;
revoke all on public.exam_results from anon, authenticated;
