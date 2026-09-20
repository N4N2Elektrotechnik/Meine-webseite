"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * Speichert eine neue Bewertung in Supabase (Tabelle reviews). Der
 * status wird bewusst NICHT aus dem Formular übernommen — die Spalte
 * hat den Default 'pending' und die RLS-Policy erzwingt zusätzlich
 * status = 'pending' bei jedem öffentlichen Insert (siehe
 * supabase/phase5-setup.sql). Neue Bewertungen sind also nie sofort
 * öffentlich sichtbar.
 */
export async function submitReview(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const rating = Number(formData.get("rating"));

  if (
    !name ||
    !email ||
    !text ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    redirect("/bewertungen?review=error");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert({
    name,
    email,
    rating,
    text,
  });

  if (error) {
    console.error("Bewertungsformular: Fehler beim Speichern", error);
    redirect("/bewertungen?review=error");
  }

  redirect("/bewertungen?review=success");
}
