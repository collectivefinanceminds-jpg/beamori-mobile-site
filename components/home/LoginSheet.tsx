"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, CloseIcon, MailIcon } from "./HomeIcons";

/**
 * Bottom sheet covering ~70% of the viewport, matching the reference layout
 * supplied for this component. Mock-only: the Email button is decorative,
 * but Continue does flip the app into the logged-in mock state (via
 * `onLoginSuccess`) so the post-login homepage can be tested.
 *
 * Rendered via a portal directly into document.body — this component lives
 * inside the card with .diagonal-fillet-top's clip-path applied to it, and a
 * clip-path ancestor traps position:fixed descendants inside its own
 * clipped bounds instead of the viewport. Portalling out is what makes the
 * sheet actually cover the whole app instead of just that card.
 */
export default function LoginSheet({
  open,
  onClose,
  onLoginSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

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
        aria-label="Login to continue"
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[70dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">
            Login To Continue
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

        <div className="px-gutter flex items-center justify-center pt-6">
          <button
            type="button"
            aria-label="Continue with Email"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline"
          >
            <MailIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="px-gutter flex items-center gap-3 pt-6">
          <span className="h-px flex-1 bg-hairline" />
          <span className="text-xs text-muted">or</span>
          <span className="h-px flex-1 bg-hairline" />
        </div>

        <div className="px-gutter pt-6">
          <span className="text-sm font-semibold text-ink">
            Enter Your Phone Number
          </span>
          <div className="mt-2 flex gap-2">
            <div className="rounded-btn flex items-center gap-1 bg-ivory px-3 py-2.5 text-sm text-ink">
              <span aria-hidden="true">🇸🇬</span>
              <span>+65</span>
              <ChevronDownIcon className="h-3 w-3 text-muted" />
            </div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Phone Number"
              className="rounded-btn flex-1 bg-ivory px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div className="px-gutter flex flex-col gap-3 pt-6">
          <label className="flex items-start gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-forest"
            />
            I consent to receiving Beamori&apos;s updates and promotions.
          </label>
          <label className="flex items-start gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-forest"
            />
            I have read and accept Beamori&apos;s Terms of Use and Privacy
            Policy.
          </label>
        </div>

        <div className="px-gutter pb-4 pt-6">
          <button
            type="button"
            disabled={!termsAccepted}
            onClick={onLoginSuccess}
            className={`rounded-btn w-full py-3 text-sm font-semibold transition-colors ${
              termsAccepted
                ? "bg-forest text-white"
                : "cursor-not-allowed bg-hairline text-muted"
            }`}
          >
            Continue
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 pb-6 text-sm text-ink">
          <span aria-hidden="true">🇸🇬</span>
          <span>Singapore</span>
          <ChevronDownIcon className="h-3 w-3 text-muted" />
        </div>
      </div>
    </>,
    document.body,
  );
}
