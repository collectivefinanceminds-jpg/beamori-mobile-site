import Image from "next/image";
import beamoriIcon from "@/public/brand/beamori-icon-black.png";
import { signOutAction } from "@/app/actions/auth";
import SignUpTrigger from "./SignUpTrigger";

const GREETING_PHRASES = [
  "Miss me?",
  "Looking thirsty!",
  "How's the weather?",
  "Craving something?",
  "Back again?",
  "Ready for a sip?",
  "Long time no brew!",
  "Thirsty much?",
];

/**
 * Server component — reads the real Supabase session (via app/page.tsx) so
 * the greeting is correct on first paint, with no logged-out flash before
 * switching to the logged-in state. The phrase is picked fresh on every
 * request (page load/refresh/reopen), not on a client-side interval.
 */
export default function LoginGreeting({
  displayName,
}: {
  displayName: string | null;
}) {
  const phrase =
    GREETING_PHRASES[Math.floor(Math.random() * GREETING_PHRASES.length)];

  return (
    <div className="px-gutter grid grid-cols-2 items-center">
      <span className="text-base font-medium text-ink">
        {phrase} <span aria-hidden="true">💚</span>
      </span>

      {displayName ? (
        <form
          action={signOutAction}
          className="flex items-center justify-self-end gap-2"
        >
          <Image src={beamoriIcon} alt="" className="h-6 w-6" />
          <span className="text-base font-semibold text-ink">
            Welcome, {displayName}!
          </span>
          <button
            type="submit"
            className="text-xs font-medium text-muted underline"
          >
            Log out
          </button>
        </form>
      ) : (
        <SignUpTrigger />
      )}
    </div>
  );
}
