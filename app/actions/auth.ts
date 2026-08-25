"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { translateAuthError } from "@/lib/supabase/errors";
import { getSiteUrl } from "@/lib/site";

export type AuthFormState = {
  status: "idle" | "error" | "success" | "check-email";
  message: string | null;
};

export type LoginLinkFormState = {
  status: "idle" | "error" | "sent" | "phone-unavailable";
  message: string | null;
};

/**
 * Login step 1: single email-or-phone box. Phone numbers can't actually be
 * sent an SMS yet (no provider configured in Supabase), so they're rejected
 * here with a friendly message rather than attempting a call that would
 * fail. Emails get a magic-link sign-in — shouldCreateUser is false because
 * this is the *login* entry point, not signup.
 */
export async function requestLoginLinkAction(
  _prevState: LoginLinkFormState,
  formData: FormData,
): Promise<LoginLinkFormState> {
  const identifier = String(formData.get("identifier") ?? "").trim();

  if (!identifier) {
    return { status: "error", message: "Please enter your email." };
  }

  if (!identifier.includes("@")) {
    return {
      status: "phone-unavailable",
      message: "Phone login is coming soon — please use your email instead.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: identifier,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${getSiteUrl()}/auth/confirm?next=/`,
    },
  });

  if (error) {
    return { status: "error", message: translateAuthError(error.message) };
  }

  return { status: "sent", message: null };
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "Please enter your email and password.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: "error", message: translateAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: null };
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!displayName) {
    return { status: "error", message: "Please enter a display name." };
  }
  if (!email) {
    return { status: "error", message: "Please enter your email." };
  }
  if (!phone) {
    return { status: "error", message: "Please enter your mobile number." };
  }
  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords don't match." };
  }

  const supabase = await createClient();

  const { data: isAvailable } = await supabase.rpc("is_username_available", {
    check_username: displayName,
  });
  if (isAvailable === false) {
    return {
      status: "error",
      message: "That username is already taken — please choose another.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/confirm?next=/`,
      data: {
        display_name: displayName,
        phone,
      },
    },
  });

  if (error) {
    return { status: "error", message: translateAuthError(error.message) };
  }

  if (!data.session) {
    return {
      status: "check-email",
      message: "Almost there — check your email to confirm your account.",
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: null };
}

/**
 * Always reports success (barring a genuine send failure) even if the email
 * has no account, so this can't be used to probe which emails are
 * registered.
 */
export async function requestPasswordResetAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Please enter your email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/confirm?next=/reset-password`,
  });

  if (error) {
    return { status: "error", message: translateAuthError(error.message) };
  }

  return {
    status: "check-email",
    message: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function updatePasswordAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords don't match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: "error", message: translateAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: null };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
