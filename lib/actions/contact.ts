"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * Speichert eine Kontaktanfrage in Supabase (Tabelle contact_messages).
 * RLS erlaubt öffentliches Einfügen, Lesen/Löschen bleibt dem Admin
 * vorbehalten (siehe supabase/phase5-setup.sql).
 */
export async function submitContactMessage(formData: FormData) {
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

  redirect("/?contact=success#kontakt");
}
