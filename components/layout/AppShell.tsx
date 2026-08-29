"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isProductDetailRoute } from "@/lib/nav";
import BottomNav from "./BottomNav";

/**
 * The global mobile application shell.
 *
 * Content is capped to a phone-width column and centred, so the layout reads
 * identically on a desktop browser and on a real handset — edge-to-edge on
 * phones, a centred app column on larger screens.
 *
 * BottomNav is hidden on product detail pages (/menu/<id>) — that screen's
 * own sticky purchase bar takes over the bottom of the viewport instead, so
 * the two don't stack.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = isProductDetailRoute(pathname);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
      <main className={`flex-1 ${hideNav ? "" : "pb-nav"}`}>{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
