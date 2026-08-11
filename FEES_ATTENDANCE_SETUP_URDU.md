# فیس اور حاضری نظام — تنصیب

1. Supabase Dashboard میں **SQL Editor** کھولیں۔
2. `supabase/finance-attendance.sql` کا مکمل متن Paste کرکے **Run** کریں۔
3. Terminal لازماً `portal` فولڈر میں کھولیں۔
4. یہ کمانڈ چلائیں:

```powershell
npm.cmd install
npm.cmd run dev -- --webpack -p 3001
```

فیس و رسید: `http://localhost:3001/admin/fees`

روزانہ حاضری: `http://localhost:3001/admin/attendance`

رسید کھولنے کے لیے Browser میں Pop-ups کی اجازت دیں۔
