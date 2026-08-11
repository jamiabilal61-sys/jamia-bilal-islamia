-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  admission_id uuid unique references public.admissions(id) on delete set null,
  student_number text unique not null,
  student_name text not null,
  father_name text not null,
  phone text,
  email text,
  date_of_birth date,
  gender text,
  address text,
  student_image_url text,
  current_department text not null,
  student_status text not null default 'فعال' check (student_status in ('فعال','غیر فعال','فارغ التحصیل','اخراج')),
  joined_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  academic_session text not null,
  department text not null,
  class_name text,
  roll_number text,
  teacher_name text,
  hostel_status text default 'غیر رہائشی',
  room_number text,
  session_status text not null default 'جاری' check (session_status in ('جاری','کامیاب','دہرائی','مکمل','منسوخ')),
  card_issued_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, academic_session)
);

create index if not exists students_name_idx on public.students(student_name);
create index if not exists students_department_idx on public.students(current_department);
create index if not exists student_sessions_student_idx on public.student_sessions(student_id);
alter table public.students enable row level security;
alter table public.student_sessions enable row level security;

-- Browser سے براہ راست رسائی بند رہے گی؛ portal کا Service Role server پر کام کرے گا۔
revoke all on public.students from anon, authenticated;
revoke all on public.student_sessions from anon, authenticated;
