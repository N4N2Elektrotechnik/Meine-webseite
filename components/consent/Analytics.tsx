"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getConsentServerSnapshot,
  getStoredConsent,
  subscribeToConsent,
} from "@/lib/consent";

/**
 * Google Analytics — lädt NUR, wenn (a) der Nutzer aktiv eingewilligt hat
 * UND (b) eine Measurement-ID konfiguriert ist (NEXT_PUBLIC_GA_MEASUREMENT_ID,
 * siehe .env.local.example). Aktuell ist keine ID gesetzt, d. h. diese
 * Komponente rendert nichts — die Einwilligungslogik ist vorbereitet
 * ("technische Grundlage"), Analytics selbst ist noch nicht aktiv.
 * Keine erfundene Measurement-ID im Code.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getStoredConsent,
    getConsentServerSnapshot
  );

  if (consent !== "granted" || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
