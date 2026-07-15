"use client";

import { useState } from "react";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.studentName ||
      !formData.fatherName ||
      !formData.phone ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.className ||
      !formData.address
    ) {
      setError("براہ کرم تمام فیلڈز پُر کریں۔");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);

        setFormData({
          studentName: "",
          fatherName: "",
          phone: "",
          email: "",
          dateOfBirth: "",
          gender: "",
          className: "",
          address: "",
        });

        setTimeout(() => {
          setSuccess("");
        }, 4000);
      } else {
        setError("فارم جمع نہیں ہو سکا۔");
      }
    } catch (error) {
      console.error(error);
      setError("سرور سے رابطہ نہیں ہو سکا۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              طالب علم کا نام
            </label>

            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="مکمل نام"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                والد کا نام
              </label>

              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="والد کا نام"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                موبائل نمبر
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 font-semibold">
              ای میل
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                تاریخ پیدائش
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                جنس
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
              >
                <option value="">منتخب کریں</option>
                <option value="مرد">مرد</option>
                <option value="عورت">عورت</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block mb-2 font-semibold">
              داخلہ برائے جماعت
            </label>

            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="مثلاً حفظ، عالمیہ، تجوید"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              مکمل پتہ
            </label>

            <textarea
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              placeholder="اپنا مکمل پتہ لکھیں"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-100 border border-red-300 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-100 border border-green-300 text-green-700 px-4 py-3">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold transition"
          >
            {loading ? "فارم بھیجا جا رہا ہے..." : "داخلہ فارم جمع کریں"}
          </button>

        </form>

      </div>
    </section>
  );
}