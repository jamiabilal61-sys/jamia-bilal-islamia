# واٹس ایپ اور SMS اطلاعات — تنصیب

1. Supabase کے SQL Editor میں `supabase/notifications-system.sql` چلائیں۔
2. پورٹل دوبارہ چلائیں: `npm.cmd run dev -- --webpack -p 3001`
3. صفحہ کھولیں: `http://localhost:3001/admin/notifications`

ابتدائی نظام WhatsApp Click-to-Chat استعمال کرتا ہے، اس لیے API خرچ یا خفیہ کلید ضروری نہیں۔ ایڈمن پہلے پیغام قطار میں شامل کرے، پھر منظوری دے اور WhatsApp کھول کر ارسال کرے۔ سرکاری WhatsApp Cloud API یا SMS فراہم کنندہ بعد میں اسی قطار کے ساتھ منسلک کیا جاسکتا ہے۔

حفاظت: `.env.local` اور API کلیدیں ZIP میں شامل نہ کریں۔ WhatsApp Business کی اجازت اور صارف کی رضامندی کے بغیر تشہیری پیغامات نہ بھیجیں۔
