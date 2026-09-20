import Link from "next/link";
import { company, trustMarkers } from "@/lib/placeholder-data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-navy-strong px-6 py-8 sm:px-10 sm:py-24"
    >
      {/* Tiefe: Schaltplan-Textur + Gold-Glow */}
      <div className="circuit-veil pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[420px] w-[420px] rounded-full bg-navy-soft/60 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <h1 className="max-w-4xl font-display text-[13vw] font-extrabold uppercase leading-[0.86] tracking-tight sm:text-[8vw] lg:text-[6.4vw]">
          Präzision,
          <br />
          die <span className="text-gold">verbindet</span>.
        </h1>

        <p className="mt-4 max-w-xl border-l-2 border-gold pl-4 font-mono text-lg italic leading-snug text-gold sm:mt-5 sm:text-2xl">
          &bdquo;{company.claim}&ldquo;
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/75 sm:mt-5 sm:text-lg">
          Elektroinstallationen, Smart Home und Photovoltaik aus einer Hand —
          geplant und ausgeführt mit dem Anspruch, dass jede Verbindung hält.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-7">
          <Link
            href="/kontakt"
            className="rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong"
          >
            Projekt anfragen
          </Link>
          <a
            href="#leistungen"
            className="rounded-full border border-paper/25 px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Leistungen ansehen
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 sm:mt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-paper/50">
            {trustMarkers.map((marker) => (
              <li key={marker} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                {marker}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            <span
              data-cable-dot
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_var(--color-gold-soft)]"
            />
            Kabelursprung
          </div>
        </div>
      </div>
    </section>
  );
}
