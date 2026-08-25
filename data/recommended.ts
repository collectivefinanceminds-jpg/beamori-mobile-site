export type RecommendedProduct = {
  slug: string;
  name: string;
  priceCents: number;
  compareAtPriceCents?: number;
};

// Mock data — image for each item comes from public/home/recommended/<slug>.{jpg,png,webp}
export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    slug: "coconut-latte",
    name: "Coconut Latte",
    priceCents: 640,
    compareAtPriceCents: 800,
  },
  {
    slug: "velvet-latte",
    name: "Velvet Latte",
    priceCents: 640,
    compareAtPriceCents: 800,
  },
  {
    slug: "matcha-latte",
    name: "Matcha Latte",
    priceCents: 680,
  },
  {
    slug: "americano",
    name: "Americano",
    priceCents: 480,
    compareAtPriceCents: 600,
  },
];
