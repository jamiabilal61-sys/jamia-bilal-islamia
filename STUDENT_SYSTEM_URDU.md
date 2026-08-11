# مستقل طلبہ اور سالانہ ریکارڈ — تنصیب

1. Supabase Dashboard میں **SQL Editor** کھولیں۔
2. `supabase/student-management.sql` کی مکمل عبارت Paste کرکے **Run** کریں۔
3. پیکج کی تمام فائلیں اپنے `portal` فولڈر میں Copy/Replace کریں۔
4. Terminal لازماً `portal` فولڈر میں کھولیں اور چلائیں:

```powershell
npm.cmd install
npm.cmd run dev -- --webpack -p 3001
```

5. `/admin/admissions` میں درخواست منظور کریں۔ وہ خود `/admin/students` میں مستقل طالب علم بن جائے گی۔
6. طلبہ کے صفحے پر **پروفائل** کھول کر ہر نئے سال کا سیشن، شعبہ، جماعت، رول نمبر، استاد، رہائش اور نتیجہ محفوظ کریں۔

اہم: `.env.local` کسی کے ساتھ شیئر نہ کریں۔
