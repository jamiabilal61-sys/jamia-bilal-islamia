"use client";

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

const courses = [
  {
    id: "hifz",
    name: "حفظ القرآن",
    duration: "طالب علم کی استعداد کے مطابق",
  },
  {
    id: "tajweed",
    name: "التخصص فی التجوید والقراءات",
    duration: "3 سال",
  },
  {
    id: "usool",
    name: "اصول الشریعہ پروگرام",
    duration: "8 سال",
  },
];

export default function StudentForm() {
  const [course, setCourse] = useState("");
  const [resident, setResident] = useState("yes");
  const [admissionType, setAdmissionType] =
    useState("غیر مشروط");

  const [studentImage, setStudentImage] =
    useState<string | null>(null);

  const [imageError, setImageError] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError(
        "صرف JPG، PNG یا WEBP تصویر منتخب کریں۔"
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError(
        "تصویر کا سائز 5MB سے زیادہ نہیں ہونا چاہیے۔"
      );

      event.target.value = "";
      return;
    }

    setImageError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setStudentImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setStudentImage(null);
    setImageError("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    alert(
      "فارم کی بنیادی تیاری مکمل ہے۔ اگلے مرحلے میں اسے Database کے ساتھ منسلک کیا جائے گا۔"
    );
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="space-y-10 rounded-2xl bg-white p-5 shadow-lg md:p-8"
    >
      {/* بنیادی معلومات */}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          بنیادی معلومات
        </h2>

        {/* طالب علم کی تصویر */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-4 text-lg font-bold text-slate-800">
            طالب علم کی تصویر
          </h3>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="flex h-40 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white">
              {studentImage ? (
                <img
                  src={studentImage}
                  alt="طالب علم کی تصویر"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-3 text-center text-sm text-slate-500">
                  تصویر کا Preview
                </span>
              )}
            </div>

            <div className="w-full space-y-3">
              <input
                ref={imageInputRef}
                type="file"
                name="studentImage"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="block w-full rounded-xl border border-slate-300 bg-white p-3 text-sm"
              />

              <p className="text-sm text-slate-500">
                JPG، PNG یا WEBP تصویر منتخب کریں۔
                زیادہ سے زیادہ سائز 5MB ہے۔
              </p>

              {imageError && (
                <p className="text-sm font-semibold text-red-600">
                  {imageError}
                </p>
              )}

              {studentImage && (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      imageInputRef.current?.click()
                    }
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white transition hover:bg-blue-800"
                  >
                    تصویر تبدیل کریں
                  </button>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                  >
                    تصویر حذف کریں
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="studentName"
            required
            className="rounded-xl border p-3"
            placeholder="طالب علم کا پورا نام"
          />

          <input
            type="text"
            name="fatherName"
            required
            className="rounded-xl border p-3"
            placeholder="والد کا نام"
          />

          <input
            type="text"
            name="bFormNumber"
            className="rounded-xl border p-3"
            placeholder="فارم ب نمبر"
          />

          <input
            type="text"
            name="cnicNumber"
            className="rounded-xl border p-3"
            placeholder="شناختی کارڈ نمبر (اگر ہو)"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              تاریخ پیدائش
            </label>

            <input
              type="date"
              name="dateOfBirth"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <input
            type="number"
            name="age"
            min="1"
            max="100"
            className="rounded-xl border p-3"
            placeholder="عمر"
          />

          <input
            type="tel"
            name="studentMobile"
            className="rounded-xl border p-3"
            placeholder="طالب علم کا موبائل نمبر"
          />

          <input
            type="tel"
            name="guardianMobile"
            required
            className="rounded-xl border p-3"
            placeholder="سرپرست کا موبائل نمبر"
          />
        </div>

        <textarea
          name="address"
          rows={3}
          required
          className="mt-6 w-full rounded-xl border p-3"
          placeholder="مکمل پتہ"
        />
      </section>

      {/* تعلیمی معلومات */}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          تعلیمی معلومات
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="modernEducation"
            className="rounded-xl border p-3"
            placeholder="عصری تعلیم"
          />

          <input
            type="text"
            name="religiousEducation"
            className="rounded-xl border p-3"
            placeholder="دینی تعلیم"
          />

          <input
            type="text"
            name="previousInstitute"
            className="rounded-xl border p-3"
            placeholder="سابقہ ادارہ"
          />

          <input
            type="text"
            name="lastClass"
            className="rounded-xl border p-3"
            placeholder="آخری جماعت"
          />
        </div>
      </section>

      {/* داخلہ معلومات */}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          داخلہ معلومات
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="admissionNumber"
            className="rounded-xl border p-3"
            placeholder="داخلہ نمبر"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              داخلہ کی تاریخ
            </label>

            <input
              type="date"
              name="admissionDate"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <select
            name="admissionType"
            className="rounded-xl border p-3"
            value={admissionType}
            onChange={(event) =>
              setAdmissionType(event.target.value)
            }
          >
            <option value="غیر مشروط">
              غیر مشروط داخلہ
            </option>

            <option value="مشروط">
              مشروط داخلہ
            </option>
          </select>
        </div>

        {admissionType === "مشروط" && (
          <textarea
            name="admissionCondition"
            rows={3}
            required
            className="mt-6 w-full rounded-xl border p-3"
            placeholder="داخلے کی شرط کی مکمل تفصیل"
          />
        )}
      </section>

      {/* پروگرام */}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          پروگرام
        </h2>

        <select
          name="course"
          required
          className="w-full rounded-xl border p-3"
          value={course}
          onChange={(event) =>
            setCourse(event.target.value)
          }
        >
          <option value="">
            پروگرام منتخب کریں
          </option>

          {courses.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name} — {item.duration}
            </option>
          ))}
        </select>
      </section>

      {/* حفظ القرآن */}

      {course === "حفظ القرآن" && (
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="mb-6 text-2xl font-bold text-blue-900">
            حفظ القرآن کی معلومات
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="hifzTeacher"
              className="rounded-xl border p-3"
              placeholder="استاد کا نام"
            />

            <input
              type="text"
              name="hifzGroup"
              className="rounded-xl border p-3"
              placeholder="حلقہ"
            />

            <input
              type="text"
              name="dailyLesson"
              className="rounded-xl border p-3"
              placeholder="روزانہ سبق"
            />

            <input
              type="text"
              name="manzil"
              className="rounded-xl border p-3"
              placeholder="منزل"
            />

            <input
              type="text"
              name="revision"
              className="rounded-xl border p-3"
              placeholder="دہرائی"
            />
          </div>
        </section>
      )}

      {/* تخصص فی التجوید والقراءات */}

      {course ===
        "التخصص فی التجوید والقراءات" && (
        <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
          <h2 className="mb-6 text-2xl font-bold text-blue-900">
            التخصص فی التجوید والقراءات
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <select
              name="tajweedYear"
              className="rounded-xl border p-3"
              defaultValue=""
            >
              <option value="">
                موجودہ سال منتخب کریں
              </option>

              <option value="سال اول">
                سال اول
              </option>

              <option value="سال دوم">
                سال دوم
              </option>

              <option value="سال سوم">
                سال سوم
              </option>
            </select>

            <input
              type="text"
              name="tajweedTeacher"
              className="rounded-xl border p-3"
              placeholder="استاد کا نام"
            />

            <textarea
              name="tajweedCurriculum"
              rows={4}
              className="rounded-xl border p-3 md:col-span-2"
              placeholder="نصاب اور تعلیمی تفصیل"
            />
          </div>
        </section>
      )}

      {/* اصول الشریعہ */}

      {course === "اصول الشریعہ پروگرام" && (
        <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
          <h2 className="mb-6 text-2xl font-bold text-blue-900">
            اصول الشریعہ پروگرام
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <select
              name="usoolYear"
              className="rounded-xl border p-3"
              defaultValue=""
            >
              <option value="">
                موجودہ سال منتخب کریں
              </option>

              <option value="سال اول">
                سال اول
              </option>

              <option value="سال دوم">
                سال دوم
              </option>

              <option value="سال سوم">
                سال سوم
              </option>

              <option value="سال چہارم">
                سال چہارم
              </option>

              <option value="سال پنجم">
                سال پنجم
              </option>

              <option value="سال ششم">
                سال ششم
              </option>

              <option value="سال ہفتم">
                سال ہفتم
              </option>

              <option value="سال ہشتم">
                سال ہشتم
              </option>
            </select>

            <input
              type="text"
              name="usoolTeacher"
              className="rounded-xl border p-3"
              placeholder="استاد کا نام"
            />

            <textarea
              name="usoolCurriculum"
              rows={4}
              className="rounded-xl border p-3 md:col-span-2"
              placeholder="نصاب اور تعلیمی تفصیل"
            />
          </div>
        </section>
      )}

      {/* رہائش */}

      <section>
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          رہائش کی معلومات
        </h2>

        <select
          name="resident"
          className="rounded-xl border p-3"
          value={resident}
          onChange={(event) =>
            setResident(event.target.value)
          }
        >
          <option value="yes">
            رہائشی
          </option>

          <option value="no">
            غیر رہائشی
          </option>
        </select>

        {resident === "yes" && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="hostel"
              className="rounded-xl border p-3"
              placeholder="ہاسٹل"
            />

            <input
              type="text"
              name="floor"
              className="rounded-xl border p-3"
              placeholder="فلور"
            />

            <input
              type="text"
              name="roomNumber"
              className="rounded-xl border p-3"
              placeholder="کمرہ نمبر"
            />

            <input
              type="text"
              name="bedNumber"
              className="rounded-xl border p-3"
              placeholder="بیڈ نمبر"
            />

            <input
              type="text"
              name="lockerNumber"
              className="rounded-xl border p-3"
              placeholder="الماری نمبر"
            />
          </div>
        )}
      </section>

      <div className="border-t pt-6">
        <button
          type="submit"
          className="rounded-xl bg-blue-700 px-8 py-3 font-bold text-white transition hover:bg-blue-800"
        >
          طالب علم محفوظ کریں
        </button>
      </div>
    </form>
  );
}