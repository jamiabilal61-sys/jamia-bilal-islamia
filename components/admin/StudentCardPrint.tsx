import Image from "next/image";

import type { Admission } from "./AdmissionsTable";

type Props = { admission: Admission; qrDataUrl: string };

export default function StudentCardPrint({ admission, qrDataUrl }: Props) {
  const now = new Date();
  const startYear = now.getFullYear();
  const session = `${startYear}–${String(startYear + 1).slice(-2)}`;
  const validUntil = new Date(startYear + 1, now.getMonth(), now.getDate()).toLocaleDateString("ur-PK");
  const admissionNumber = admission.admission_number || admission.id.slice(0, 8).toUpperCase();
  const cardNumber = `${admissionNumber}-${startYear}`;

  return (
    <article id="student-card-print" dir="rtl" aria-hidden="true">
      <section className="student-card card-front">
        <header>
          <Image src="/images/logo.png" alt="جامعہ بلال" width={48} height={48} unoptimized />
          <div><h1>جامعہ بلال الاسلامیہ لاہور</h1><p>سالانہ طالب علم شناختی کارڈ</p></div>
          <strong>{session}</strong>
        </header>
        <div className="card-content">
          <div className="card-photo">
            {admission.student_image_signed_url ? <Image src={admission.student_image_signed_url} alt={admission.student_name} width={78} height={92} unoptimized /> : <span>تصویر</span>}
          </div>
          <dl>
            <div><dt>نام</dt><dd>{admission.student_name}</dd></div>
            <div><dt>والد</dt><dd>{admission.father_name}</dd></div>
            <div><dt>شعبہ</dt><dd>{admission.department}</dd></div>
            <div><dt>داخلہ نمبر</dt><dd dir="ltr">{admissionNumber}</dd></div>
            <div><dt>کارڈ نمبر</dt><dd dir="ltr">{cardNumber}</dd></div>
          </dl>
          {qrDataUrl && <Image className="card-qr" src={qrDataUrl} alt="طالب علم QR کوڈ" width={62} height={62} unoptimized />}
        </div>
        <footer><span>اجراء: {now.toLocaleDateString("ur-PK")}</span><span>میعاد: {validUntil}</span><span>مجاز دستخط</span></footer>
      </section>

      <section className="student-card card-back">
        <h2>ضروری ہدایات</h2>
        <ol>
          <li>یہ کارڈ جامعہ کی ملکیت ہے اور صرف متعلقہ طالب علم کے لیے قابلِ استعمال ہے۔</li>
          <li>جامعہ میں داخلے کے وقت کارڈ ہمراہ رکھنا ضروری ہے۔</li>
          <li>گم ہونے کی صورت میں فوراً انتظامیہ کو اطلاع دیں۔</li>
          <li>کارڈ میں ردوبدل یا کسی دوسرے شخص کو دینا ممنوع ہے۔</li>
        </ol>
        <div className="card-contact"><strong>جامعہ بلال الاسلامیہ لاہور</strong><span>فون: ____________________</span><span>پتہ: _________________________________</span></div>
        <div className="card-stamp">ادارے کی مہر</div>
      </section>
      <p className="card-print-note">پرنٹ کرتے وقت Scale: 100% اور Background graphics فعال رکھیں۔ سامنے اور پیچھے والا حصہ کاٹ کر کارڈ تیار کریں۔</p>
    </article>
  );
}
