"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updatePassword = async () => {
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
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
        <h1 className="text-3xl font-black text-slate-950">Set Your Password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create your password to activate your Spryve Intelligence account.
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error ? (
            <div className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            onClick={updatePassword}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </div>
      </div>
    </main>
  );
}
