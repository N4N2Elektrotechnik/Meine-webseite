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
      "Von der ersten Leitung bis zum Zählerschrank: Wir übernehmen alle Elektroarbeiten rund um Ihre Hausinstallation — fachgerechte Elektroinstallationen für Neubau, Umbau und Erweiterung bestehender elektrischer Anlagen, geplant, verkabelt und dokumentiert nach aktuellem Regelwerk der Elektrotechnik.",
    icon: "plug",
  },
  {
    slug: "altbau-sanierung",
    title: "Altbau- und Wohnungssanierung",
    short: "Bestehende Anlagen behutsam modernisieren.",
    description:
      "Veraltete Sicherungskästen, alte Leitungswege, fehlende Schutztechnik: Bei der Altbausanierung, Elektrosanierung und Wohnungssanierung modernisieren wir bestehende elektrische Anlagen in Altbauten, Wohnungen und Häusern — mit möglichst wenig Eingriff in Wände, Böden und Alltag.",
    icon: "renovate",
  },
  {
    slug: "fehlersuche-reparatur",
    title: "Fehlersuche und Reparaturen",
    short: "Ursache finden statt nur Symptome beheben.",
    description:
      "Sicherung fliegt immer wieder raus, Steckdose ohne Strom, Leitung defekt oder plötzlicher Stromausfall: Bei der Elektro-Fehlersuche grenzen wir elektrische Fehler in Ihrer Elektroinstallation systematisch ein und beheben die Fehlerquelle mit der passenden Elektroreparatur — gezielt statt auf Verdacht.",
    icon: "diagnose",
  },
  {
    slug: "beleuchtung",
    title: "Beleuchtung und Lichttechnik",
    short: "Lichtplanung für Wohnen und Gewerbe.",
    description:
      "Von der Wohnraumbeleuchtung bis zur Gewerbebeleuchtung: Wir planen Innenbeleuchtung und Außenbeleuchtung passend zur tatsächlichen Nutzung des Raums — von einzelnen Leuchten bis zum kompletten Beleuchtungskonzept, inklusive Umstieg auf energiesparende LED-Beleuchtung.",
    icon: "light",
  },
  {
    slug: "smart-home",
    title: "Smart Home / KNX",
    short: "Licht, Heizung und Sicherheit vernetzt steuern.",
    description:
      "Planung und Installation von KNX- und Smart-Home-Systemen für die Gebäude- und Hausautomation — von einzelnen Lichtszenen und Lichtsteuerung bis zur vernetzten Haustechnik für Heizungssteuerung und Sicherheit, abgestimmt auf den Alltag der Bewohner und ausgelegt als intelligente Haussteuerung aus einer Hand.",
    icon: "smarthome",
  },
  {
    slug: "netzwerk",
    title: "Netzwerk- und Datentechnik",
    short: "Verkabelung für Daten, LAN und WLAN.",
    description:
      "Strukturierte Netzwerkverkabelung, Datendosen und WLAN-Access-Points: Wir übernehmen die Netzwerktechnik und Datentechnik für Ihr Zuhause oder Büro — von der Datenverkabelung für LAN bis zum stabilen WLAN für ein zuverlässiges Heimnetzwerk.",
    icon: "network",
  },
  {
    slug: "wallbox",
    title: "Wallbox / Elektromobilität",
    short: "Laden zuhause, elektrotechnisch sauber angebunden.",
    description:
      "Installation von Wallboxen für das Laden von Elektroautos (E-Autos) und Elektrofahrzeugen zuhause: Wir prüfen den Hausanschluss, planen das Lastmanagement und schaffen so eine zuverlässige Ladeinfrastruktur für Ihre Elektromobilität — ohne dass die Ladestation die übrige elektrische Anlage überlastet.",
    icon: "wallbox",
  },
  {
    slug: "photovoltaik",
    title: "Photovoltaik / elektrische Einbindung",
    short: "Elektrotechnische Anbindung Ihrer PV-Anlage.",
    description:
      "Elektrotechnische Einbindung Ihrer Photovoltaikanlage (PV-Anlage / Solaranlage) in die Hausinstallation: von der Abstimmung des Zählerplatzes bis zur fachgerechten Verkabelung, damit der erzeugte Solarstrom sicher in Ihr Hausnetz eingespeist wird.",
    icon: "solar",
  },
  {
    slug: "verteiler-sicherungstechnik",
    title: "Verteiler- und Sicherungstechnik",
    short: "Der Schaltschrank als sichere Basis.",
    description:
      "Austausch und Erweiterung von Zählerschränken, Sicherungskästen und Unterverteilungen: Wir bringen die Verteiler- und Sicherungstechnik Ihrer elektrischen Anlage übersichtlich und zeitgemäß auf den aktuellen Stand — inklusive moderner Schutztechnik wie FI-Schutzschaltern.",
    icon: "distribution",
  },
  {
    slug: "kundendienst",
    title: "Kundendienst",
    short: "Ansprechpartner für Ihre elektrische Anlage.",
    description:
      "Als Elektroservice und Kundendienst sind wir auch nach der Installation Ihr Ansprechpartner für die laufende Betreuung elektrischer Anlagen — von Wartung und wiederkehrenden Prüfungen bis zu kleineren Erweiterungen und Reparaturen im laufenden Betrieb.",
    icon: "support",
  },
];

export const aboutStats = [{ value: "7", label: "Jahre Berufserfahrung" }];
