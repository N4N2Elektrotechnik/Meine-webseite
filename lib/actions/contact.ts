"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";
import { MAX_IMAGE_BYTES, MAX_IMAGES, MAX_TOTAL_IMAGE_BYTES } from "@/lib/contact-images";

type ImageAttachment = { filename: string; content: Buffer; contentType: string };

const HEIF_BRANDS = new Set(["heic", "heix", "heim", "heis", "hevc", "hevx", "mif1", "msf1", "heif"]);

/**
 * Bestimmt den Bildtyp anhand der ersten Bytes (Signatur) statt über
 * Dateiname/MIME-Typ — beides kann der Absender frei wählen.
 */
function detectImageType(bytes: Buffer): { contentType: string; extension: string } | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { contentType: "image/jpeg", extension: "jpg" };
  }
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { contentType: "image/png", extension: "png" };
  }
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") {
    return { contentType: "image/webp", extension: "webp" };
  }
  if (bytes.length >= 12 && bytes.toString("ascii", 4, 8) === "ftyp") {
    const brand = bytes.toString("ascii", 8, 12);
    if (HEIF_BRANDS.has(brand)) {
      return brand.startsWith("he") && brand !== "heif"
        ? { contentType: "image/heic", extension: "heic" }
        : { contentType: "image/heif", extension: "heif" };
    }
  }
  return null;
}

/**
 * Liest und prüft die optionalen Bildanhänge. Gibt `null` zurück, sobald
 * eine Regel verletzt ist (Anzahl, Größe, Typ) — die Anfrage wird dann
 * nicht gespeichert, damit der Kunde sie mit passenden Bildern erneut
 * senden kann.
 */
async function readImageAttachments(formData: FormData): Promise<ImageAttachment[] | null> {
  // Ein leeres Dateifeld sendet je nach Browser eine leere, namenlose Datei.
  const files = formData
    .getAll("images")
    .filter((entry): entry is File => typeof entry !== "string" && entry.size > 0);

  if (files.length > MAX_IMAGES) return null;
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_TOTAL_IMAGE_BYTES) return null;

  const attachments: ImageAttachment[] = [];
  for (const [index, file] of files.entries()) {
    if (file.size > MAX_IMAGE_BYTES) return null;
    const content = Buffer.from(await file.arrayBuffer());
    const type = detectImageType(content);
    if (!type) return null;

    // Nur unkritische Zeichen im Dateinamen, Endung passend zum echten Typ.
    const baseName = file.name
      .replace(/\.[^.]*$/, "")
      .replace(/[^\w-]+/g, "_")
      .slice(0, 60);
    attachments.push({
      filename: `${baseName || `bild-${index + 1}`}.${type.extension}`,
      content,
      contentType: type.contentType,
    });
  }
  return attachments;
}

const DEFAULT_MAIL_TO = "info@n4n2-elektrotechnik.de";
// Muss auf der bei Resend verifizierten Domain liegen. onboarding@resend.dev
// darf nur an die Adresse des Resend-Kontoinhabers senden und wird sonst von
// der API abgelehnt.
const DEFAULT_MAIL_FROM = "N4N2 Elektrotechnik <kontakt@n4n2-elektrotechnik.de>";

/**
 * Benachrichtigt info@n4n2-elektrotechnik.de per E-Mail über eine neue
 * Projektanfrage. Läuft NACH dem Supabase-Insert und darf dessen Erfolg
 * nicht gefährden: Schlägt der Mailversand fehl (z. B. fehlender/ungültiger
 * RESEND_API_KEY), landet die Anfrage trotzdem sicher in Supabase — nur der
 * Fehler wird geloggt.
 */
async function notifyContactMessage({
  name,
  email,
  phone,
  message,
  images,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
  images: ImageAttachment[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Kontaktformular: RESEND_API_KEY fehlt, überspringe E-Mail-Benachrichtigung");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || DEFAULT_MAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO || DEFAULT_MAIL_TO,
      replyTo: email,
      subject: `Neue Projektanfrage von ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone || "-"}`,
        `Bilder: ${images.length > 0 ? `${images.length} im Anhang` : "-"}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
      attachments: images.length > 0 ? images : undefined,
    });

    if (error) {
      console.error("Kontaktformular: Resend meldete einen Fehler", error);
    }
  } catch (error) {
    console.error("Kontaktformular: E-Mail-Benachrichtigung fehlgeschlagen", error);
  }
}

/**
 * Speichert eine Kontaktanfrage in Supabase (Tabelle contact_messages).
 * RLS erlaubt öffentliches Einfügen, Lesen/Löschen bleibt dem Admin
 * vorbehalten (siehe supabase/phase5-setup.sql).
 */
export async function submitContactMessage(formData: FormData) {
  // Honeypot: reguläre Nutzer sehen und befüllen dieses Feld nie (siehe
  // Contact.tsx, visuell + für Screenreader versteckt). Ist es trotzdem
  // ausgefüllt, war es vermutlich ein Bot — Anfrage wird ohne Fehlermeldung
  // stillschweigend verworfen, damit Bots daraus nichts lernen.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    redirect("/kontakt?contact=success");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const privacyConsent = formData.get("privacyConsent");

  if (!name || !email || !message || !privacyConsent) {
    redirect("/kontakt?contact=error");
  }

  const images = await readImageAttachments(formData);
  if (!images) {
    redirect("/kontakt?contact=images");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    message,
  });

  if (error) {
    console.error("Kontaktformular: Fehler beim Speichern", error);
    redirect("/kontakt?contact=error");
  }

  // Bilder gehen nur per E-Mail-Anhang raus, Supabase speichert weiterhin
  // nur den Text der Anfrage.
  await notifyContactMessage({ name, email, phone, message, images });

  redirect("/kontakt?contact=success");
}
