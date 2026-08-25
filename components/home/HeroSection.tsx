import { HERO_SLIDES } from "@/data/hero";
import { findPublicAsset } from "@/lib/media";
import HeroCarousel from "./HeroCarousel";

/**
 * Full-bleed banner carousel — no card padding/radius, spans the whole app
 * column. The section right below it overlaps its bottom edge; see
 * `.diagonal-fillet-top` in globals.css.
 *
 * Drop images at public/home/hero/<slug>.{png,jpg,jpeg,webp} (slugs come
 * from data/hero.ts) and they appear automatically — no code change needed.
 */
export default function HeroSection() {
  const slides = HERO_SLIDES.map((slide) => ({
    ...slide,
    imageSrc: findPublicAsset(`home/hero/${slide.slug}`),
  }));

  return <HeroCarousel slides={slides} />;
}
