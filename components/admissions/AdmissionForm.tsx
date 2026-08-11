"use client";

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

const departments = [
  {
    value: "شعبہ حفظ القرآن",
    label: "شعبہ حفظ القرآن",
    duration: "طالب علم کی استعداد کے مطابق",
  },
  {
    value: "التخصص فی التجوید والقراءات",
    label: "التخصص فی التجوید والقراءات",
    duration: "3 سال",
  },
  {
    value: "اصول الشریعہ پروگرام",
    label: "اصول الشریعہ پروگرام",
    duration: "8 سال",
  },
];

const initialFormData = {
  studentName: "",
  fatherName: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  className: "",
  address: "",
};

export default function AdmissionForm() {
  const [formData, setFormData] =
    useState(initialFormData);

  const [studentImage, setStudentImage] =
    useState<string | null>(null);

  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

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

    const maximumSize = 5 * 1024 * 1024;

    if (file.size > maximumSize) {
      setImageError(
        "تصویر کا سائز 5MB سے زیادہ نہیں ہونا چاہیے۔"
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setStudentImage(reader.result as string);
      setImageName(file.name);
    };

    reader.onerror = () => {
      setImageError(
        "تصویر لوڈ نہیں ہو سکی۔ دوبارہ کوشش کریں۔"
      );
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setStudentImage(null);
    setImageName("");
    setImageError("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    removeImage();
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!studentImage) {
      setError("براہِ کرم طالب علم کی تصویر منتخب کریں۔");
      return;
    }

    if (
      !formData.studentName.trim() ||
      !formData.fatherName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.className ||
      !formData.address.trim()
    ) {
      setError("براہِ کرم تمام فیلڈز پُر کریں۔");
      return;
    }

    setLoading(true);

    try {
      const admissionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        admissionData.append(key, value.trim());
      });

      admissionData.append("studentImage", studentImage);
      admissionData.append("imageName", imageName);

      const response = await fetch("/api/admission", {
        method: "POST",
        body: admissionData,
      });

      const responseText = await response.text();
      let data: { success?: boolean; message?: string } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error("سرور سے نامکمل جواب موصول ہوا۔");
        }
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "داخلہ فارم جمع نہیں ہوسکا۔ براہِ کرم دوبارہ کوشش کریں۔"
        );
      }

      setSuccess(
        data.message ||
          "داخلہ فارم کامیابی سے جمع ہوگیا ہے۔"
      );

      resetForm();

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (submitError) {
      console.error(
        "Admission form submission error:",
        submitError
      );

      setError(
        submitError instanceof Error
          ? submitError.message
          : "سرور سے رابطہ نہیں ہو سکا۔"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="bg-slate-50 py-16"
    >
      <div className="mx-auto max-w-4xl px-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl bg-white p-6 shadow-xl md:p-8"
        >
          {/* طالب علم کی تصویر */}

          <div>
            <h2 className="mb-5 text-xl font-bold text-blue-900">
              طالب علم کی تصویر
            </h2>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-44 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white">
                  {studentImage ? (
                    <img
                      src={studentImage}
                      alt="طالب علم کی تصویر"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="px-3 text-center text-sm text-slate-500">
                      تصویر کا Preview یہاں نظر آئے گا
                    </span>
                  )}
                </div>

                <div className="w-full space-y-4">
                  <div>
                    <label className="mb-2 block font-semibold">
                      تصویر منتخب کریں
                    </label>

                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="block w-full cursor-pointer rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
                    />
                  </div>

                  <p className="text-sm text-slate-500">
                    JPG، PNG یا WEBP تصویر منتخب کریں۔
                    تصویر کا زیادہ سے زیادہ سائز 5MB ہو۔
                  </p>

                  {imageName && (
                    <p className="text-sm font-semibold text-emerald-700">
                      منتخب تصویر: {imageName}
                    </p>
                  )}

                  {imageError && (
                    <div className="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
                      {imageError}
                    </div>
                  )}

                  {studentImage && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          imageInputRef.current?.click()
                        }
                        className="rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800"
                      >
                        تصویر تبدیل کریں
                      </button>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                      >
                        تصویر حذف کریں
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* بنیادی معلومات */}

          <div>
            <h2 className="mb-5 text-xl font-bold text-blue-900">
              بنیادی معلومات
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">
                  طالب علم کا نام
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="طالب علم کا مکمل نام"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  والد کا نام
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="والد کا مکمل نام"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  موبائل نمبر
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  ای میل
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  تاریخ پیدائش
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  جنس
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <option value="">
                    جنس منتخب کریں
                  </option>

                  <option value="مرد">مرد</option>

                  <option value="عورت">عورت</option>
                </select>
              </div>
            </div>
          </div>

          {/* داخلہ برائے شعبہ */}

          <div>
            <label className="mb-2 block text-lg font-bold text-blue-900">
              داخلہ برائے شعبہ
            </label>

            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="">
                شعبہ منتخب کریں
              </option>

              {departments.map((department) => (
                <option
                  key={department.value}
                  value={department.value}
                >
                  {department.label} —{" "}
                  {department.duration}
                </option>
              ))}
            </select>

            {formData.className && (
              <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900">
                منتخب شعبہ:{" "}
                <strong>{formData.className}</strong>
              </div>
            )}
          </div>

          {/* پتہ */}

          <div>
            <label className="mb-2 block font-semibold">
              مکمل پتہ
            </label>

            <textarea
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              placeholder="اپنا مکمل پتہ لکھیں"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* پیغامات */}

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-4 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? "فارم بھیجا جا رہا ہے..."
              : "داخلہ فارم جمع کریں"}
          </button>
        </form>
      </div>
    </section>
  );
}
