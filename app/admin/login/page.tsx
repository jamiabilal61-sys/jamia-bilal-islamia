"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login ناکام ہوگیا۔");
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next?.startsWith("/admin") ? next : "/admin/admissions");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login ناکام ہوگیا۔");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6" dir="rtl">
      <form onSubmit={handleLogin} className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-950">ایڈمن لاگ اِن</h1>
          <p className="mt-2 text-slate-500">جامعہ بلال الاسلامیہ لاہور</p>
        </div>
        <label className="block font-semibold">صارف نام
          <input required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3 font-normal" />
        </label>
        <label className="block font-semibold">پاس ورڈ
          <input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border rounded-xl px-4 py-3 font-normal" />
        </label>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">{error}</div>}
        <button disabled={loading} className="w-full bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-xl font-bold">
          {loading ? "انتظار کیجیے…" : "لاگ اِن کریں"}
        </button>
      </form>
    </main>
  );
}
