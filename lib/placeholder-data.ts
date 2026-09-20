/**
 * Inhalte für Phase 3 — Struktur bildet bereits das künftige Supabase-Schema
 * (page_content / services) ab, siehe Kabellauf-Blueprint §06.
 * Firmenname, Kontaktdaten, Anschrift, Rechtsform, Berufsangaben, Slogan,
 * Einsatzgebiet und Social-Links sind vom Kunden verbindlich bestätigt.
 * Handelsregister: bewusst keine Eintragung vorhanden (siehe Impressum).
 * USt-ID: liegt noch nicht vor — auf keinen Fall erfinden oder als
 * Platzhalter veröffentlichen, daher hier kein Feld dafür.
 * Steuernummer: wird NIE auf der Website veröffentlicht.
 * Leistungstexte sind redaktionelle Entwürfe ohne unbelegte technische/
 * rechtliche Zusagen.
 */

export const company = {
  name: "N4N2 Elektrotechnik",
  legalForm: "Einzelunternehmen",
  owner: "Nanthu Sundran",
  claim: "Ist die Spannung mal entzwei – N4N2 kommt vorbei!",
  phone: "0173 8256143",
  email: "info@N4N2-Elektrotechnik.de",
  serviceArea: "München und Umgebung",
  street: "Richard-Strauss-Straße 21",
  postalCode: "81677",
  city: "München",
  country: "Deutschland",
  address: "Richard-Strauss-Straße 21, 81677 München",
  // Wortlaut laut Meisterprüfungszeugnis (Handwerkskammer für München und
  // Oberbayern): Meisterprüfung im Elektrotechniker-Handwerk, Meistertitel
  // gemäß § 51 HwO. Keine freie Titel-Variante erfinden.
  profession: "Meister im Elektrotechniker-Handwerk",
  professionAwardedIn: "Deutschland",
  chamber: "Handwerkskammer für München und Oberbayern",
};

/** E-Mail/Telefon in link-fähiger Form, ohne Leerzeichen/Formatierung. */
export const contactLinks = {
  tel: "tel:+491738256143",
  whatsapp: "https://wa.me/491738256143",
  mail: `mailto:${company.email}`,
  instagram: "https://instagram.com/n4n2_elektrotechnik",
};

/**
 * Standort für Karte und Routenplanung. Grundlage ist ausschließlich die
 * bestätigte Firmenanschrift (company.address) plus der Firmenname; der
 * Google-Unternehmensprofil-Link wurde vom Inhaber aus dem verwalteten
 * Google-Profil geteilt. Es wird kein Standort und keine Koordinate erfunden.
 * Alle Google-URLs sind reine Links bzw. der Iframe-Inhalt, der erst nach
 * aktivem Klick geladen wird (siehe components/location/MapEmbed.tsx).
 */
