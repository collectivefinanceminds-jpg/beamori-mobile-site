export type MenuCategory = {
  id: string;
  name: string;
  sortOrder: number;
};

export type CustomisationOption = {
  id: string;
  label: string;
  /** In cents, added to the base price when this option is selected. */
  priceAdjustmentCents: number;
  available: boolean;
};

export type CustomisationGroup = {
  id: string;
  label: string;
  required: boolean;
  selectionType: "single" | "multiple";
  /**
   * Order is meaningful — the first available option is auto-selected when
   * the product page opens. Follow this hierarchy: the most common choice
   * first, then a "None"-style opt-out option (if the group has one), then
   * any other no-cost variants, and any option that costs extra
   * ("requires a top-up") always last. This keeps the auto-selected
   * default free, never a paid option.
   */
  options: CustomisationOption[];
};

export type MenuProduct = {
  id: string;
  name: string;
  category: string;
  /** Short blurb shown on the Menu list. */
  description?: string;
  /** Longer copy shown on the product page — distinct from `description`. */
  longDescription?: string;
  priceCents: number;
  compareAtPriceCents?: number;
  available: boolean;
  limitedTime?: boolean;
  /** Common allergens this item contains — undefined/empty means "no data yet", not "none". */
  allergens?: string[];
  customisationGroups?: CustomisationGroup[];
  /** Other product ids suggested as add-ons on this item's product page. */
  recommendedAddOnIds?: string[];
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

// Every product gets Size and Sweetness — the two universal groups. The
// admin tooling planned for later is what will let specific drinks swap
// these out or add their own one-off options; for now every product shares
// the same two group definitions.
const SIZE_GROUP: CustomisationGroup = {
  id: "size",
  label: "Size",
  required: true,
  selectionType: "single",
  options: [
    { id: "regular", label: "Regular", priceAdjustmentCents: 0, available: true },
    // Placeholder upcharge — edit once real Large pricing is decided.
    { id: "large", label: "Large", priceAdjustmentCents: 100, available: true },
  ],
};

const SWEETNESS_GROUP: CustomisationGroup = {
  id: "sweetness",
  label: "Sweetness",
  required: true,
  selectionType: "single",
  options: [
    { id: "regular", label: "Regular", priceAdjustmentCents: 0, available: true },
    { id: "no-sweet", label: "No Sweet", priceAdjustmentCents: 0, available: true },
    { id: "more-sweet", label: "More Sweet", priceAdjustmentCents: 0, available: true },
    { id: "less-sweet", label: "Less Sweet", priceAdjustmentCents: 0, available: true },
  ],
};

const STANDARD_GROUPS: CustomisationGroup[] = [SIZE_GROUP, SWEETNESS_GROUP];

// Chicken Poppers is the only snack today, so it's the one add-on every
// drink can suggest — not a random pick.
const SNACK_ADD_ON_IDS = ["chicken-poppers"];

export const MENU_PRODUCTS: MenuProduct[] = [
  {
    id: "regular-matcha",
    name: "Regular Matcha",
    category: "matcha",
    description: "Smooth and silky ceremonial matcha",
    longDescription:
      "Our house ceremonial-grade matcha, whisked smooth and silky with milk over ice. Clean, gently vegetal, and balanced — a good starting point if you're new to matcha.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    category: "matcha",
    description: "Ceremonial matcha with real strawberry",
    longDescription:
      "Ceremonial-grade matcha layered with real strawberry for a naturally sweet, fruity twist on our house matcha.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "mango-matcha",
    name: "Mango Matcha",
    category: "matcha",
    description: "Ceremonial matcha with sweet mango",
    longDescription:
      "Ceremonial-grade matcha paired with sweet mango for a bright, tropical take on our house matcha.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "beamori-house-tea",
    name: "Beamori House Sweet Tea",
    category: "tea",
    description: "A house blend of Hojicha, Darjeeling and Earl Grey",
    longDescription:
      "Our house tea blend brings together roasted Hojicha, floral Darjeeling and fragrant Earl Grey, steeped and served sweet over ice.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: [],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "house-blend-teh-tarik",
    name: "Signature Teh-Tarik",
    category: "tea",
    description: "A spiced Chai and Thai Tea blend inspired by classic Teh-Tarik",
    longDescription:
      "A spiced Chai and Thai Tea blend pulled the classic Teh-Tarik way for a frothy top and rich, milky body.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "milo-gao",
    name: "Milo Gao",
    category: "singapore-classics",
    description: "Rich, chocolatey Milo made extra thick and malty",
    longDescription:
      "Classic Milo Gao — rich, chocolatey and made extra thick and malty, the way it's meant to be.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "kopi",
    name: "Kopi",
    category: "singapore-classics",
    description: "Traditional local coffee with condensed milk",
    longDescription:
      "Traditional local-style coffee, brewed strong and finished with condensed milk for that classic kopitiam sweetness.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "kopi-o",
    name: "Kopi-O",
    category: "singapore-classics",
    description: "Traditional black coffee sweetened with sugar, without milk",
    longDescription:
      "Traditional black coffee, brewed strong and sweetened with sugar — no milk, just coffee.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: [],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "chicken-poppers",
    name: "Chicken Poppers",
    category: "snacks",
    description:
      "Crispy popcorn chicken seasoned with Beamori's spicy umami seasoning blend",
    longDescription:
      "Crispy popcorn chicken tossed in Beamori's own spicy umami seasoning blend, made with seaweed, sichuan peppercorns, citric acid, chicken powder, chilli powder, garlic and onion powder.",
    priceCents: CHICKEN_POPPERS_PRICE_CENTS,
    available: true,
    allergens: ["Gluten", "Soy"],
    customisationGroups: STANDARD_GROUPS,
  },
  {
    id: "mango-sticky-rice-matcha",
    name: "Mango Sticky Rice Matcha",
    category: "beamori-specials",
    description:
      "Ceremonial matcha with mango and mango sticky rice-inspired flavours",
    longDescription:
      "Ceremonial-grade matcha reimagined around the flavours of mango sticky rice — sweet mango and a hint of coconut alongside our house matcha.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    limitedTime: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "thai-bandung-matcha",
    name: "Thai Bandung Matcha",
    category: "beamori-specials",
    description:
      "Ceremonial matcha with the floral sweetness of classic Thai Bandung",
    longDescription:
      "Ceremonial-grade matcha meets the floral sweetness of classic Thai Bandung, layered with rose syrup and creamy milk.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    limitedTime: true,
    allergens: ["Milk"],
    customisationGroups: STANDARD_GROUPS,
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "earl-grey-matcha",
    name: "Earl Grey Matcha",
    category: "beamori-specials",
    description:
      "Ceremonial matcha with Earl Grey-infused whole milk and Earl Grey sea salt cold foam",
    longDescription:
      "Ceremonial-grade matcha layered with Earl Grey-infused whole milk and finished with an Earl Grey sea salt cold foam.",
    priceCents: GENERAL_PRICE_CENTS,
    available: true,
    allergens: ["Milk"],
    customisationGroups: [
      ...STANDARD_GROUPS,
      {
        id: "milk",
        label: "Milk",
        required: true,
        selectionType: "single",
        options: [
          {
            id: "earl-grey-milk",
            label: "Earl Grey Milk",
            priceAdjustmentCents: 0,
            available: true,
          },
          { id: "regular-milk", label: "Regular Milk", priceAdjustmentCents: 0, available: true },
          { id: "oat-milk", label: "Oat Milk", priceAdjustmentCents: 50, available: true },
        ],
      },
      {
        id: "cold-foam",
        label: "Cold Foam",
        required: true,
        selectionType: "single",
        options: [
          { id: "no-foam", label: "None", priceAdjustmentCents: 0, available: true },
          {
            id: "vanilla-foam",
            label: "Vanilla Cold Foam",
            priceAdjustmentCents: 100,
            available: true,
          },
        ],
      },
    ],
    recommendedAddOnIds: SNACK_ADD_ON_IDS,
  },
  {
    id: "chicken-popper-combo",
    name: "Chicken Popper Combo",
    category: "bundle-deals",
    description: "1 drink + 1 serving of Chicken Poppers",
    longDescription:
      "A combo built for one: your choice of drink paired with a serving of Chicken Poppers.",
    priceCents: CHICKEN_POPPER_COMBO_PRICE_CENTS,
    available: true,
    allergens: ["Milk", "Gluten", "Soy"],
    customisationGroups: STANDARD_GROUPS,
  },
  {
    id: "buddy-combo",
    name: "Buddy Combo",
    category: "bundle-deals",
    description: "2 drinks + 1 snack",
    longDescription:
      "A combo built for two: two drinks paired with a snack to share.",
    priceCents: BUDDY_COMBO_PRICE_CENTS,
    available: true,
    allergens: ["Milk", "Gluten", "Soy"],
    customisationGroups: STANDARD_GROUPS,
  },
];

export function getProductById(id: string): MenuProduct | undefined {
  return MENU_PRODUCTS.find((product) => product.id === id);
}
