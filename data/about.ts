export type AboutSlide = {
  slug: string;
  title: string;
  description: string;
};

// Fallback text — used only if public/home/about/<slug>.txt doesn't exist.
// To edit the actual displayed text, edit the .txt file, not this file: no
// quotes/commas/syntax to get wrong, just plain text.
// Image for each slide comes from public/home/about/<slug>.{png,jpg,webp}
export const ABOUT_SLIDES: AboutSlide[] = [
  {
    slug: "founder-story",
    title: "Our Founder's Story",
    description:
      "How Beamori started as a home-base café built around a love of good coffee and dessert.",
  },
  {
    slug: "coffee-beans",
    title: "Source of Our Coffee Beans",
    description:
      "Ethically sourced single-origin beans, roasted for balance and depth.",
  },
  {
    slug: "matcha-grade",
    title: "Highest Grade Matcha",
    description: "Ceremonial-grade matcha, whisked fresh for every order.",
  },
  {
    slug: "professional-recipes",
    title: "Recipes by Professionals",
    description:
      "Every drink on our menu is developed and tested by trained baristas.",
  },
];
