// Routes where the persistent bottom nav (and the floating cart pill) is
// hidden because the screen owns a sticky bar of its own at the bottom of
// the viewport, and the two would otherwise stack.
const NAV_HIDDEN_ROUTE_PATTERNS: RegExp[] = [
  /^\/menu\/[^/]+$/, // product detail
  /^\/checkout(\/.*)?$/, // checkout + its sub-routes
];

export function isNavHiddenRoute(pathname: string): boolean {
  return NAV_HIDDEN_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}