const mapQuery = `${company.name}, ${company.address}`;
export const location = {
  /** Vom Inhaber geteilter Link zum Google-Unternehmensprofil. */
  profileUrl: "https://share.google/SumfJis4vDDqXeaZU",
  /** Google-Maps-Routenplaner mit dem Firmenstandort als Ziel. */
  routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  /** Einbettbare Karte (ohne API-Key) — wird erst nach Klick geladen. */
  embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&hl=de`,
};

export const social = {
  instagramHandle: "@n4n2_elektrotechnik",
};

// Nur bestätigte Aussagen. Kein Notdienst und keine Festpreis-Garantie
// (Inhaber-Vorgabe) — bei Bedarf erst nach ausdrücklicher Bestätigung ergänzen.
export const trustMarkers = ["Meisterbetrieb"];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon:
    | "plug"
    | "renovate"
    | "diagnose"
    | "light"
    | "smarthome"
    | "network"
    | "wallbox"
    | "solar"
    | "distribution"
    | "support";
};

export const services: Service[] = [
  {
    slug: "elektroinstallationen",
    title: "Elektroinstallationen",
    short: "Neubau und Umbau, sauber geplant.",
    description:
      "Von der ersten Leitung bis zum Zählerschrank: Elektroinstallationen für Neubau, Umbau und Erweiterung — geplant und dokumentiert nach aktuellem Regelwerk.",
    icon: "plug",
  },
  {
    slug: "altbau-sanierung",
    title: "Altbau- und Wohnungssanierung",
    short: "Bestehende Anlagen behutsam modernisieren.",
    description:
      "Veraltete Sicherungskästen, alte Leitungswege, fehlende Schutzeinrichtungen: Wir modernisieren Elektroanlagen in bewohnten Altbauten mit möglichst wenig Eingriff in Wände und Alltag.",
    icon: "renovate",
  },
  {
    slug: "fehlersuche-reparatur",
    title: "Fehlersuche und Reparaturen",
    short: "Ursache finden statt nur Symptome beheben.",
    description:
      "Sicherung fliegt raus, Steckdose ohne Strom, Leitung defekt: Wir grenzen die Fehlerquelle systematisch ein und reparieren gezielt statt auf Verdacht.",
    icon: "diagnose",
  },
  {
    slug: "beleuchtung",
    title: "Beleuchtung und Lichttechnik",
    short: "Lichtplanung für Wohnen und Gewerbe.",
    description:
      "Von der Wohnraumbeleuchtung bis zur Gewerbefläche: Lichttechnik, die auf die tatsächliche Nutzung des Raums abgestimmt ist, inklusive Umstieg auf LED.",
    icon: "light",
  },
  {
    slug: "smart-home",
    title: "Smart Home / KNX",
    short: "Licht, Heizung und Sicherheit vernetzt steuern.",
    description:
      "Planung und Installation von KNX- und Smart-Home-Systemen — von einzelnen Lichtszenen bis zur vernetzten Haussteuerung, abgestimmt auf den Alltag der Bewohner.",
    icon: "smarthome",
  },
  {
    slug: "netzwerk",
    title: "Netzwerk- und Datentechnik",
    short: "Verkabelung für Daten, LAN und WLAN.",
    description:
      "Strukturierte Netzwerkverkabelung, Datendosen und WLAN-Access-Points — die technische Grundlage für ein Zuhause oder Büro mit stabiler Verbindung.",
    icon: "network",
  },
  {
    slug: "wallbox",
    title: "Wallbox / Elektromobilität",
    short: "Laden zuhause, elektrotechnisch sauber angebunden.",
    description:
      "Installation von Wallboxen inklusive Prüfung des Hausanschlusses und Lastmanagement, damit das Laden des Fahrzeugs die übrige Anlage nicht überlastet.",
    icon: "wallbox",
  },
  {
    slug: "photovoltaik",
    title: "Photovoltaik / elektrische Einbindung",
    short: "Elektrotechnische Anbindung Ihrer PV-Anlage.",
    description:
      "Elektrotechnische Einbindung von Photovoltaikanlagen in die Hausinstallation — von der Zählerplatz-Abstimmung bis zur fachgerechten Verkabelung.",
    icon: "solar",
  },
  {
    slug: "verteiler-sicherungstechnik",
    title: "Verteiler- und Sicherungstechnik",
    short: "Der Schaltschrank als sichere Basis.",
    description:
      "Austausch und Erweiterung von Zählerschränken und Unterverteilungen — übersichtlich aufgebaut und mit zeitgemäßer Schutztechnik ausgestattet.",
    icon: "distribution",
  },
  {
    slug: "kundendienst",
    title: "Kundendienst",
    short: "Ansprechpartner für Ihre elektrische Anlage.",
    description:
      "Wir sind Ansprechpartner für die laufende Betreuung Ihrer elektrischen Anlage, zum Beispiel bei wiederkehrenden Prüfungen.",
    icon: "support",
  },
];

export const aboutStats = [{ value: "7", label: "Jahre Berufserfahrung" }];
