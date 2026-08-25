import type { SVGProps } from "react";

/**
 * Shared stroke-icon wrapper. Hand-written inline SVG so the project stays
 * dependency-free — colour comes from the parent's text class via
 * `currentColor`.
 */
export default function Icon({
  children,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
      {...props}
    >
      {children}
    </svg>
  );
}
