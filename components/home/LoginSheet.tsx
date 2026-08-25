"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  signInAction,
  signUpAction,
  type AuthFormState,
} from "@/app/actions/auth";
import { CloseIcon } from "./HomeIcons";

type Mode = "login" | "signup";

const initialAuthFormState: AuthFormState = { status: "idle", message: null };

/**
 * Bottom sheet covering ~85% of the viewport. Rendered via a portal directly
 * into document.body — this component lives inside the card with
 * DiagonalOverlapCard's clip-path applied to it, and a clip-path ancestor
 * traps position:fixed descendants inside its own clipped bounds instead of
 * the viewport. Portalling out is what makes the sheet actually cover the
 * whole app instead of just that card.
 */
export default function LoginSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    initialAuthFormState,
  );
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    signUpAction,
    initialAuthFormState,
  );

  const activeState = mode === "login" ? signInState : signUpState;

  useEffect(() => {
    if (activeState.status === "success") {
      router.refresh();
      onClose();
    }
  }, [activeState.status, router, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="animate-scrim-in fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? "Log in" : "Sign up"}
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {mode === "login" ? (
          <form
            action={signInFormAction}
            className="px-gutter flex flex-col gap-4 pt-6 pb-6"
          >
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            {signInState.status === "error" && (
              <StatusText tone="error">{signInState.message}</StatusText>
            )}
            <SubmitButton pending={signInPending}>Log In</SubmitButton>
          </form>
        ) : (
          <form
            action={signUpFormAction}
            className="px-gutter flex flex-col gap-4 pt-6 pb-6"
          >
            <Field
              label="Display Name"
              name="displayName"
              type="text"
              autoComplete="name"
              required
            />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field
              label="Mobile Number"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <Field
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
            {signUpState.status === "error" && (
              <StatusText tone="error">{signUpState.message}</StatusText>
            )}
            {signUpState.status === "check-email" && (
              <StatusText tone="success">{signUpState.message}</StatusText>
            )}
            <SubmitButton pending={signUpPending}>Create Account</SubmitButton>
          </form>
        )}

        <div className="px-gutter flex items-center justify-center gap-1 pb-8 text-sm text-muted">
          {mode === "login" ? (
            <>
              <span>New to Beamori?</span>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-semibold text-forest"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-forest"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="rounded-btn bg-ivory px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
      />
    </label>
  );
}

function StatusText({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm ${tone === "error" ? "text-red-600" : "text-forest"}`}>
      {children}
    </p>
  );
}

function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-btn w-full py-3 text-sm font-semibold transition-colors ${
        pending
          ? "cursor-not-allowed bg-hairline text-muted"
          : "bg-forest text-white"
      }`}
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
