export type MenuCategory = {
  id: string;
  name: string;
  sortOrder: number;
};

export type MenuProduct = {
  id: string;
  name: string;
  category: string;
  description?: string;
  priceCents: number;
  compareAtPriceCents?: number;
  available: boolean;
  limitedTime?: boolean;
};

// Cold Foam and matcha's milk choices are customisation options for a
// future product-detail flow, not standalone browsable categories.
//
// Order: Bundle Deals first, Beamori Specials/Singapore Classics second,
// Matcha third, everything else fourth (Snacks placed right after Matcha).
export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "bundle-deals", name: "Bundle Deals", sortOrder: 1 },
  { id: "beamori-specials", name: "Beamori Specials", sortOrder: 2 },
  { id: "singapore-classics", name: "Singapore Classics", sortOrder: 3 },
  { id: "matcha", name: "Matcha", sortOrder: 4 },
  { id: "snacks", name: "Snacks", sortOrder: 5 },
  { id: "tea", name: "Tea", sortOrder: 6 },
];

// Flat placeholder price across the menu. Edit per-item once real
// pricing is decided.
const GENERAL_PRICE_CENTS = 680;

// Bundle placeholder prices are scaled roughly to item count rather than
// reusing the flat single-drink price, since a combo obviously isn't
// worth the same as one drink — still just a placeholder, edit freely.
const CHICKEN_POPPER_COMBO_PRICE_CENTS = 980;
const BUDDY_COMBO_PRICE_CENTS = 1380;
const CHICKEN_POPPERS_PRICE_CENTS = 480;

export const MENU_PRODUCTS: MenuProduct[] = [
  {
    id: "regular-matcha",
    name: "Regular Matcha",
    category: "matcha",
    description: "Silky ceremonial-grade matcha",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    category: "matcha",
    description: "Ceremonial matcha with real strawberry",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "mango-matcha",
    name: "Mango Matcha",
    category: "matcha",
    description: "Ceremonial matcha with sweet mango",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "beamori-house-tea",
    name: "Beamori House Tea",
    category: "tea",
    description: "Hojicha, Darjeeling & Earl Grey",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "house-blend-teh-tarik",
    name: "House Blend Teh-Tarik",
    category: "tea",
    description: "Spiced Chai & Thai Tea",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "milo-gao",
    name: "Milo Gao",
    category: "singapore-classics",
    description: "Thick, chocolatey Milo, extra malty",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "kopi",
    name: "Kopi",
    category: "singapore-classics",
    description: "Traditional local coffee with condensed milk",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "kopi-o",
    name: "Kopi-O",
    category: "singapore-classics",
    description: "Black coffee sweetened with sugar, no milk",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "chicken-poppers",
    name: "Chicken Poppers",
    category: "snacks",
    description:
      "Popcorn chicken seasoned with Beamori's own spicy umami seasoning blend (made with seaweed, sichuan peppercorns, citric acid, chicken powder, MSG, chilli powder, garlic and onion powder)",
    priceCents: CHICKEN_POPPERS_PRICE_CENTS,
    available: true,
  },
  {
    id: "mango-sticky-rice-matcha",
    name: "Mango Sticky Rice Matcha",
    category: "beamori-specials",
    description: "Matcha meets mango sticky rice dessert",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    limitedTime: true,
  },
  {
    id: "thai-bandung-matcha",
    name: "Thai Bandung Matcha",
    category: "beamori-specials",
    description: "Matcha meets classic Thai Bandung",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    limitedTime: true,
  },
  {
    id: "earl-grey-matcha",
    name: "Earl Grey Matcha",
    category: "beamori-specials",
    description: "Ceremonial matcha with a fragrant Earl Grey infusion",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "chicken-popper-combo",
    name: "Chicken Popper Combo",
    category: "bundle-deals",
    description: "1 drink + 1 chicken poppers",
    priceCents: CHICKEN_POPPER_COMBO_PRICE_CENTS,
    available: true,
  },
  {
    id: "buddy-combo",
    name: "Buddy Combo",
    category: "bundle-deals",
    description: "2 drinks + 1 snack",
    priceCents: BUDDY_COMBO_PRICE_CENTS,
    available: true,
  },
];

export function getProductById(id: string): MenuProduct | undefined {
  return MENU_PRODUCTS.find((product) => product.id === id);
}
