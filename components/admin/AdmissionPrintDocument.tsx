import Image from "next/image";

import type { Admission } from "./AdmissionsTable";

type Props = {
  admission: Admission;
  qrDataUrl: string;
};

const field = (label: string, value: string | null | undefined) => (
  <div className="print-field">
    <span>{label}</span>
    <strong>{value || "—"}</strong>
  </div>
);

export default function AdmissionPrintDocument({ admission, qrDataUrl }: Props) {
  const submitted = new Date(admission.created_at).toLocaleDateString("ur-PK");
  const number = admission.admission_number || admission.id.slice(0, 8).toUpperCase();

  return (
    <article id="admission-document-print" dir="rtl" aria-hidden="true">
      <header className="print-header">
        <Image src="/images/logo.png" alt="جامعہ بلال الاسلامیہ" width={90} height={90} unoptimized />
        <div>
          <h1>جامعہ بلال الاسلامیہ لاہور</h1>
          <p>داخلہ درخواست فارم</p>
        </div>
        <div className="print-number"><span>داخلہ نمبر</span><strong dir="ltr">{number}</strong></div>
      </header>

      <section className="print-student-row">
        <div className="print-grid">
          {field("طالب علم کا نام", admission.student_name)}
          {field("والد کا نام", admission.father_name)}
          {field("تاریخ پیدائش", admission.date_of_birth)}
          {field("جنس", admission.gender)}
          {field("موبائل نمبر", admission.phone)}
          {field("ای میل", admission.email)}
          {field("شعبہ", admission.department)}
          {field("درخواست کی تاریخ", submitted)}
          <div className="print-field print-wide"><span>مکمل پتہ</span><strong>{admission.address || "—"}</strong></div>
          <div className="print-field print-wide"><span>ایڈمن نوٹس</span><strong>{admission.admin_notes || "—"}</strong></div>
        </div>
        <div className="print-photo">
          {admission.student_image_signed_url ? (
            <Image src={admission.student_image_signed_url} alt={admission.student_name} width={135} height={165} unoptimized />
          ) : <span>طالب علم کی<br />تصویر</span>}
        </div>
      </section>

      <section className="print-status">
        <div><span>درخواست کی حیثیت</span><strong>{admission.status}</strong></div>
        {qrDataUrl && <Image src={qrDataUrl} alt="داخلہ ریکارڈ QR کوڈ" width={92} height={92} unoptimized />}
      </section>

      <section className="print-signatures">
        <div>طالب علم/سرپرست کے دستخط</div>
        <div>ادارے کی مہر</div>
        <div>مجاز افسر کے دستخط</div>
      </section>

      <section className="print-receipt">
        <div className="receipt-cut">✂ یہاں سے کاٹیں</div>
        <div className="receipt-body">
          <div><h2>جامعہ بلال الاسلامیہ لاہور</h2><p>رسیدِ وصولی داخلہ درخواست</p></div>
          <div>{field("داخلہ نمبر", number)}{field("طالب علم", admission.student_name)}</div>
          <div>{field("شعبہ", admission.department)}{field("تاریخ", submitted)}</div>
          <div className="receipt-sign">وصول کنندہ کے دستخط / مہر</div>
        </div>
      </section>

      <footer>یہ کمپیوٹر سے تیار کردہ داخلہ ریکارڈ ہے۔ QR کوڈ میں اسی درخواست کی بنیادی شناخت محفوظ ہے۔</footer>
    </article>
  );
}
