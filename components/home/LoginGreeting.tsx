"use client";

import { useState } from "react";
import Image from "next/image";
import beamoriIcon from "@/public/brand/beamori-icon-black.png";
import { ChevronLeftIcon } from "./HomeIcons";
import LoginSheet from "./LoginSheet";

/**
 * Mock-only auth state — no real login exists yet, this just lets the
 * logged-in vs logged-out homepage states be previewed and tested. Tapping
 * the "Welcome" row while logged in logs back out, for repeat testing.
 */
export default function LoginGreeting() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="px-gutter">
        <button
          type="button"
          onClick={() => setLoggedIn(false)}
          className="flex w-full items-center gap-2"
        >
          <Image src={beamoriIcon} alt="" className="h-6 w-6" />
          <span className="text-base font-semibold text-ink">
            Welcome, Guest!
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-gutter grid grid-cols-2 items-center">
      <span className="text-base font-medium text-ink">
        Miss me? <span aria-hidden="true">💚</span>
      </span>

      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="flex items-center justify-self-end gap-2"
      >
        <ChevronLeftIcon className="h-4 w-4 text-muted" />
        <span className="text-base font-semibold text-ink">Sign up</span>
        <Image src={beamoriIcon} alt="" className="h-6 w-6" />
      </button>

      <LoginSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onLoginSuccess={() => {
          setLoggedIn(true);
          setSheetOpen(false);
        }}
      />
    </div>
  );
}
