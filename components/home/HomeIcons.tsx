import type { SVGProps } from "react";
import Icon from "@/components/icons/Icon";

type IconProps = SVGProps<SVGSVGElement>;

/** Standard four-colour Google "G" mark — visual only, no OAuth wired up. */
export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16 4 9.1 8.6 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.3C29.4 35.4 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.1 39.4 16 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.3 5.3C40.6 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

/** Visual-only — no Sign in with Apple wired up. */
export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.3 1c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-3 .8-.8 2-1.4 3-1.4Z" />
      <path d="M20.8 17.2c-.4 1-.9 1.9-1.6 2.7-.9 1.2-1.9 2.4-3.3 2.4-1.3 0-1.8-.8-3.3-.8s-2 .8-3.3.8c-1.3 0-2.4-1.3-3.3-2.5C4.4 17.9 3.5 14.7 4.7 12.4c.6-1.1 1.7-1.9 2.9-1.9 1.3 0 2.1.9 3.2.9 1 0 1.7-.9 3.3-.9 1.1 0 2.3.6 3.1 1.6-2.7 1.5-2.3 5.4.6 6.1Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m15 6-6 6 6 6" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

/**
 * Order Now action icon. Kept as an isolated component so it's a one-file
 * swap later — replace the JSX body or point it at an uploaded image.
 */
export function CupIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 8h11v6.5A4.5 4.5 0 0 1 11.5 19h-2A4.5 4.5 0 0 1 5 14.5V8Z" />
      <path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 4.5c-.6.6-.6 1.4 0 2M11 4.5c-.6.6-.6 1.4 0 2" />
    </Icon>
  );
}

/**
 * Membership action icon. Kept as an isolated component so it's a one-file
 * swap later — replace the JSX body or point it at an uploaded image.
 */
export function MembershipIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L12 3.5Z" />
    </Icon>
  );
}
