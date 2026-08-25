import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

/**
 * The global mobile application shell.
 *
 * Content is capped to a phone-width column and centred, so the layout reads
 * identically on a desktop browser and on a real handset — edge-to-edge on
 * phones, a centred app column on larger screens.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
      <main className="pb-nav flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
