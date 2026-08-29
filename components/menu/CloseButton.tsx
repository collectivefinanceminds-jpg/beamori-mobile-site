"use client";

import { useRouter } from "next/navigation";
import { CloseIcon } from "@/components/home/HomeIcons";

/**
 * Uses router.back() (not a fixed href) so the customer returns to wherever
 * they were on the Menu, scroll position included, rather than to the top.
 */
export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Close"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card"
    >
      <CloseIcon className="h-5 w-5 text-ink" />
    </button>
  );
}
