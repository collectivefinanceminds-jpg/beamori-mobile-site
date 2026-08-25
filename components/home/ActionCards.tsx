import Image from "next/image";
import Link from "next/link";
import { findPublicAsset } from "@/lib/media";
import { CupIcon, MembershipIcon } from "./HomeIcons";

const ACTIONS = [
  { href: "/menu", slug: "order-now", label: "Order Now", Icon: CupIcon },
  {
    href: "/account",
    slug: "membership",
    label: "Membership",
    Icon: MembershipIcon,
  },
] as const;

/**
 * Drop an image at public/home/actions/<slug>.{jpg,jpeg,png,webp} and it
 * replaces the tile entirely (icon + background included) — same
 * drop-in-file convention as the other homepage sections.
 */
export default function ActionCards() {
  return (
    <section className="px-gutter grid grid-cols-2 gap-3 pt-section">
      {ACTIONS.map(({ href, slug, label, Icon }) => {
        const imageSrc = findPublicAsset(`home/actions/${slug}`);

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="relative flex aspect-video items-center justify-center overflow-hidden bg-transparent"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={label}
                fill
                sizes="189px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-forest">
                <Icon className="h-5 w-5" />
              </span>
            )}
          </Link>
        );
      })}
    </section>
  );
}
