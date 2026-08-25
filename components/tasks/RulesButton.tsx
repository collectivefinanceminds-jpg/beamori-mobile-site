"use client";

import { useState } from "react";

/**
 * Frontend placeholder only — no real rules content defined yet.
 */
export default function RulesButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-btn bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-card"
      >
        Rules
      </button>
      {open && (
        <div className="rounded-card absolute top-full right-0 z-10 mt-2 w-48 bg-surface p-3 text-xs text-muted shadow-card">
          Task rules will be available soon.
        </div>
      )}
    </div>
  );
}
