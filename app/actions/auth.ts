"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { translateAuthError } from "@/lib/supabase/errors";

export type AuthFormState = {
  status: "idle" | "error" | "success" | "check-email";
  message: string | null;
};

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
    return { status: "error", message: "Please enter your name." };
  }
  if (!email) {
    return { status: "error", message: "Please enter your email." };
  }
  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords don't match." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        phone: phone || null,
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

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
