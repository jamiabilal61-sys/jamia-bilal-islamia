# آخری سکیورٹی، آڈٹ اور بیک اپ مرحلہ

1. Supabase SQL Editor میں پہلے `supabase/complete-setup.sql` چلائیں۔ نئی تنصیب میں الگ الگ SQL فائلیں چلانے کی ضرورت نہیں۔
2. `.env.local` میں `ADMIN_SESSION_SECRET` کم از کم 32 حروف کا بے ترتیب راز رکھیں۔
3. پورٹل چلانے کے بعد `/admin/system` کھولیں۔ یہاں سکیورٹی اسٹیٹس، بیک اپ اور آڈٹ لاگ دستیاب ہیں۔
4. ہفتہ وار **JSON ڈاؤن لوڈ** کرکے کمپیوٹر کے علاوہ ایک محفوظ بیرونی مقام پر بھی رکھیں۔
5. Supabase Dashboard میں دستیاب Automatic Backups بھی فعال رکھیں۔ یہ پورٹل کے اندرونی snapshot سے الگ disaster-recovery تحفظ ہے۔

احتیاط: `.env.local`، `SUPABASE_SECRET_KEY` اور `ADMIN_SESSION_SECRET` کسی ZIP، GitHub یا WhatsApp میں شیئر نہ کریں۔
