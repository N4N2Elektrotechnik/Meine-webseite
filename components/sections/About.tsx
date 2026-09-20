import Link from "next/link";
import { aboutStats, company } from "@/lib/placeholder-data";
import { CableNode } from "@/components/cable/CableNode";
import { TrailDot } from "@/components/cable/TrailDot";

/**
 * `variant="teaser"` läuft auf der Startseite im Kabel-Scroll mit
 * (CableNode-Knoten bleibt erhalten, siehe CableCanvas). `variant="full"`
 * ist die eigenständige /ueber-uns-Seite: kein Kabel-Kontext mehr, dafür
 * als H1 ausgezeichnet und um die vorhandenen Firmenangaben ergänzt.
 */
export function About({ variant = "teaser" }: { variant?: "teaser" | "full" }) {
  const Heading = variant === "full" ? "h1" : "h2";
  const isFull = variant === "full";
  const facts = [
    {
      label: "Berufsbezeichnung",
      value: `${company.profession} (verliehen in ${company.professionAwardedIn})`,
    },
    { label: "Zuständige Kammer", value: company.chamber },
    { label: "Einsatzgebiet", value: company.serviceArea },
  ];

  return (
    <section id="ueber-uns" className="relative bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className={isFull ? "relative" : undefined}>
          {isFull ? (
            <TrailDot className="left-[-14px] top-1 -translate-x-1/2" />
          ) : null}
          {variant === "teaser" ? (
            <CableNode side="left" label="Leitung 01" />
          ) : null}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
            Über uns
          </p>
          <Heading className="mt-4 max-w-lg font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
            Handwerk, das mitdenkt
          </Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            N4N2 Elektrotechnik plant und installiert elektrische Anlagen für
            Wohn- und Gewerbebauten — von der ersten Skizze bis zur
            Inbetriebnahme. Statt Standardlösungen von der Stange verlegen wir
            jede Leitung so, dass sie zum Gebäude, zur Nutzung und zu den
            Menschen darin passt.
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            Ein kleines, eingespieltes Team, klare Absprachen und Anlagen,
            die auch in zehn Jahren noch nachvollziehbar dokumentiert sind.
          </p>

          {isFull ? null : (
            <Link
              href="/ueber-uns"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-strong"
            >
              Mehr über uns
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-navy-strong p-8 sm:p-10">
          <div className="circuit-veil pointer-events-none absolute inset-0 opacity-80" />
          <div className="relative">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-6xl font-extrabold text-gold sm:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-gold/15"
          >
            <polygon
              points="66,4 20,68 46,68 34,116 96,48 62,48"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {isFull ? (
        <>
          {/* Baustein 2: die vorhandenen Firmenangaben als Karten. */}
          <div className="relative mt-20 sm:mt-24">
            <TrailDot className="left-[-14px] top-1 -translate-x-1/2" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
              Auf einen Blick
            </p>
            <dl className="mt-6 grid gap-5 md:grid-cols-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-3 text-lg font-medium text-navy">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Baustein 3: Standort. Bewusst KEINE Karte (die lädt nur auf
              /kontakt nach Klick) — nur vorhandene Angaben + Link dorthin. */}
          <div className="relative mt-20 sm:mt-24">
            <TrailDot className="left-[-14px] top-1 -translate-x-1/2" />
            <div className="relative overflow-hidden rounded-2xl bg-navy-strong p-8 sm:p-10 lg:p-12">
              <div className="circuit-veil pointer-events-none absolute inset-0 opacity-80" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    Wo Sie uns finden
                  </p>
                  <h2 className="mt-4 max-w-md font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-paper sm:text-4xl">
                    Wir sind in München für Sie da
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-paper/70">
                    Einsatzgebiet: {company.serviceArea}.
                  </p>
                  <p className="mt-3 font-mono text-sm leading-relaxed text-paper/80">
                    {company.street}
                    <br />
                    {company.postalCode} {company.city}
                  </p>
                  <Link
                    href="/kontakt#standort"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong"
                  >
                    Standort &amp; Anfahrt
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Dekorative Einzugsgebiet-Grafik: konzentrische Ringe um den
                    Standort — keine Kartendaten, keine Entfernungsangaben. */}
                <svg
                  viewBox="0 0 240 240"
                  aria-hidden="true"
                  className="mx-auto h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
                  fill="none"
                >
                  <circle cx="120" cy="120" r="112" stroke="rgb(251 180 0 / 0.14)" strokeWidth="1.5" strokeDasharray="3 7" />
                  <circle cx="120" cy="120" r="80" stroke="rgb(251 180 0 / 0.28)" strokeWidth="1.5" strokeDasharray="3 7" />
                  <circle cx="120" cy="120" r="48" stroke="rgb(251 180 0 / 0.5)" strokeWidth="1.5" />
                  <path
                    d="M120 148s-20-15.5-20-31.5a20 20 0 1 1 40 0c0 16-20 31.5-20 31.5Z"
                    fill="var(--color-gold)"
                  />
                  <circle cx="120" cy="116" r="7" fill="var(--color-navy-strong)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Baustein 4: Slogan + Link zur Kontaktseite — hier endet das Kabel. */}
          <div className="relative mt-20 pt-10 sm:mt-24">
            <TrailDot
              terminal
              className="left-[-14px] top-0 -translate-x-1/2"
            />
            <p className="max-w-md font-mono text-sm italic leading-relaxed text-muted">
              &bdquo;{company.claim}&ldquo;
            </p>
            <Link
              href="/kontakt"
              className="mt-6 inline-flex items-center rounded-full bg-gold px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong"
            >
              Projekt anfragen
            </Link>
          </div>
        </>
      ) : null}
      </div>
    </section>
  );
}
