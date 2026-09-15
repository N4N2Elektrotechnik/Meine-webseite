import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

/**
 * Supabase-Client für Server Components, Route Handlers und Server
 * Actions. Verwendet ausschließlich die öffentliche URL und den
 * publishable Key (kein Service-Role-Key) — RLS-Policies in der
 * Datenbank entscheiden, was jeweils erlaubt ist.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll wird aus einer Server Component aufgerufen — dort
            // können keine Cookies gesetzt werden. Unbedenklich, solange
            // die Middleware Sessions aktualisiert (middleware.ts).
          }
        },
      },
    }
  );
}
