"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/home/HomeIcons";
import { useCheckout } from "./CheckoutContext";
import SpecialRemarksSheet from "./SpecialRemarksSheet";

export default function SpecialRemarksCard() {
  const { napkins, remarks, setSpecialRemarks } = useCheckout();
  const [sheetOpen, setSheetOpen] = useState(false);

  const summary = remarks.trim()
    ? remarks.trim()
    : napkins
      ? "Napkins requested"
      : null;

  return (
    <div className="px-gutter mt-4">
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="rounded-card flex w-full items-center justify-between bg-surface p-4 text-left"
      >
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-ink">Special Remarks</h2>
          <p
            className={`mt-0.5 truncate text-sm ${summary ? "text-ink" : "text-muted"}`}
          >
            {summary ?? "Add a note for the café"}
          </p>
        </div>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
      </button>

      {sheetOpen && (
        <SpecialRemarksSheet
          initialNapkins={napkins}
          initialRemarks={remarks}
          onClose={() => setSheetOpen(false)}
          onDone={(nextNapkins, nextRemarks) => {
            setSpecialRemarks(nextNapkins, nextRemarks);
            setSheetOpen(false);
          }}
        />
      )}
    </div>
  );
}
