"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-slate-950">Spryve Intelligence</h1>

        <p className="mt-2 text-sm text-slate-600">
          Login to your workspace account.
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? (
            <div className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            onClick={login}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Invite-only access. Contact Spryve admin for account support.
        </p>
      </div>
    </main>
  );
}
