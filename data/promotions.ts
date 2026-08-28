export type Promotion = {
  slug: string;
  /** Where the whole card links to. Omit for a non-interactive card. */
  href?: string;
};

// Mock data — image for each promo comes from public/home/promotions/<slug>.{jpg,png,webp}
//
// promo-1: future behaviour (not built yet) is to trigger a share-Beamori
// action instead of navigating anywhere — leave href unset until that's built.
export const PROMOTIONS: Promotion[] = [
  { slug: "promo-1" },
  { slug: "promo-2", href: "/menu?category=bundle-deals" },
];
