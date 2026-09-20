import { company, location } from "@/lib/placeholder-data";
import { TrailDot } from "@/components/cable/TrailDot";
import { MapEmbed } from "@/components/location/MapEmbed";

/**
 * "Unser Standort" auf /kontakt. Die beiden Buttons sind einfache Links —
 * sie verbinden erst beim Anklicken mit Google. Die Karte selbst lädt
 * erst nach Klick (MapEmbed).
 *
 * Kabel: Der Anker sitzt ab lg in der Spaltenlücke des Kontakt-Rasters
 * (0.9fr | 80 px | 1.1fr → Lückenmitte bei 45 % + 4 px der Containerbreite),
 * darunter im linken Seitenrand. Der Punkt ist das Kabelende.
 */
export function LocationSection() {
  return (
    <div id="standort" className="relative mt-24 scroll-mt-24 sm:mt-28">
      <TrailDot
        terminal
        className="left-[-14px] top-1 -translate-x-1/2 lg:left-[calc(45%+4px)]"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            So finden Sie uns
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">
            Unser Standort
          </h2>
          <p className="mt-5 font-mono text-sm leading-relaxed text-paper/80">
            {company.name}
            <br />
            {company.street}
            <br />
            {company.postalCode} {company.city}
          </p>
          <p className="mt-2 text-sm text-paper/60">
            Einsatzgebiet: {company.serviceArea}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={location.routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong"
          >
            Route planen
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={location.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Google-Profil
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="mt-10">
        <MapEmbed embedUrl={location.embedUrl} address={company.address} />
      </div>
    </div>
  );
}
