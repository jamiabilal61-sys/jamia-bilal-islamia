"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("تمام خانے پُر کرنا ضروری ہیں۔");
      return;
    }

    console.log(formData);

    setSuccess("آپ کا پیغام کامیابی سے ارسال ہو گیا۔");

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-green-700 font-semibold">
            رابطہ فارم
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mt-3">
            ہمیں اپنا پیغام بھیجیں
          </h2>

          <p className="mt-5 text-gray-600 leading-8">
            اگر آپ داخلہ، کورسز یا کسی بھی معلومات کے لیے ہم سے رابطہ کرنا چاہتے
            ہیں تو نیچے دیا گیا فارم پُر کریں۔
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          {error && (
            <div className="mb-6 rounded-xl border border-red-300 bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-green-300 bg-green-100 p-4 text-green-700">
              {success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">نام</label>

              <input
                type="text"
                name="name"
                placeholder="اپنا نام درج کریں"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                موبائل نمبر
              </label>

              <input
                type="text"
                name="phone"
                placeholder="03XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold">ای میل</label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold">موضوع</label>

            <input
              type="text"
              name="subject"
              placeholder="پیغام کا موضوع"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-semibold">پیغام</label>

            <textarea
              rows={6}
              name="message"
              placeholder="اپنا پیغام یہاں لکھیں..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition"
          >
            پیغام ارسال کریں
          </button>
        </form>
      </div>
    </section>
  );
}