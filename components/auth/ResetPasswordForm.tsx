"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePasswordAction, type AuthFormState } from "@/app/actions/auth";
import { Field, StatusText, SubmitButton } from "./AuthFormControls";

const initialState: AuthFormState = { status: "idle", message: null };

export default function ResetPasswordForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    updatePasswordAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      router.push("/");
    }
  }, [state.status, router]);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <Field
        label="New Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
      />
      <Field
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
      />
      {state.status === "error" && (
        <StatusText tone="error">{state.message}</StatusText>
      )}
      <SubmitButton pending={pending}>Set New Password</SubmitButton>
    </form>
  );
}
