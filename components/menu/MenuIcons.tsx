import type { SVGProps } from "react";
import Icon from "@/components/icons/Icon";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.35-4.35" />
    </Icon>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5h2l1.6 9.6a2 2 0 0 0 2 1.7h6.8a2 2 0 0 0 2-1.6L19.5 9H7" />
      <circle cx="10" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
    </Icon>
  );
}
