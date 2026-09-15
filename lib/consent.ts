/**
 * Minimale Einwilligungsverwaltung für nicht notwendige Dienste
 * (z. B. Google Analytics). Speichert die Nutzerentscheidung lokal
 * (localStorage) und benachrichtigt andere Komponenten per Event,
 * damit z. B. Analytics sofort reagieren kann, ohne Reload.
 */
export const CONSENT_STORAGE_KEY = "n4n2-consent";
export const CONSENT_EVENT = "n4n2-consent-change";

export type ConsentChoice = "granted" | "denied";

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(choice: ConsentChoice) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

/** Für useSyncExternalStore — SSR-/Hydration-sicherer Zugriff auf localStorage. */
export function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentServerSnapshot(): ConsentChoice | null {
  return null;
}
