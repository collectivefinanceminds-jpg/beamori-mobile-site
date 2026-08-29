import Link from "next/link";
import { ChevronRightIcon } from "@/components/home/HomeIcons";
import { getPaymentMethodById, type PaymentMethodId } from "@/data/paymentMethods";
import { renderPaymentMethodIcon } from "./PaymentIcons";

export default function PaymentMethodCard({
  paymentMethodId,
}: {
  paymentMethodId: PaymentMethodId | null;
}) {
  const method = paymentMethodId
    ? getPaymentMethodById(paymentMethodId)
    : undefined;

  return (
    <div className="px-gutter mt-4">
      <Link
        href="/checkout/payment-method"
        className="rounded-card flex items-center justify-between bg-surface p-4"
      >
        <div className="flex items-center gap-3">
          {method &&
            renderPaymentMethodIcon(method.id, {
              className: "h-5 w-5 shrink-0 text-forest",
            })}
          <div>
            <h2 className="text-sm font-semibold text-ink">Payment Method</h2>
            <p
              className={`mt-0.5 text-sm ${method ? "text-ink" : "text-muted"}`}
            >
              {method ? method.label : "Select payment method"}
            </p>
          </div>
        </div>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
      </Link>
    </div>
  );
}
