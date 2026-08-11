# جامعہ بلال پورٹل — آن لائن تنصیب اور حقیقی آزمائش

## 1) Supabase تیار کریں

1. Production کے لیے الگ Supabase Project بنائیں۔
2. SQL Editor میں `supabase/complete-setup.sql` صرف ایک مرتبہ چلائیں۔
3. Project Settings → API سے Project URL اور `service_role` key لیں۔
4. `service_role` key کبھی براؤزر، GitHub یا WhatsApp پر شائع نہ کریں۔

## 2) Vercel Environment Variables

Vercel Project → Settings → Environment Variables میں `.env.example` والی تمام لازمی قدریں شامل کریں۔ ہر secret کی Production، Preview اور Development ضرورت سوچ کر مقرر کریں۔

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `PORTAL_SESSION_SECRET`
- `NEXT_PUBLIC_APP_URL`

دونوں session secrets الگ اور کم از کم 32 بے ترتیب حروف کے ہوں۔ `NEXT_PUBLIC_APP_URL` اصل HTTPS ڈومین ہو، مثلاً `https://portal.jamiabilal.org`۔

## 3) Deployment سے پہلے مقامی جانچ

PowerShell میں:

```powershell
Copy-Item .env.example .env.local
# اب .env.local میں اصل محفوظ قدریں درج کریں
npm.cmd install
npm.cmd run predeploy
```

`predeploy` ماحول، Lint، TypeScript اور Production Build چاروں جانچتا ہے۔

## 4) Preview پھر Production

سب سے محفوظ ترتیب:

1. GitHub repository کو Vercel سے Import کریں۔
2. پہلے Preview Deployment بنائیں۔
3. نیچے دی گئی حقیقی آزمائش مکمل کریں۔
4. کامیاب Preview کو Production پر Promote کریں۔
5. Custom Domain جوڑیں اور DNS/SSL مکمل ہونے دیں۔

## 5) Deployment صحت جانچ

یہ URL کھولیں:

```text
https://آپ-کا-ڈومین/api/health
```

درست جواب میں `status: ok` اور `database: connected` آئے گا۔ `503` آنے پر Environment Variables یا Supabase SQL/connection چیک کریں۔ یہ endpoint کوئی secret یا database record ظاہر نہیں کرتا۔

## 6) حقیقی ڈیٹا کی مرحلہ وار آزمائش

Production میں پہلے 5 فرضی/آزمائشی طلبہ سے یہ مکمل flow چیک کریں:

1. داخلہ → منظوری → طالب علم پروفائل
2. روزانہ حاضری → والدین پورٹل میں نمودار ہونا
3. فیس جمع → سیریل نمبر والی رسید → بقایا کم ہونا
4. امتحان/نمبر → نتیجہ → رزلٹ کارڈ
5. شناختی کارڈ/سند → QR سے عوامی تصدیق
6. لائبریری کتاب اجرا/واپسی
7. ہاسٹل/رخصت/نظم و ضبط اندراج
8. ملازم حاضری → تنخواہ → پے سلپ
9. WhatsApp/SMS پیغام منظوری → قطار → ارسال کا ریکارڈ
10. JSON Backup ڈاؤن لوڈ → فائل محفوظ رکھنا

آزمائشی ریکارڈ کامیاب ہونے کے بعد ہی Word/Excel سے اصل طلبہ کا مکمل ڈیٹا Import کریں۔ پہلے Preview دیکھیں، Duplicate رپورٹ محفوظ کریں، پھر منظوری دیں۔

## 7) WhatsApp/SMS اصل سروس

موجودہ نظام provider-independent queue اور admin approval تک تیار ہے۔ مکمل خودکار ارسال کے لیے Meta WhatsApp Cloud API یا منتخب SMS provider کے یہ عناصر درکار ہوں گے:

- Approved business/phone number
- Access token/API key
- Approved message templates
- Webhook verification secret
- ارسال کی لاگت اور ماہانہ حد کی منظوری

یہ credentials دستیاب ہونے تک Click-to-Chat/منظوری والا طریقہ استعمال کریں۔ Credentials کو صرف Vercel Environment Variables میں رکھیں۔

## 8) Live ہونے کے بعد

- پہلے ہفتے روزانہ Backup، پھر کم از کم ہفتہ وار Backup
- ہر ملازم کو صرف اپنے عہدے کی اجازت
- مرکزی Admin پاس ورڈ مشترک نہ کریں
- Audit Log ہفتہ وار دیکھیں
- ہر بڑی تبدیلی سے پہلے Preview Deployment اور Backup بنائیں
- خرابی کی صورت میں Vercel سے پچھلی کامیاب Deployment پر Rollback کریں
