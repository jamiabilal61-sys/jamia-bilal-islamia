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
