import { getRecommendedProducts } from "@/lib/menu";
import { findPublicAsset } from "@/lib/media";
import ProductCard from "./ProductCard";

export default function RecommendedSection() {
  const products = getRecommendedProducts().map((product) => ({
    ...product,
    imageSrc: findPublicAsset(`menu/${product.id}`),
  }));

  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">
        Recommend for You
      </h2>
      <div className="px-gutter mt-3 flex gap-3 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
