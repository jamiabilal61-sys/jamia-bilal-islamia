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
