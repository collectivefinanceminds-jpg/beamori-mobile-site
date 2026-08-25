/**
 * Empty structural placeholder — same footprint as one Promotion card
 * (aspect-5/2, rounded-card). No design/content yet; only rendered for
 * authenticated customers by app/page.tsx.
 */
export default function TaskCenterSection() {
  return (
    <section className="pt-section">
      <h2 className="px-gutter text-lg font-semibold text-ink">Task Center</h2>
      <div className="px-gutter mt-3">
        <div className="relative aspect-5/2 w-full overflow-hidden rounded-card border-2 border-dashed border-hairline" />
      </div>
    </section>
  );
}
