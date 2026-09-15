import type { Metadata } from "next";
import { login } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin-Login – N4N2 Elektrotechnik",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center bg-navy-strong px-6 py-16">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-paper/15 bg-paper/[0.04] p-8 backdrop-blur-sm sm:p-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          N4N2 · Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-paper">
          Anmelden
        </h1>

        {sp.error ? (
          <p className="mt-5 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.
          </p>
        ) : null}

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60"
            >
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-lg border border-paper/15 bg-navy-soft/40 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60"
            >
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-lg border border-paper/15 bg-navy-soft/40 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-7 w-full rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong"
        >
          Anmelden
        </button>
      </form>
    </main>
  );
}
