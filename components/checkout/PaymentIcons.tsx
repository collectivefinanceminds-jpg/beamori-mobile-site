import type { ReactElement, SVGProps } from "react";
import { AppleIcon, GoogleIcon } from "@/components/home/HomeIcons";
import Icon from "@/components/icons/Icon";
import type { PaymentMethodId } from "@/data/paymentMethods";

type IconProps = SVGProps<SVGSVGElement>;

export function CardPaymentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </Icon>
  );
}

export function QrPaymentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <path d="M14.5 14.5h3v3h-3zM19.5 14.5v3M14.5 20.5h5" />
    </Icon>
  );
}

// Apple Pay / Google Pay reuse the existing sign-in mark components — these
// are the real providers' own icons (genuinely intended methods once
// Stripe is wired up), not anything copied from a reference app.
//
// Renders the icon directly (returns an already-built element) rather than
// handing back a component reference to render as <Icon />, which trips
// the static-components lint rule since a dynamically-selected component
// can't be proven stable across renders.
export function renderPaymentMethodIcon(
  id: PaymentMethodId,
  props: IconProps,
): ReactElement {
  switch (id) {
    case "card":
      return <CardPaymentIcon {...props} />;
    case "paynow":
      return <QrPaymentIcon {...props} />;
    case "apple-pay":
      return <AppleIcon {...props} />;
    case "google-pay":
      return <GoogleIcon {...props} />;
  }
}
