export default function LoginPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const loginScript = `
(function () {
  const SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
  const ANON_KEY = ${JSON.stringify(supabaseAnonKey)};

  function getProjectRef() {
    try { return new URL(SUPABASE_URL).hostname.split(".")[0]; }
    catch { return ""; }
  }

  const storageKey = "sb-" + getProjectRef() + "-auth-token";

  function setMessage(text) {
    const el = document.getElementById("login-message");
    if (el) el.textContent = text || "";
  }

  function togglePassword() {
    const input = document.getElementById("password-input");
    const btn = document.getElementById("show-password");
    if (!input || !btn) return;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "Show" : "Hide";
  }

  async function login(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("email-input")?.value?.trim().toLowerCase();
    const password = document.getElementById("password-input")?.value;

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setMessage("Logging in...");

    try {
      const response = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
        method: "POST",
        headers: {
          "apikey": ANON_KEY,
          "Authorization": "Bearer " + ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error_description || data.msg || data.error || "Invalid login credentials.");
        return;
      }

      const session = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600),
        token_type: data.token_type || "bearer",
        user: data.user
      };

      localStorage.setItem(storageKey, JSON.stringify(session));
      setMessage("Login successful. Opening dashboard...");
      window.location.replace("/");
    } catch (err) {
      setMessage("Login failed. Please check internet or Supabase settings.");
    }
  }

  function bind() {
    document.getElementById("login-button")?.addEventListener("click", login);
    document.getElementById("show-password")?.addEventListener("click", togglePassword);
    document.getElementById("show-password")?.addEventListener("touchend", function(e) {
      e.preventDefault();
      togglePassword();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
`;

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-5">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 text-slate-950 shadow-2xl">
        <h1 className="text-4xl font-black leading-tight">Spryve Intelligence</h1>
        <p className="mt-2 text-base text-slate-500">Login to your workspace account.</p>

        <div className="mt-8 space-y-4">
          <input
            id="email-input"
            name="email"
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="email"
            placeholder="Email"
            className="block h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-lg text-slate-950 outline-none"
          />

          <div className="relative">
            <input
              id="password-input"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="block h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 pr-24 text-lg text-slate-950 outline-none"
            />

            <button
              id="show-password"
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
            >
              Show
            </button>
          </div>

          <div
            id="login-message"
            className="min-h-5 text-sm font-semibold text-slate-700"
          />

          <button
            id="login-button"
            type="button"
            className="block h-14 w-full rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg"
          >
            Login
          </button>

          <a
            href="/login"
            className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700"
          >
            Reload Login Page
          </a>
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-slate-400">
          Invite-only access. If login does not respond, refresh once.
        </p>
      </div>

      <script dangerouslySetInnerHTML={{ __html: loginScript }} />
    </main>
  );
}