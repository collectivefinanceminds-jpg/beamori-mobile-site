/**
 * Supabase/GoTrue error messages are backend-oriented ("Invalid login
 * credentials", raw rate-limit text). This maps the known ones to
 * Beamori-friendly copy and falls back to a generic message for anything
 * unrecognised, so raw backend errors never reach a customer.
 */
export function translateAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "That email or password doesn't look right. Please try again.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please verify your email before logging in — check your inbox for the confirmation link.";
  }
  if (lower.includes("already registered")) {
    return "An account with that email already exists — try logging in instead.";
  }
  if (lower.includes("profiles_display_name_lower_key")) {
    return "That username is already taken — please choose another.";
  }
  if (
    lower.includes("user not found") ||
    lower.includes("unable to validate email") ||
    lower.includes("signups not allowed for otp")
  ) {
    return "We couldn't find an account with that email — try signing up instead.";
  }

  const weakPasswordMatch = message.match(
    /password should be at least (\d+) characters/i,
  );
  if (weakPasswordMatch) {
    return `Password must be at least ${weakPasswordMatch[1]} characters.`;
  }

  if (
    lower.includes("rate limit") ||
    lower.includes("only request this after")
  ) {
    return "Too many attempts — please wait a moment and try again.";
  }
  if (lower.includes("network") || lower.includes("fetch failed")) {
    return "Network error — please check your connection and try again.";
  }

  return "Something went wrong. Please try again.";
}
