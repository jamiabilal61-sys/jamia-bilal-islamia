"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "123456"
    ) {
      router.push("/admin");
    } else {
      setError("صارف نام یا پاس ورڈ درست نہیں۔");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md space-y-6"
      >

        <h1 className="text-3xl font-bold text-center text-blue-900">
          Admin Login
        </h1>

        <div>
          <label className="block mb-2 font-semibold">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-bold"
        >
          Login
        </button>

      </form>

    </main>
  );
}