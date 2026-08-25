import type { ReactNode } from "react";

/**
 * The white card that overlaps the hero banner's bottom edge with a
 * diagonal, filleted-corner top edge, creating a layered "depth" effect.
 *
 * The clip-path is an SVG <clipPath> using objectBoundingBox units, so the
 * diagonal and both fillets scale to the card's ACTUAL rendered width at any
 * phone size. A plain CSS clip-path: path() with hardcoded pixel coordinates
 * was tried first, tuned for the app's 430px max column width — but the
 * right fillet only started at x=418px, and every real phone (375–414px) is
 * narrower than that, so it was invisible on every real device, only
 * theoretically visible at the exact 430px maximum.
 *
 * Split into two stacked pieces sharing the same background colour so they
 * read as one seamless card: a small clipped "notch" strip carries the
 * diagonal shape (fixed 48px height, so its own fillet geometry is exact,
 * not dependent on the unpredictable height of everything below it), and
 * the plain rectangular body carries the actual content plus the bottom
 * corner fillets.
 */
export default function DiagonalOverlapCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="-mt-8">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-card-notch" clipPathUnits="objectBoundingBox">
            <path d="M0,0.25 Q0,0 0.0278,0.0185 L0.9722,0.6481 Q1,0.6667 1,0.9167 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="h-12 w-full bg-surface"
        style={{ clipPath: "url(#hero-card-notch)" }}
      />
      <div className="rounded-b-xl bg-surface pt-4 pb-section">
        {children}
      </div>
    </div>
  );
}
