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
