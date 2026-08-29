export type PaymentMethodId = "card" | "paynow" | "apple-pay" | "google-pay";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
};

// Placeholder catalog — Beamori intends to process payments via Stripe;
// these are the methods genuinely expected once that's wired up, not a
// copy of every method a reference app happens to show. None of these
// currently process a real payment.
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, and more",
  },
  {
    id: "paynow",
    label: "PayNow",
    description: "Pay via PayNow QR",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    description: "Pay with Face ID or Touch ID",
  },
  {
    id: "google-pay",
    label: "Google Pay",
    description: "Pay with your Google account",
  },
];

export function getPaymentMethodById(
  id: PaymentMethodId,
): PaymentMethod | undefined {
  return PAYMENT_METHODS.find((method) => method.id === id);
}
