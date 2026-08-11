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
