import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

/**
 * Supabase-Client für Client Components. Verwendet ausschließlich die
 * öffentliche URL und den publishable Key — bewusst kein Service-Role-Key,
 * der darf niemals im Browser-Bundle landen.
 */
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
