"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AccountIcon,
  HomeIcon,
  MenuIcon,
  OrdersIcon,
} from "./NavIcons";

const TABS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/menu", label: "Menu", Icon: MenuIcon },
  { href: "/orders", label: "Orders", Icon: OrdersIcon },
  { href: "/account", label: "Account", Icon: AccountIcon },
] as const;

/**
 * Persistent bottom navigation.
 *
 * Fixed to the viewport bottom but width-matched to the app column, so it sits
 * under the content on desktop review and spans the full width on a phone.
 */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="pb-safe fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-hairline bg-surface"
    >
      <ul className="flex h-navbar items-stretch">
        {TABS.map(({ href, label, Icon }) => {
          // Exact match for Home; prefix match elsewhere so future nested
          // routes (e.g. /menu/latte) keep their parent tab active.
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? "text-forest" : "text-muted"
                }`}
              >
                <Icon />
                <span className="text-[0.6875rem] font-medium leading-none">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
