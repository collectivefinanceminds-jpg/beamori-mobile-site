import { RECOMMENDED_PRODUCTS } from "@/data/recommended";
import ProductCard from "./ProductCard";

export default function RecommendedSection() {
  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">
        Recommend for You
      </h2>
      <div className="px-gutter mt-3 flex gap-3 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {RECOMMENDED_PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
