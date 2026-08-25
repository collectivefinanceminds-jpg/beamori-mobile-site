import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="px-gutter pt-section pb-section">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Reset Password
        </h1>
        <p className="mt-4 text-sm text-muted">
          This link is invalid or has expired. Please request a new password
          reset link.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-forest"
        >
          Back to Beamori
        </Link>
      </div>
    );
  }

  return (
    <div className="px-gutter pt-section pb-section">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Set a New Password
      </h1>
      <ResetPasswordForm />
    </div>
  );
}
