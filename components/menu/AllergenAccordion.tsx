"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/home/HomeIcons";

/**
 * Collapsed by default. Missing/empty `allergens` renders an honest
 * "no data yet" message instead of a blanket statement, since the real
 * source of truth will eventually be Beamori's own admin data.
 */
export default function AllergenAccordion({
  allergens,
}: {
  allergens?: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-card bg-surface p-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-ink">Allergens</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 text-sm text-muted">
          {allergens && allergens.length > 0 ? (
            <p>Contains: {allergens.join(", ")}.</p>
          ) : (
            <p>No specific allergen data available for this item yet.</p>
          )}
          <p className="mt-2 text-xs text-muted">
            Allergen information is provided as a guide only — final
            ingredient details are maintained by Beamori and may change.
          </p>
        </div>
      )}
    </div>
  );
}
