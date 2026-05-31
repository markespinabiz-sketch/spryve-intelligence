"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    window.location.href = "/";
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 text-slate-950 shadow-2xl"
      >
        <h1 className="text-4xl font-black">Spryve Intelligence</h1>
        <p className="mt-2 text-slate-500">Login to your workspace account.</p>

        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-8 h-14 w-full rounded-2xl border border-slate-300 px-4 text-lg outline-none"
          required
        />

        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-4 h-14 w-full rounded-2xl border border-slate-300 px-4 text-lg outline-none"
          required
        />

        {errorMsg ? (
          <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">
            {errorMsg}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-14 w-full rounded-2xl bg-blue-600 text-lg font-black text-white active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Invite-only access. Contact Spryve admin for account support.
        </p>
      </form>
    </main>
  );
}