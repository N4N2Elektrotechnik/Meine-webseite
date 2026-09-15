import Image from "next/image";
import { company } from "@/lib/placeholder-data";

/**
 * Original-Logo-Datei (public/images/n4n2-logo-compact.jpg) — unverändert,
 * NICHT nachgebaut oder neu gezeichnet. Die Datei hat einen hellen
 * Hintergrund; damit sie auf Navy-Flächen nicht wie ein aufgeklebtes
 * Rechteck wirkt, sitzt sie auf einer großzügigen, weich auslaufenden
 * hellen Fläche (Radial-Verlauf ohne harte Kante/Rahmen/Schatten) statt
 * einem eng zugeschnittenen Kasten.
 */
export function LogoBadge({
  imageHeightClass = "h-10",
  padding = "p-3",
  priority = false,
  className = "",
}: {
  imageHeightClass?: string;
  padding?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex w-fit shrink-0 items-center justify-center ${padding} ${className}`}
      style={{
        // Farbe exakt aus den Bildecken der Original-Datei entnommen
        // (rgb 253-254), damit die Fläche nahtlos in den Bildhintergrund
        // übergeht, statt als eigener Farbton sichtbar zu sein.
        background:
          "radial-gradient(closest-side, rgb(254,254,254) 0%, rgb(254,254,254) 55%, rgba(254,254,254,0) 100%)",
      }}
    >
      <Image
        src="/images/n4n2-logo-compact.jpg"
        alt={`${company.name} Logo`}
        width={435}
        height={390}
        className={`${imageHeightClass} w-auto`}
        priority={priority}
      />
    </span>
  );
}

/**
 * Header-Variante: gleicher Bildinhalt wie n4n2-logo-compact.jpg (identisches
 * Design/Farben/Schrift, 1:1 aus dem Original public/images/n4n2-logo.png
 * ausgeschnitten), aber als public/images/n4n2-logo-header.png mit echter
 * Transparenz statt hellem Kasten — dadurch kein separater
 * Hintergrund-Hack nötig.
 */
export function LogoBadgeTransparent({
  imageHeightClass = "h-10",
  priority = false,
  className = "",
}: {
  imageHeightClass?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex w-fit shrink-0 items-center justify-center ${className}`}
    >
      <Image
        src="/images/n4n2-logo-header.png"
        alt={`${company.name} Logo`}
        width={1237}
        height={392}
        className={`${imageHeightClass} w-auto`}
        priority={priority}
      />
    </span>
  );
}
