# ایڈمن ڈیش بورڈ سیٹ اپ

## 1) فائلیں Replace کریں

اس پیکج کے تمام فولڈر اور فائلیں اپنے موجودہ `portal` فولڈر میں Copy/Replace کریں۔ پیکج میں `.env.local` شامل نہیں، اس لیے آپ کی موجودہ فائل برقرار رہے گی۔

## 2) `.env.local` میں یہ تین نئی لائنیں شامل کریں

```env
ADMIN_USERNAME=اپنا-صارف-نام
ADMIN_PASSWORD=ایک-مضبوط-اور-لمبا-پاس-ورڈ
ADMIN_SESSION_SECRET=کم-از-کم-32-رینڈم-حروف
```

موجودہ `SUPABASE_URL` اور `SUPABASE_SECRET_KEY` بھی اسی فائل میں رہیں گے۔ Secret کسی کو نہ بھیجیں۔

## 3) نئی packages نصب کریں

PowerShell میں `portal` فولڈر کے اندر:

```powershell
npm.cmd install
```

## 4) ویب سائٹ چلائیں

```powershell
npm.cmd run dev -- --webpack -p 3001
```

پھر Admin Login کھولیں:

```text
http://localhost:3001/admin/login
```

## دستیاب سہولتیں

- Supabase سے اصل داخلہ درخواستیں
- نام، داخلہ نمبر، موبائل اور پتہ سے تلاش
- شعبہ اور حیثیت کے مطابق فلٹر
- تاریخ، نام، داخلہ نمبر یا شعبہ کے مطابق ترتیب
- ایک، متعدد یا موجودہ filtered ریکارڈ منتخب کرنا
- Excel، Word اور PDF Export
- طالب علم کی مکمل تفصیل اور محفوظ تصویر
- درخواست منظور، مسترد یا زیر غور کرنا
- ایڈمن نوٹس محفوظ کرنا
- HttpOnly محفوظ Admin session

## اہم حفاظتی ہدایت

اصل RAR میں `.env.local` موجود تھی۔ اگر یہ فائل کسی اور کو بھیجی گئی ہو تو Supabase Dashboard میں Service Role Secret کو فوراً Rotate کریں اور نئی Key صرف اپنی `.env.local` میں رکھیں۔
