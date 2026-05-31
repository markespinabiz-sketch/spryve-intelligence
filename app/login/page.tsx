"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("Logging in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data?.session) {
      setMessage("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    setMessage("Login successful. Opening dashboard...");
    window.location.assign("/");
  };

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center bg-slate-950 p-5">
      <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-7 text-slate-950 shadow-2xl">
        <h1 className="text-4xl font-black leading-tight">
          Spryve Intelligence
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Login to your workspace account.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="relative z-20 block h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-lg text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="relative z-20">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="block h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 pr-24 text-lg text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onPointerUp={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 z-50 -translate-y-1/2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {message ? (
            <div className="relative z-20 rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">
              {message}
            </div>
          ) : null}

          <button
            type="button"
            onPointerUp={handleLogin}
            disabled={loading}
            className="relative z-50 block h-14 w-full touch-manipulation rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg active:scale-[0.99] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <a
            href="/login"
            className="relative z-50 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700"
          >
            Reload Login Page
          </a>
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-slate-400">
          Invite-only access. If Messenger blocks login, open this link in Safari or Chrome.
        </p>
      </div>
    </main>
  );
}