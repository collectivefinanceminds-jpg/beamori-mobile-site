import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, phone")
    .eq("id", user.id)
    .single();

  return (
    <div className="px-gutter pt-section pb-section">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Account
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        <InfoRow label="Display Name" value={profile?.display_name || "—"} />
        <InfoRow label="Email" value={user.email ?? "—"} />
        <InfoRow label="Mobile Number" value={profile?.phone || "—"} />
      </div>

      <form action={signOutAction} className="mt-8">
        <button
          type="submit"
          className="rounded-btn w-full bg-hairline py-3 text-sm font-semibold text-ink"
        >
          Log Out
        </button>
      </form>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-hairline pb-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
