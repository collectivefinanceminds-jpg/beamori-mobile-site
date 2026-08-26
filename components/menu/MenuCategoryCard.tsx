import type { ResolvedMenuCategory, ResolvedMenuProduct } from "./types";
import MenuProductRow from "./MenuProductRow";

/**
 * overflow-hidden on the card + sticky top-0 on the header is the classic
 * no-JS "per-section floating header" trick: the header sticks to the
 * viewport top only while this card is scrolling through, then the card's
 * own bottom edge naturally clips it away as the next card arrives.
 */
export default function MenuCategoryCard({
  category,
  products,
  registerRef,
}: {
  category: ResolvedMenuCategory;
  products: ResolvedMenuProduct[];
  registerRef: (categoryId: string, el: HTMLDivElement | null) => void;
}) {
  if (products.length === 0) return null;

  return (
    <div
      ref={(el) => registerRef(category.id, el)}
      data-category-id={category.id}
      className="overflow-hidden rounded-xl bg-surface shadow-card"
    >
      <h2 className="sticky top-0 z-10 bg-surface px-4 pt-4 pb-3 text-base font-bold text-ink">
        {category.name}
      </h2>
      <div className="flex flex-col">
        {products.map((product, index) => (
          <MenuProductRow
            key={product.id}
            product={product}
            showDivider={index < products.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
