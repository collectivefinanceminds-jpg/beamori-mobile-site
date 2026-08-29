"use client";

import { useState } from "react";
import { findPromoCode } from "@/data/promoCodes";
import { useCheckout } from "./CheckoutContext";

type Status = "idle" | "loading" | "success" | "error";

/**
 * `promoCode` in CheckoutContext holds only a validated, applied code —
 * this component owns its own local input text and redemption status
 * separately, so a half-typed code never counts as "applied".
 */
export default function PromoCodeCard() {
  const { promoCode, setPromoCode } = useCheckout();
  const [inputValue, setInputValue] = useState(promoCode);
  const [status, setStatus] = useState<Status>(promoCode ? "success" : "idle");

  const handleRedeem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setStatus("loading");
    // Mock async redemption — no real backend yet.
    window.setTimeout(() => {
      const match = findPromoCode(trimmed);
      if (match) {
        setPromoCode(match.code);
        setStatus("success");
      } else {
        setPromoCode("");
        setStatus("error");
      }
    }, 600);
  };

  return (
    <div className="px-gutter mt-4">
      <div className="rounded-card bg-surface p-4">
        <h2 className="text-sm font-semibold text-ink">Promo Code</h2>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              setStatus("idle");
            }}
            placeholder="Enter promo code"
            className="min-w-0 flex-1 rounded-lg border border-hairline bg-ivory px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-forest focus:outline-none"
          />
          <button
            type="button"
            onClick={handleRedeem}
            disabled={!inputValue.trim() || status === "loading"}
            className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white disabled:bg-hairline disabled:text-muted"
          >
            {status === "loading" ? "Checking..." : "Redeem"}
          </button>
        </div>
        {status === "success" && (
          <p className="mt-2 text-xs font-medium text-forest">
            Promo code applied.
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs font-medium text-ink">
            That code isn&apos;t valid.
          </p>
        )}
      </div>
    </div>
  );
}
