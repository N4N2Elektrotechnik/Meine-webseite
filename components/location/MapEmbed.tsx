"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * 2-Klick-Karte: Bis zum aktiven Klick auf "Google Maps anzeigen" wird
 * KEINE Verbindung zu Google aufgebaut — es gibt weder Script noch Iframe
 * noch Preload im DOM, nur diesen Platzhalter. Erst danach wird der
 * Iframe gerendert.
 *
 * Bewusst keine Speicherung der Entscheidung (kein localStorage/Cookie):
 * Bei jedem Seitenaufruf ist die Karte wieder aus. "Karte ausblenden"
 * entfernt den Iframe wieder (Widerruf für diesen Besuch).
 *
 * Platzhalter und Karte teilen sich denselben Container mit fester Höhe,
 * dadurch entsteht beim Aktivieren kein Layout Shift. Keine Scroll-/
 * Resize-Listener und keine Animationen — nur ein einziger State.
 */
export function MapEmbed({
  embedUrl,
  address,
}: {
  embedUrl: string;
  address: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const hideRef = useRef<HTMLButtonElement>(null);
  const showRef = useRef<HTMLButtonElement>(null);
  const wasLoaded = useRef(false);

  // Fokus mitführen, damit Tastatur-/Screenreader-Nutzer nicht "verloren gehen".
  useEffect(() => {
    if (loaded) {
      hideRef.current?.focus();
    } else if (wasLoaded.current) {
      showRef.current?.focus();
    }
    wasLoaded.current = loaded;
  }, [loaded]);

  return (
    <div className="relative h-[360px] overflow-hidden rounded-2xl border border-paper/15 bg-navy-strong sm:h-[440px] lg:h-[480px]">
      {loaded ? (
        <>
          <iframe
            src={embedUrl}
            title={`Google-Maps-Karte: ${address}`}
            className="absolute inset-0 h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <button
            ref={hideRef}
            type="button"
            onClick={() => setLoaded(false)}
            className="absolute left-3 top-3 rounded-full bg-navy-strong/90 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-paper transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Karte ausblenden
          </button>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          {/* Raster als eigene Ebene: .circuit-veil maskiert sich selbst
              (Verlauf) und darf deshalb nicht Elternelement der Inhalte sein. */}
          <div className="circuit-veil pointer-events-none absolute inset-0" />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="relative h-10 w-10 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <div className="relative max-w-md">
            <p className="font-display text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl">
              Karte laden?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/70">
              Beim Anzeigen der Karte werden Inhalte von Google Maps geladen.
              Dabei können Daten — zum Beispiel Ihre IP-Adresse — an Google
              übertragen werden, auch in Drittländer. Solange Sie nicht
              klicken, findet keine Verbindung zu Google statt. Mehr dazu in
              unserer{" "}
              <Link
                href="/datenschutz"
                className="underline decoration-paper/40 underline-offset-2 hover:text-gold"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <button
            ref={showRef}
            type="button"
            onClick={() => setLoaded(true)}
            className="relative rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Google Maps anzeigen
          </button>
        </div>
      )}
    </div>
  );
}
