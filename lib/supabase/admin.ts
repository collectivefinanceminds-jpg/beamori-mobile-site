import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row Level Security entirely. Import this
 * ONLY from server-only code (Server Actions, Route Handlers). The
 * `server-only` import above makes any accidental client-component import
 * a build error rather than a silent key leak.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

/**
 * Resolves a username (profiles.display_name) to its email, server-side
 * only. Never return this value to the browser — it exists purely so a
 * Server Action can complete a signInWithPassword/signInWithOtp call
 * without the username-to-email mapping ever being queryable by a client
 * holding only the public anon key.
 */
export async function resolveEmailForUsername(
  username: string,
): Promise<string | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("email")
    .ilike("display_name", username)
    .maybeSingle();

  return data?.email ?? null;
}
