import { ABOUT_SLIDES } from "@/data/about";
import { findPublicText } from "@/lib/content";
import { findPublicAsset } from "@/lib/media";
import AboutCarousel from "./AboutCarousel";

export default function AboutSection() {
  const slides = ABOUT_SLIDES.map((slide) => {
    const text = findPublicText(`home/about/${slide.slug}`);
    return {
      slug: slide.slug,
      title: text?.title || slide.title,
      description: text?.description || slide.description,
      imageSrc: findPublicAsset(`home/about/${slide.slug}`),
    };
  });

  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">About Us</h2>
      <div className="mt-3">
        <AboutCarousel slides={slides} />
      </div>
    </section>
  );
}
