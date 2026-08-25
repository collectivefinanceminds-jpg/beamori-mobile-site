/**
 * Placeholder legal copy — replace with reviewed Terms of Use / Privacy
 * Policy text before this goes live. Kept as plain paragraphs (not a
 * drop-in .txt file like the About Us section) since it's a single
 * long-form legal document, not repeatable per-slide content.
 */
export default function TermsContent() {
  return (
    <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink">
      <section>
        <h3 className="font-semibold">1. Acceptance of Terms</h3>
        <p className="mt-1 text-muted">
          By creating a Beamori account or using the Beamori app, you agree
          to these Terms of Use and to the Privacy Policy below. If you do
          not agree, please do not create an account.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">2. Your Account</h3>
        <p className="mt-1 text-muted">
          You&apos;re responsible for keeping your password confidential and
          for all activity under your account. Your display name is shown
          to you as a greeting inside the app; it is not shared publicly
          outside your own session.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">3. Orders &amp; Payment</h3>
        <p className="mt-1 text-muted">
          Orders placed through Beamori are subject to item availability at
          our home-base café. Prices are shown in Singapore Dollars (SGD)
          and may change without notice.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">4. Acceptable Use</h3>
        <p className="mt-1 text-muted">
          Please don&apos;t use Beamori to attempt unauthorised access to
          other customers&apos; accounts or data, or to interfere with the
          normal operation of the app.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">5. Changes to These Terms</h3>
        <p className="mt-1 text-muted">
          We may update these terms from time to time. Continued use of
          Beamori after a change means you accept the updated terms.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">6. Privacy Policy</h3>
        <p className="mt-1 text-muted">
          We collect your email, mobile number, and display name to create
          and secure your account. Passwords are never stored by Beamori —
          authentication is handled by Supabase. We don&apos;t sell your
          personal data to third parties.
        </p>
      </section>

      <section>
        <h3 className="font-semibold">7. Contact</h3>
        <p className="mt-1 text-muted">
          Questions about these terms? Reach out to us through the contact
          details on our homepage.
        </p>
      </section>
    </div>
  );
}
