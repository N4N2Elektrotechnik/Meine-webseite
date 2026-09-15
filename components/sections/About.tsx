import { aboutStats } from "@/lib/placeholder-data";
import { CableNode } from "@/components/cable/CableNode";

export function About() {
  return (
    <section id="ueber-uns" className="relative bg-paper px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <CableNode side="left" label="Leitung 01" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-navy/60">
            Über uns
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-navy sm:text-5xl">
            Handwerk, das mitdenkt
          </h2>
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
    </section>
  );
}
