"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/home/HomeIcons";

/**
 * Collapsed state shows a 2-line clamp of the real content (not a separate
 * summary), so the card still communicates something before it's opened.
 * Expanded state swaps in the full `children`.
 */
export default function ToggleCard({
  title,
  preview,
  children,
}: {
  title: string;
  preview: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-card bg-surface px-8 py-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-ink">{title}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="mt-2">{children}</div>
      ) : (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {preview}
        </p>
      )}
    </div>
  );
}
