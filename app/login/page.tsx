"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    if (loading) return;

    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("Logging in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
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
    window.location.href = "/";
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-5">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 text-slate-950 shadow-2xl">
        <h1 className="text-4xl font-black leading-tight">Spryve Intelligence</h1>
        <p className="mt-2 text-base text-slate-500">
          Login to your workspace account.
        </p>

        <div className="mt-6 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
          JS Loaded Successfully
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-lg text-slate-950 outline-none"
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 pr-24 text-lg text-slate-950 outline-none"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          {message ? (
            <div className="rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700">
              {message}
            </div>
          ) : null}

          <button
            type="button"
            onClick={login}
            disabled={loading}
            className="h-14 w-full rounded-2xl bg-blue-600 text-lg font-black text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </main>
  );
}