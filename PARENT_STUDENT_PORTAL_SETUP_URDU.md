# والدین اور طالب علم پورٹل — تنصیب

1. Supabase کے SQL Editor میں `supabase/parent-student-portal.sql` مکمل چلائیں۔
2. `.env.local` میں ایک لمبی خفیہ کلید شامل کریں:

```env
PORTAL_SESSION_SECRET=اپنی-کم-از-کم-32-حروف-کی-خفیہ-کلید
```

3. سرور دوبارہ چلائیں:

```powershell
npm.cmd install
npm.cmd run dev -- --webpack -p 3001
```

4. ایڈمن اکاؤنٹ مینجمنٹ: `http://localhost:3001/admin/portal-accounts`
5. والدین/طالب علم لاگ اِن: `http://localhost:3001/portal/login`

ایڈمن طالب علم منتخب کرکے پاس ورڈ مقرر کرے۔ صارف نام طالب علم نمبر ہوگا۔ اصل پاس ورڈ ڈیٹابیس میں محفوظ یا دوبارہ ظاہر نہیں ہوتا؛ بھولنے کی صورت میں ایڈمن نیا پاس ورڈ مقرر کرے۔
