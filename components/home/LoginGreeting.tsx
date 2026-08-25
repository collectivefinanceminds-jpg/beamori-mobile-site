import Image from "next/image";
import beamoriIcon from "@/public/brand/beamori-icon-black.png";
import { signOutAction } from "@/app/actions/auth";
import SignUpTrigger from "./SignUpTrigger";

/**
 * Server component — reads the real Supabase session (via app/page.tsx) so
 * the greeting is correct on first paint, with no logged-out flash before
 * switching to the logged-in state.
 */
export default function LoginGreeting({
  displayName,
}: {
  displayName: string | null;
}) {
  if (displayName) {
    return (
      <div className="px-gutter">
        <form action={signOutAction} className="flex w-full items-center gap-2">
          <Image src={beamoriIcon} alt="" className="h-6 w-6" />
          <span className="text-base font-semibold text-ink">
            Welcome, {displayName}!
          </span>
          <button
            type="submit"
            className="ml-auto text-xs font-medium text-muted underline"
          >
            Log out
          </button>
        </form>
      </div>
    );
  }

  return <SignUpTrigger />;
}
