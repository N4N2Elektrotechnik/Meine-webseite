import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { CableNode } from "@/components/cable/CableNode";
import type { Service } from "@/lib/placeholder-data";

export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;
  const side = reversed ? "right" : "left";
  // Fortlaufende Kabel-Nummerierung: Leitung 01 = Über uns, Leistungen folgen ab 02.
  const num = String(index + 2).padStart(2, "0");
  const displayNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`flex flex-col gap-8 lg:items-center lg:gap-16 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="lg:flex-1">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy sm:aspect-[16/9] lg:aspect-[4/3]">
          <div className="circuit-veil pointer-events-none absolute inset-0 opacity-70" />
          <span className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Leistung {displayNum}
          </span>
          <ServiceIcon
            icon={service.icon}
            className="absolute bottom-6 right-6 h-16 w-16 text-gold sm:h-20 sm:w-20"
          />
        </div>
      </div>

      <div className="lg:flex-1">
        <CableNode side={side} label={`Leitung ${num}`} />
        <h3 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-navy sm:text-4xl">
          {service.title}
        </h3>
        <p className="mt-3 text-base font-medium text-navy/70 sm:text-lg">
          {service.short}
        </p>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          {service.description}
        </p>
      </div>
    </div>
  );
}
