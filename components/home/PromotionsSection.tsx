import Image from "next/image";
import { PROMOTIONS } from "@/data/promotions";
import { findPublicAsset } from "@/lib/media";

export default function PromotionsSection() {
  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">Promotions</h2>
      <div className="px-gutter mt-3 flex flex-col gap-3">
        {PROMOTIONS.map((promo) => {
          const imageSrc = findPublicAsset(`home/promotions/${promo.slug}`);

          return (
            <div
              key={promo.slug}
              className="relative aspect-5/2 w-full overflow-hidden rounded-card bg-forest shadow-card"
            >
              {imageSrc ? (
                // A real image replaces the card entirely — no text overlay.
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  sizes="430px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-2 flex items-center justify-center rounded-[calc(var(--radius-card)-0.5rem)] border-2 border-dashed border-white/30 text-center">
                  <code className="text-xs text-white/70">
                    public/home/promotions/{promo.slug}.png
                  </code>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
