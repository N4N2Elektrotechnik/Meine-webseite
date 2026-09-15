"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getConsentServerSnapshot,
  getStoredConsent,
  setStoredConsent,
  subscribeToConsent,
} from "@/lib/consent";

/**
 * Cookie-/Consent-Hinweis. Ohne Auswahl wird nichts außer technisch
 * notwendiger Speicherung verwendet — optionale Dienste wie Google
 * Analytics (components/consent/Analytics.tsx) laden erst nach
 * "Akzeptieren". Auswahl wird lokal gespeichert (kein Cookie nötig).
 */
export function ConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getStoredConsent,
    getConsentServerSnapshot
  );

  if (consent !== null) return null;

  function choose(choice: "granted" | "denied") {
    setStoredConsent(choice);
  }

  return (
    <div
      role="region"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-paper/10 bg-navy-strong/95 px-6 py-5 backdrop-blur-md sm:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-paper/75">
          Wir verwenden auf dieser Website ausschließlich technisch
          notwendige Speicherung. Optionale Dienste wie Google Analytics
          laden wir ausschließlich mit Ihrer Zustimmung. Mehr dazu in
          unserer{" "}
          <Link
            href="/datenschutz"
            className="underline decoration-paper/40 underline-offset-2 hover:text-gold"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex flex-none gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-paper/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-navy-strong transition-colors hover:bg-gold-strong"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
