"use client";

import { useState } from "react";

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-white p-6 rounded-3xl w-full max-w-sm">
        <h1 className="text-3xl font-black mb-6">
          Test Login
        </h1>

        <p className="mb-4 font-bold text-green-600">
          JS Loaded Successfully
        </p>

        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          className="w-full h-14 border rounded-2xl px-4"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="mt-4 w-full h-14 bg-blue-600 text-white rounded-2xl font-bold"
        >
          {show ? "Hide Password" : "Show Password"}
        </button>
      </div>
    </main>
  );
}