export type Promotion = {
  slug: string;
};

// Mock data — image for each promo comes from public/home/promotions/<slug>.{jpg,png,webp}
export const PROMOTIONS: Promotion[] = [{ slug: "promo-1" }, { slug: "promo-2" }];
