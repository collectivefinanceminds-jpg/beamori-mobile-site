"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/home/HomeIcons";
import { REMARKS_CONFIG } from "@/data/checkoutConfig";

const NAPKIN_OPTIONS: { label: string; value: boolean }[] = [
  { label: "No", value: false },
  { label: "Yes", value: true },
];

export default function SpecialRemarksSheet({
  initialNapkins,
  initialRemarks,
  onClose,
  onDone,
}: {
  initialNapkins: boolean;
  initialRemarks: string;
  onClose: () => void;
  onDone: (napkins: boolean, remarks: string) => void;
}) {
  const [napkins, setNapkins] = useState(initialNapkins);
  const [remarks, setRemarks] = useState(initialRemarks);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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
        aria-label="Special remarks"
        className="animate-sheet-in pb-safe fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-y-auto rounded-t-card bg-surface"
      >
        <div className="px-gutter flex items-center justify-between pt-5">
          <h2 className="text-lg font-semibold text-ink">Special Remarks</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="px-gutter mt-5">
          <h3 className="text-sm font-semibold text-ink">Napkin</h3>
          <div className="mt-2 flex gap-2">
            {NAPKIN_OPTIONS.map((option) => {
              const isActive = napkins === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setNapkins(option.value)}
                  aria-pressed={isActive}
                  className={`rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "bg-forest text-white" : "bg-hairline text-ink"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-gutter mt-5 pb-6">
          <h3 className="text-sm font-semibold text-ink">Additional Notes</h3>
          <textarea
            value={remarks}
            onChange={(event) =>
              setRemarks(event.target.value.slice(0, REMARKS_CONFIG.maxLength))
            }
            maxLength={REMARKS_CONFIG.maxLength}
            rows={4}
            placeholder="Any notes for the café?"
            className="mt-2 w-full resize-none rounded-lg border border-hairline bg-ivory px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-forest focus:outline-none"
          />
          <p className="mt-1 text-right text-xs text-muted">
            {remarks.length} / {REMARKS_CONFIG.maxLength}
          </p>
        </div>

        <div className="px-gutter pb-6">
          <button
            type="button"
            onClick={() => onDone(napkins, remarks)}
            className="rounded-btn w-full bg-forest py-3.5 text-center text-base font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
