# ہاسٹل، میس اور گیٹ نظام — تنصیب

1. Supabase Dashboard میں **SQL Editor** کھولیں۔
2. `supabase/hostel-management.sql` کا مکمل متن Paste کرکے **Run** کریں۔
3. PowerShell میں Portal فولڈر کھول کر چلائیں:

```powershell
cd "H:\Farooqi Work 2026\Jamia-Bilal-Islamia\portal"
npm.cmd install
npm.cmd run dev -- --webpack -p 3001
```

4. براؤزر میں `http://localhost:3001/admin/hostel` کھولیں۔

استعمال کی ترتیب: پہلے کمرے بنائیں، پھر طلبہ کو کمرے دیں۔ اس کے بعد میس حاضری، آمد و روانگی اور ملاقات کا ریکارڈ درج کیا جاسکتا ہے۔ `.env.local` یا Supabase Secret کسی کو نہ دیں۔
