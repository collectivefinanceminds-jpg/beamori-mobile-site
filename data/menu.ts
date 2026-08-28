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
export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "matcha", name: "Matcha", sortOrder: 1 },
  { id: "tea", name: "Tea", sortOrder: 2 },
  { id: "milk", name: "Milk", sortOrder: 3 },
  { id: "soda-spritz", name: "Soda Spritz", sortOrder: 4 },
  { id: "others", name: "Others", sortOrder: 5 },
  { id: "beamori-specials", name: "Beamori Specials", sortOrder: 6 },
  { id: "bundle-deals", name: "Bundle Deals", sortOrder: 7 },
];

// Flat placeholder price across the menu — matches the existing $6.80
// Matcha Latte price point in data/recommended.ts. Edit per-item once
// real pricing is decided.
const GENERAL_PRICE_CENTS = 680;

// Bundle placeholder prices are scaled roughly to item count rather than
// reusing the flat single-drink price, since a combo obviously isn't
// worth the same as one drink — still just a placeholder, edit freely.
const CHICKEN_POPPER_COMBO_PRICE_CENTS = 980;
const BUDDY_COMBO_PRICE_CENTS = 1380;

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
    id: "thai-bandung",
    name: "Thai Bandung",
    category: "milk",
    description: "Rose syrup and creamy milk, Thai-style",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "strawberry-milk",
    name: "Strawberry Milk",
    category: "milk",
    description: "Fresh strawberry blended with creamy milk",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "mango-milk",
    name: "Mango Milk",
    category: "milk",
    description: "Ripe mango blended with creamy milk",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "mango-spritz",
    name: "Mango Spritz",
    category: "soda-spritz",
    description: "Refreshing mango soda over ice",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "strawberry-spritz",
    name: "Strawberry Spritz",
    category: "soda-spritz",
    description: "Refreshing strawberry soda over ice",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
  },
  {
    id: "milo-gao",
    name: "Milo Gao",
    category: "others",
    description: "Thick, chocolatey Milo, extra malty",
    priceCents: GENERAL_PRICE_CENTS,
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
