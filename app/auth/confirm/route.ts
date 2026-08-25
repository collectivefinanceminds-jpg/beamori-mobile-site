import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing point for every Supabase auth email link (magic-link login,
 * signup confirmation, password recovery). The project's email templates
 * use the default {{ .ConfirmationURL }} format, which — because
 * @supabase/ssr defaults to the PKCE flow — redirects here with a `code`
 * query param rather than a token in the URL hash. `next` tells us where to
 * send the customer afterwards (home for login/signup, /reset-password for
 * recovery).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/?authError=invalid-link`);
}
