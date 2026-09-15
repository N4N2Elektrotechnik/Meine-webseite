"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { LogoBadgeTransparent } from "@/components/brand/LogoBadge";
import { PhoneIcon } from "@/components/icons/ContactIcons";
import { company, contactLinks } from "@/lib/placeholder-data";

const navItems = [
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#bewertungen", label: "Bewertungen" },
  { href: "/#kontakt", label: "Kontakt" },
];

/**
 * Wenn wir bereits auf der Startseite sind, existiert das Zielelement schon
 * im DOM — dann direkt selbst scrollen, statt uns auf den nativen
 * Browser-Sprung zu einem #hash zu verlassen (der bei einer reinen
 * Hash-Änderung ohne Seitenwechsel nicht in jeder Umgebung zuverlässig
 * auslöst). Von einer anderen Seite (z. B. /impressum) aus navigiert der
 * Link ganz normal zur Startseite samt Hash.
 */
function scrollIfAlreadyHome(event: MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.split("#")[1];
  if (!id || window.location.pathname !== "/") return;
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  window.history.pushState(null, "", href);
  el.scrollIntoView({ behavior: "instant" });
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-navy-strong/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" aria-label="Zum Seitenanfang">
          <LogoBadgeTransparent imageHeightClass="h-8 sm:h-10" priority />
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => scrollIfAlreadyHome(e, item.href)}
              className="font-mono text-xs uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={contactLinks.tel}
            aria-label={`${company.name} anrufen: ${company.phone}`}
            className="flex items-center gap-2 text-paper/80 transition-colors hover:text-gold"
          >
            <PhoneIcon className="h-5 w-5 flex-none" />
            <span className="hidden font-mono text-sm sm:inline">{company.phone}</span>
          </a>
          <Link
            href="/#kontakt"
            onClick={(e) => scrollIfAlreadyHome(e, "/#kontakt")}
            className="hidden rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong md:inline-block"
          >
            Projekt anfragen
          </Link>
        </div>
      </div>
    </header>
  );
}
