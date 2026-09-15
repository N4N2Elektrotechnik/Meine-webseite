"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

const DEFAULT_MAIL_TO = "info@n4n2-elektrotechnik.de";
const DEFAULT_MAIL_FROM = "N4N2 Elektrotechnik <onboarding@resend.dev>";

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
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
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
        "",
        "Nachricht:",
        message,
      ].join("\n"),
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
    redirect("/?contact=success#kontakt");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const privacyConsent = formData.get("privacyConsent");

  if (!name || !email || !message || !privacyConsent) {
    redirect("/?contact=error#kontakt");
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
    redirect("/?contact=error#kontakt");
  }

  await notifyContactMessage({ name, email, phone, message });

  redirect("/?contact=success#kontakt");
}
