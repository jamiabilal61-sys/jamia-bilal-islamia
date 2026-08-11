-- جامعہ بلال الاسلامیہ پورٹل: مکمل Database Setup
-- نئی تنصیب پر یہ واحد فائل Supabase SQL Editor میں ایک مرتبہ چلائیں۔
-- تیار شدہ: 2026-08-07

-- ============================================================
-- base-admissions.sql
-- ============================================================
create extension if not exists pgcrypto;
create sequence if not exists public.admission_number_seq start 1001;

create table if not exists public.admissions (
  id uuid primary key default gen_random_uuid(),
  admission_number text not null unique default ('JB-' || extract(year from current_date)::text || '-' || lpad(nextval('public.admission_number_seq')::text, 5, '0')),
  student_name text not null,
  father_name text not null,
  phone text not null,
  email text,
  date_of_birth date not null,
  gender text not null check (gender in ('مرد','عورت')),
  department text not null,
  address text not null,
  student_image_url text,
  status text not null default 'زیر غور' check (status in ('زیر غور','منظور','مسترد')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.admissions enable row level security;
revoke all on table public.admissions from anon, authenticated;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('admission-documents','admission-documents',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;


-- ============================================================
-- student-management.sql
-- ============================================================
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


-- ============================================================
-- finance-attendance.sql
-- ============================================================
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


-- ============================================================
-- examinations-results.sql
-- ============================================================
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


-- ============================================================
-- faculty-timetable.sql
-- ============================================================
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


-- ============================================================
-- leave-discipline.sql
-- ============================================================
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


-- ============================================================
-- hostel-management.sql
-- ============================================================
-- جامعہ بلال: ہاسٹل، میس، گیٹ اور ملاقات کا نظام
create extension if not exists pgcrypto;
create table if not exists public.hostel_rooms(id uuid primary key default gen_random_uuid(),room_number text not null,block_name text not null default 'مرکزی ہاسٹل',capacity integer not null check(capacity>0),warden_name text,status text not null default 'فعال' check(status in('فعال','بند','مرمت')),created_at timestamptz not null default now(),unique(block_name,room_number));
create table if not exists public.hostel_allocations(id uuid primary key default gen_random_uuid(),student_id uuid not null,student_name text not null,student_number text not null,room_id uuid not null references public.hostel_rooms(id),room_number text not null,block_name text not null,bed_number text,start_date date not null,end_date date,status text not null default 'مقیم' check(status in('مقیم','کمرہ خالی')),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create unique index if not exists one_active_hostel_room_per_student on public.hostel_allocations(student_id) where status='مقیم';
create index if not exists hostel_allocation_room_idx on public.hostel_allocations(room_id,status);
create table if not exists public.hostel_gate_register(id uuid primary key default gen_random_uuid(),student_id uuid not null,student_name text not null,student_number text not null,movement_type text not null check(movement_type in('آمد','روانگی')),movement_at timestamptz not null,purpose text not null,expected_return timestamptz,actual_return timestamptz,guardian_name text,created_at timestamptz not null default now());
create index if not exists hostel_gate_student_idx on public.hostel_gate_register(student_id,movement_at desc);
create table if not exists public.hostel_visits(id uuid primary key default gen_random_uuid(),student_id uuid not null,student_name text not null,student_number text not null,visitor_name text not null,relationship text not null,visit_at timestamptz not null,contact_number text,notes text,created_at timestamptz not null default now());
create table if not exists public.hostel_mess_attendance(id uuid primary key default gen_random_uuid(),attendance_date date not null,meal text not null check(meal in('ناشتہ','دوپہر کا کھانا','رات کا کھانا')),student_id uuid not null,student_name text not null,student_number text not null,present boolean not null default true,created_at timestamptz not null default now(),unique(attendance_date,meal,student_id));
alter table public.hostel_rooms enable row level security;
alter table public.hostel_allocations enable row level security;
alter table public.hostel_gate_register enable row level security;
alter table public.hostel_visits enable row level security;
alter table public.hostel_mess_attendance enable row level security;
-- ان جدولوں تک رسائی صرف محفوظ Admin API کی service-role key سے ہوگی۔


-- ============================================================
-- parent-student-portal.sql
-- ============================================================
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


-- ============================================================
-- library-management.sql
-- ============================================================
-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.library_books (
 id uuid primary key default gen_random_uuid(), title text not null, author text not null, category text not null default 'عمومی',
 publisher text, isbn text, language text not null default 'اردو', shelf_location text, description text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.library_copies (
 id uuid primary key default gen_random_uuid(), book_id uuid not null references public.library_books(id) on delete restrict,
 accession_number text not null unique, condition text not null default 'درست', status text not null default 'دستیاب'
 check(status in ('دستیاب','جاری','گم شدہ','خراب')), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.library_loans (
 id uuid primary key default gen_random_uuid(), copy_id uuid not null references public.library_copies(id) on delete restrict,
 book_id uuid not null references public.library_books(id) on delete restrict, book_title text not null, accession_number text not null,
 borrower_type text not null check(borrower_type in ('طالب علم','استاد')), borrower_id uuid not null, borrower_name text not null, borrower_number text not null default '',
 issued_at date not null default current_date, due_date date not null, returned_at date, late_days integer not null default 0,
 fine_amount numeric(12,2) not null default 0, fine_paid boolean not null default false, return_condition text,
 status text not null default 'جاری' check(status in ('جاری','واپس','گم شدہ')), notes text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index if not exists library_one_active_loan_per_copy on public.library_loans(copy_id) where status='جاری';
create index if not exists library_books_title_idx on public.library_books(title);
create index if not exists library_loans_borrower_idx on public.library_loans(borrower_type,borrower_id);
create index if not exists library_loans_due_idx on public.library_loans(due_date) where status='جاری';
alter table public.library_books enable row level security; alter table public.library_copies enable row level security; alter table public.library_loans enable row level security;
revoke all on public.library_books from anon, authenticated; revoke all on public.library_copies from anon, authenticated; revoke all on public.library_loans from anon, authenticated;


-- ============================================================
-- employee-payroll.sql
-- ============================================================
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


-- ============================================================
-- student-documents.sql
-- ============================================================
-- Supabase SQL Editor میں یہ مکمل فائل صرف ایک مرتبہ چلائیں۔
create table if not exists public.student_document_sequences (
 year integer not null, code text not null, last_number integer not null default 0, primary key(year,code)
);
create table if not exists public.student_documents (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete restrict,
 document_type text not null check(document_type in ('شناختی کارڈ','زیرِ تعلیم سرٹیفکیٹ','کردار سرٹیفکیٹ','سندِ تکمیل','سندِ فراغت','نتیجہ تصدیق')),
 serial_number text not null unique, verification_token text not null unique, academic_session text, department text, class_name text,
 issue_reason text not null default 'اصل اجرا', issued_at date not null default current_date, valid_until date, signatory_name text not null default 'مدیر جامعہ',
 status text not null default 'فعال' check(status in ('فعال','منسوخ','گم شدہ')), cancel_reason text, remarks text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create or replace function public.next_student_document_number(p_year integer,p_code text) returns text language plpgsql security definer set search_path=public as $$
declare n integer; begin insert into student_document_sequences(year,code,last_number) values(p_year,p_code,1)
on conflict(year,code) do update set last_number=student_document_sequences.last_number+1 returning last_number into n;
if n is null then n:=1; end if; return 'JBI-'||p_code||'-'||p_year||'-'||lpad(n::text,5,'0'); end; $$;
create index if not exists student_documents_student_idx on public.student_documents(student_id);
create index if not exists student_documents_serial_idx on public.student_documents(serial_number);
alter table public.student_document_sequences enable row level security; alter table public.student_documents enable row level security;
revoke all on public.student_document_sequences from anon,authenticated; revoke all on public.student_documents from anon,authenticated;
revoke execute on function public.next_student_document_number(integer,text) from public,anon,authenticated;
grant execute on function public.next_student_document_number(integer,text) to service_role;


-- ============================================================
-- notifications-system.sql
-- ============================================================
create extension if not exists pgcrypto;

create table if not exists public.notification_templates (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null default 'عمومی',
  channel text not null check (channel in ('whatsapp','sms')), body text not null, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.notification_queue (
  id uuid primary key default gen_random_uuid(), student_id uuid references public.students(id) on delete set null,
  recipient_name text not null, recipient_phone text not null, channel text not null check (channel in ('whatsapp','sms')),
  category text not null default 'عمومی', message text not null,
  status text not null default 'pending_approval' check (status in ('pending_approval','approved','sent','failed','cancelled')),
  scheduled_at timestamptz not null default now(), approved_at timestamptz, sent_at timestamptz,
  provider_message_id text, error_message text, retry_count integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists notification_queue_status_idx on public.notification_queue(status, scheduled_at);
alter table public.notification_templates enable row level security;
alter table public.notification_queue enable row level security;

insert into public.notification_templates(title,category,channel,body)
select 'فیس کی یاددہانی','فیس یاددہانی','whatsapp','محترم سرپرست! {طالب علم} (طالب علم نمبر: {طالب علم نمبر}) کی واجب الادا فیس براہِ کرم جمع کروا دیجیے۔ شکریہ، جامعہ بلال اسلامیہ'
where not exists (select 1 from public.notification_templates where title='فیس کی یاددہانی');
insert into public.notification_templates(title,category,channel,body)
select 'غیر حاضری کی اطلاع','غیر حاضری','whatsapp','محترم سرپرست! {طالب علم} آج جامعہ میں غیر حاضر ہیں۔ براہِ کرم وجہ سے انتظامیہ کو مطلع فرمائیں۔'
where not exists (select 1 from public.notification_templates where title='غیر حاضری کی اطلاع');


-- ============================================================
-- student-import.sql
-- ============================================================
create extension if not exists pgcrypto;
create table if not exists public.student_import_logs (
 id uuid primary key default gen_random_uuid(), file_name text not null, total_rows integer not null default 0,
 imported_rows integer not null default 0, skipped_rows integer not null default 0, imported_by text,
 created_at timestamptz not null default now()
);
alter table public.student_import_logs enable row level security;
revoke all on public.student_import_logs from anon, authenticated;


-- ============================================================
-- dashboard-role-access.sql
-- ============================================================
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


-- ============================================================
-- final-system-security.sql
-- ============================================================
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

