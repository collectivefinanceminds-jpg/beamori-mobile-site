/* eslint-disable react-hooks/purity -- this component intentionally reads
   Math.random() during render: a fresh phrase on every server render is
   the actual feature, not an accidental impurity. */
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
        <span className="justify-self-end text-base font-semibold text-ink">
          Welcome, {displayName}!
        </span>
      ) : (
        <SignUpTrigger />
      )}
    </div>
  );
}
