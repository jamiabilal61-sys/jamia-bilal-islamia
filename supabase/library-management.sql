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
