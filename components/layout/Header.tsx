import Image from "next/image";
import beamoriIcon from "@/public/brand/beamori-icon-black.png";

/**
 * Header with the real Beamori icon mark. The "Beamori" text next to it is a
 * plain wordmark label, not a styled recreation of the logo — swap in an
 * official logotype asset here if one becomes available.
 */
export default function Header() {
  return (
    <header className="px-gutter flex h-14 items-center gap-2">
      <Image
        src={beamoriIcon}
        alt="Beamori"
        className="h-8 w-8"
        priority
      />
      <span className="text-lg font-semibold tracking-tight text-ink">
        Beamori
      </span>
    </header>
  );
}
