"use client";

import { useState } from "react";
import Image from "next/image";
import beamoriIcon from "@/public/brand/beamori-icon-black.png";
import { ChevronLeftIcon } from "./HomeIcons";
import LoginSheet from "./LoginSheet";

export default function SignUpTrigger() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="flex items-center justify-self-end gap-2"
      >
        <ChevronLeftIcon className="h-4 w-4 text-muted" />
        <span className="text-base font-semibold text-ink">Login / Sign up</span>
        <Image src={beamoriIcon} alt="" className="h-6 w-6" />
      </button>

      <LoginSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
