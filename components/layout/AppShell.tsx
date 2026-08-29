"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isNavHiddenRoute } from "@/lib/nav";
import CartOverlay from "@/components/menu/CartOverlay";
import BottomNav from "./BottomNav";

/**
 * The global mobile application shell.
 *
 * Content is capped to a phone-width column and centred, so the layout reads
 * identically on a desktop browser and on a real handset — edge-to-edge on
 * phones, a centred app column on larger screens.
 *
 * BottomNav is hidden on routes with their own sticky bottom bar (product
 * detail pages, Checkout) — see lib/nav.ts. CartOverlay is always mounted
 * here (cart is app-wide) but self-gates its own visibility the same way.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = isNavHiddenRoute(pathname);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
      <main className={`flex-1 ${hideNav ? "" : "pb-nav"}`}>{children}</main>
      <CartOverlay />
      {!hideNav && <BottomNav />}
    </div>
  );
}
