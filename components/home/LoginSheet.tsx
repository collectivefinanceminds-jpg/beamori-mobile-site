"use client";

import { useActionState, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  requestLoginLinkAction,
  requestPasswordResetAction,
  signInAction,
  signUpAction,
  type AuthFormState,
  type LoginLinkFormState,
} from "@/app/actions/auth";
import { Field, StatusText, SubmitButton } from "@/components/auth/AuthFormControls";
import TermsContent from "@/components/auth/TermsContent";
import { CloseIcon } from "./HomeIcons";

type Mode =
  | "login"
  | "login-sent"
  | "login-password"
  | "signup"
  | "signup-sent"
  | "forgot"
  | "forgot-sent"
  | "terms";

const initialAuthFormState: AuthFormState = { status: "idle", message: null };
const initialLoginLinkState: LoginLinkFormState = { status: "idle", message: null };

const TITLES: Record<Mode, string> = {
  login: "Log In",
  "login-sent": "Check Your Email",
  "login-password": "Log In With Password",
  signup: "Sign Up",
  "signup-sent": "Check Your Email",
  forgot: "Forgot Password",
  "forgot-sent": "Check Your Email",
  terms: "Terms of Use & Privacy Policy",
};

/**
 * Bottom sheet covering up to ~85% of the viewport. Rendered via a portal
 * directly into document.body — this component lives inside the card with
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
  const [returnMode, setReturnMode] = useState<"login" | "signup">("login");
  const [lastIdentifier, setLastEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [loginLinkState, loginLinkFormAction, loginLinkPending] = useActionState(
    requestLoginLinkAction,
    initialLoginLinkState,
  );
  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    initialAuthFormState,
  );
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    signUpAction,
    initialAuthFormState,
  );
  const [resetState, resetFormAction, resetPending] = useActionState(
    requestPasswordResetAction,
    initialAuthFormState,
  );

  useEffect(() => {
    if (loginLinkState.status === "sent") setMode("login-sent");
  }, [loginLinkState.status]);

  useEffect(() => {
    if (signInState.status === "success") {
      router.refresh();
      onClose();
    }
  }, [signInState.status, router, onClose]);

  useEffect(() => {
    if (signUpState.status === "check-email") setMode("signup-sent");
    if (signUpState.status === "success") {
      router.refresh();
      onClose();
    }
  }, [signUpState.status, router, onClose]);

  useEffect(() => {
    if (resetState.status === "check-email") setMode("forgot-sent");
  }, [resetState.status]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const trackIdentifier = (event: ChangeEvent<HTMLInputElement>) => {
    setLastEmail(event.target.value);
  };

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
        aria-label={TITLES[mode]}
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">{TITLES[mode]}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {mode === "login" && (
          <>
            <form
              action={loginLinkFormAction}
              className="px-gutter flex flex-col gap-4 pt-6"
            >
              <Field
                label="Email or Username"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                onChange={trackIdentifier}
              />
              <Consent
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                marketingConsent={marketingConsent}
                setMarketingConsent={setMarketingConsent}
                onOpenTerms={() => {
                  setReturnMode("login");
                  setMode("terms");
                }}
              />
              {loginLinkState.status === "error" && (
                <StatusText tone="error">{loginLinkState.message}</StatusText>
              )}
              <SubmitButton pending={loginLinkPending} disabled={!termsAccepted}>
                Continue
              </SubmitButton>
            </form>
            <div className="px-gutter pt-3 text-center">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-sm font-semibold text-forest"
              >
                Forgot password?
              </button>
            </div>
            <FooterSwitch
              prompt="New to Beamori?"
              actionLabel="Sign up"
              onClick={() => setMode("signup")}
            />
          </>
        )}

        {mode === "login-sent" && (
          <PendingScreen>
            <p className="text-sm text-ink">
              We&apos;ve sent a login link to <strong>{lastIdentifier}</strong>. Tap the
              link in your email to log in.
            </p>
            <button
              type="button"
              onClick={() => setMode("login-password")}
              className="text-sm font-semibold text-forest"
            >
              Use password instead
            </button>
            <BackLink onClick={() => setMode("login")} />
          </PendingScreen>
        )}

        {mode === "login-password" && (
          <>
            <form
              action={signInFormAction}
              className="px-gutter flex flex-col gap-4 pt-6"
            >
              <Field
                label="Email or Username"
                name="identifier"
                type="text"
                autoComplete="username"
                defaultValue={lastIdentifier}
                required
              />
              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
              />
              {signInState.status === "error" && (
                <StatusText tone="error">{signInState.message}</StatusText>
              )}
              <SubmitButton pending={signInPending}>Log In</SubmitButton>
            </form>
            <div className="px-gutter flex items-center justify-between pt-4 pb-8 text-sm">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-muted underline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="font-semibold text-forest"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}

        {mode === "signup" && (
          <>
            <form
              action={signUpFormAction}
              className="px-gutter flex flex-col gap-4 pt-6"
            >
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={trackIdentifier}
              />
              <Field
                label="Mobile Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
              />
              <Field
                label="Preferred Username"
                name="displayName"
                type="text"
                autoComplete="nickname"
                required
              />
              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
              />
              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
              />
              <Consent
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                marketingConsent={marketingConsent}
                setMarketingConsent={setMarketingConsent}
                onOpenTerms={() => {
                  setReturnMode("signup");
                  setMode("terms");
                }}
              />
              {signUpState.status === "error" && (
                <StatusText tone="error">{signUpState.message}</StatusText>
              )}
              <SubmitButton pending={signUpPending} disabled={!termsAccepted}>
                Create Account
              </SubmitButton>
            </form>
            <FooterSwitch
              prompt="Already have an account?"
              actionLabel="Log in"
              onClick={() => setMode("login")}
            />
          </>
        )}

        {mode === "signup-sent" && (
          <PendingScreen>
            <p className="text-sm text-ink">
              We&apos;ve sent a confirmation link to <strong>{lastIdentifier}</strong>.
              Click it to finish creating your account.
            </p>
            <BackLink onClick={() => setMode("login")} label="Back to login" />
          </PendingScreen>
        )}

        {mode === "forgot" && (
          <>
            <form
              action={resetFormAction}
              className="px-gutter flex flex-col gap-4 pt-6"
            >
              <Field
                label="Email or Username"
                name="identifier"
                type="text"
                autoComplete="username"
                defaultValue={lastIdentifier}
                required
                onChange={trackIdentifier}
              />
              {resetState.status === "error" && (
                <StatusText tone="error">{resetState.message}</StatusText>
              )}
              <SubmitButton pending={resetPending}>Send Reset Link</SubmitButton>
            </form>
            <div className="px-gutter pt-4 pb-8">
              <BackLink onClick={() => setMode("login-password")} />
            </div>
          </>
        )}

        {mode === "forgot-sent" && (
          <PendingScreen>
            <p className="text-sm text-ink">{resetState.message}</p>
            <BackLink onClick={() => setMode("login")} label="Back to login" />
          </PendingScreen>
        )}

        {mode === "terms" && (
          <div className="px-gutter flex flex-col gap-4 pt-6 pb-10">
            <TermsContent />
            <BackLink onClick={() => setMode(returnMode)} label="Back" />
          </div>
        )}
      </div>
    </>,
    document.body,
  );
}

function Consent({
  termsAccepted,
  setTermsAccepted,
  marketingConsent,
  setMarketingConsent,
  onOpenTerms,
}: {
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  marketingConsent: boolean;
  setMarketingConsent: (value: boolean) => void;
  onOpenTerms: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-forest"
        />
        I consent to receiving Beamori&apos;s updates and promotions.
      </label>
      <div className="flex items-start gap-2 text-xs text-muted">
        <input
          type="checkbox"
          id="terms-checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-forest"
        />
        <label htmlFor="terms-checkbox">
          I have read and accept Beamori&apos;s{" "}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              onOpenTerms();
            }}
            className="font-semibold text-forest underline"
          >
            Terms of Use and Privacy Policy
          </button>
          .
        </label>
      </div>
    </div>
  );
}

function FooterSwitch({
  prompt,
  actionLabel,
  onClick,
}: {
  prompt: string;
  actionLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="px-gutter flex items-center justify-center gap-1 pt-6 pb-8 text-sm text-muted">
      <span>{prompt}</span>
      <button type="button" onClick={onClick} className="font-semibold text-forest">
        {actionLabel}
      </button>
    </div>
  );
}

function BackLink({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-medium text-muted underline"
    >
      {label}
    </button>
  );
}

function PendingScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-gutter flex flex-col items-center gap-4 pt-8 pb-10 text-center">
      {children}
    </div>
  );
}
