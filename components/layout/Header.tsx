"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoBadgeTransparent } from "@/components/brand/LogoBadge";
import { PhoneIcon } from "@/components/icons/ContactIcons";
import { company, contactLinks } from "@/lib/placeholder-data";

const navItems = [
  { href: "/", label: "Startseite" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/bewertungen", label: "Bewertungen" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Body-Scroll sperren, Escape schließt (Fokus zurück auf den Button),
  // Tab bleibt im Menü (Button + Links) — nur aktiv, solange es offen ist.
  // Die Scrollbar-Spur bleibt per `scrollbar-gutter: stable` (globals.css)
  // erhalten, dadurch kein Layout-Sprung beim Sperren.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      const button = menuButtonRef.current;
      if (!panel || !button) return;
      const focusable = [
        button,
        ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    // Bewusst KEIN backdrop-filter am Header: Ein sticky Element mit
    // Backdrop-Blur wird beim Scrollen in jedem Frame neu berechnet und
    // macht den Header zum Containing Block für `position: fixed` — das
    // Menü-Overlay wäre dadurch nur so groß wie der Header (abgeschnitten).
    <header className="sticky top-0 z-[65] border-b border-paper/10 bg-navy-strong/95">
      <div className="relative z-[80] mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          aria-label="Zum Seitenanfang"
          onClick={() => setIsMenuOpen(false)}
        >
          <LogoBadgeTransparent imageHeightClass="h-8 sm:h-10" priority />
        </Link>

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
            href="/kontakt"
            onClick={() => setIsMenuOpen(false)}
            className="hidden rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy-strong transition-colors hover:bg-gold-strong md:inline-block"
          >
            Projekt anfragen
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isMenuOpen}
            aria-controls="hauptnavigation-panel"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="burger relative h-11 w-11 flex-none rounded-full border border-paper/15 transition-colors duration-300 hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-expanded:border-gold/60 aria-expanded:bg-gold/10"
          >
            <span aria-hidden="true" className="burger__line" />
            <span aria-hidden="true" className="burger__line" />
            <span aria-hidden="true" className="burger__line" />
          </button>
        </div>
      </div>

      {/* Overlay-Menü — deckt bei Öffnung den gesamten Viewport ab. Im
          geschlossenen Zustand `inert` + visibility:hidden (siehe
          .menu-overlay): nicht sichtbar, nicht per Tab erreichbar. */}
      <div
        inert={!isMenuOpen}
        data-open={isMenuOpen}
        className="menu-overlay fixed inset-0 z-[70]"
      >
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-navy-strong/85"
        />
        <div
          id="hauptnavigation-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="menu-panel absolute inset-x-0 top-0 max-h-dvh overflow-y-auto overscroll-contain border-b border-paper/10 bg-navy-strong shadow-2xl shadow-black/40"
        >
          <nav
            aria-label="Hauptnavigation"
            className="mx-auto flex max-w-6xl flex-col px-6 pb-10 pt-24 sm:px-10 sm:pt-28"
          >
            {navItems.map((item, index) => {
              const isCurrent = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link font-display text-2xl uppercase tracking-tight sm:text-3xl"
                >
                  <span aria-hidden="true" className="nav-link__tick" />
                  <span className="nav-link__label">{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="nav-link__num font-mono text-sm text-paper/40"
                  >
                    0{index + 1}
                  </span>
                  <span aria-hidden="true" className="nav-link__rule" />
                </Link>
              );
            })}
            <a
              href={contactLinks.tel}
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 flex items-center gap-3 font-mono text-sm text-paper/70 transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <PhoneIcon className="h-5 w-5 flex-none" />
              {company.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
