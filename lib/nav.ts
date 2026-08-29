/**
 * Product detail pages (/menu/<id>) are a focused, single-purpose screen —
 * the persistent bottom nav is deliberately hidden there so the sticky
 * purchase bar owns that space instead of stacking on top of it.
 */
export function isProductDetailRoute(pathname: string): boolean {
  return /^\/menu\/[^/]+$/.test(pathname);
}
