"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/components/home/HomeIcons";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Back"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card"
    >
      <ChevronLeftIcon className="h-5 w-5 text-ink" />
    </button>
  );
}
