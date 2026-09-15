import { services } from "@/lib/placeholder-data";
import { ServiceRow } from "@/components/sections/ServiceRow";

export function Services() {
  return (
    <section id="leistungen" className="relative bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
            Leistungen
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
            Acht Gewerke,
            <br />
            eine Verantwortung
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Jede Leistung greift in die nächste — deshalb planen wir sie auch
            so. Ein Ansprechpartner für die gesamte Elektrotechnik Ihres
            Projekts.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
