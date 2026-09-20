import Link from "next/link";
import { services } from "@/lib/placeholder-data";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { TrailDot } from "@/components/cable/TrailDot";

/**
 * Rendert IMMER alle Leistungen — jede ServiceRow trägt einen
 * CableNode-Knoten, den die Kabelanimation auf der Startseite braucht
 * (siehe CableCanvas). `variant="full"` ist der eigenständigen
 * /leistungen-Seite vorbehalten (H1 statt H2, TrailDot-Anker für
 * CableTrail statt CableNode); die Liste bleibt identisch.
 */
export function Services({ variant = "embedded" }: { variant?: "embedded" | "full" }) {
  const Heading = variant === "full" ? "h1" : "h2";
  const trail = variant === "full";

  return (
    <section id="leistungen" className="relative bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
            Leistungen
          </p>
          <Heading className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
            Zehn Leistungen.
            <br />
            Eine Verantwortung.
          </Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Jede Leistung greift in die nächste — deshalb planen wir sie auch
            so. Ein Ansprechpartner für die gesamte Elektrotechnik Ihres
            Projekts.
          </p>
        </div>

        <div
          className={`${trail ? "relative " : ""}mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24`}
        >
          {trail ? (
            // Kabelursprung: unterhalb des Intros, ab lg in der Spaltenmitte.
            <TrailDot className="left-[-14px] -top-9 -translate-x-1/2 lg:left-1/2" />
          ) : null}
          {services.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              index={index}
              trail={trail}
            />
          ))}
        </div>

        {trail ? (
          <div className="relative mt-20 pt-10 sm:mt-24 lg:text-center">
            <TrailDot
              terminal
              className="left-[-14px] top-0 -translate-x-1/2 lg:left-1/2"
            />
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-full bg-gold px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong"
            >
              Projekt anfragen
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
