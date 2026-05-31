import Script from "next/script";

export default function LoginPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const loginScript = `
(function () {
  const SUPABASE_URL = ${JSON.stringify(supabaseUrl)};
  const SUPABASE_ANON_KEY = ${JSON.stringify(supabaseAnonKey)};

  function setMessage(text) {
    const el = document.getElementById("login-message");
    if (el) el.textContent = text || "";
  }

  function bindLogin() {
    if (!window.supabase) {
      setMessage("Supabase script not loaded. Please refresh.");
      return;
    }

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });

    const showBtn = document.getElementById("show-password");
    const loginForm = document.getElementById("login-form");

    if (showBtn) {
      showBtn.addEventListener("click", function () {
        const input = document.getElementById("password-input");
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
        showBtn.textContent = input.type === "password" ? "Show" : "Hide";
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email-input").value.trim().toLowerCase();
        const password = document.getElementById("password-input").value;

        if (!email || !password) {
          setMessage("Please enter email and password.");
          return;
        }

        setMessage("Logging in...");

        const result = await client.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (result.error) {
          setMessage(result.error.message || "Invalid login credentials.");
          return;
        }

        const sessionResult = await client.auth.getSession();

        if (!sessionResult.data || !sessionResult.data.session) {
          setMessage("Login session was not saved. Please refresh and try again.");
          return;
        }

        setMessage("Login successful. Opening dashboard...");
        window.location.href = "/";
      });
    }
  }

  window.addEventListener("load", bindLogin);
})();
`;

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-5">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-7 text-slate-950 shadow-2xl">
        <h1 className="text-4xl font-black leading-tight">Spryve Intelligence</h1>
        <p className="mt-2 text-base text-slate-500">Login to your workspace account.</p>

        <form id="login-form" className="mt-8 space-y-4">
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

          <div id="login-message" className="min-h-5 text-sm font-semibold text-slate-700" />

          <button
            id="login-button"
            type="submit"
            className="block h-14 w-full rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm leading-6 text-slate-400">
          Invite-only access. If login fails, refresh once.
        </p>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="beforeInteractive" />
      <Script id="spryve-login-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: loginScript }} />
    </main>
  );
}