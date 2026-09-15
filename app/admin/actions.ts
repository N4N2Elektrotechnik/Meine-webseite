"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/admin/login?error=1");
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function approveReview(id: string) {
  const supabase = await createClient();
  await supabase.from("reviews").update({ status: "approved" }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectReview(id: string) {
  const supabase = await createClient();
  await supabase.from("reviews").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}

export async function deleteReview(id: string) {
  const supabase = await createClient();
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin");
}
