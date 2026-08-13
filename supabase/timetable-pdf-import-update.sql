-- اصل PDF میں بعض مشترکہ/متبادل اساتذہ ایک ہی وقت میں دو جماعتوں کے ساتھ درج ہیں۔
-- کلاس کا ایک slot منفرد رہے گا، مگر teacher slot پر سخت پابندی ہٹائی جارہی ہے تاکہ اصل جدول جوں کا توں محفوظ ہو۔
alter table public.timetable_periods
  drop constraint if exists timetable_periods_academic_session_teacher_id_day_number_period_number_key;

create index if not exists timetable_teacher_schedule_idx
  on public.timetable_periods(academic_session, teacher_id, day_number, period_number);
