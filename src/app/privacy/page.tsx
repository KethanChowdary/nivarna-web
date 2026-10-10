import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice | Nivarna Advisors",
  description:
    "How Nivarna Advisors collects and uses information submitted through its website.",
};

const updatedOn = "9 October 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm font-medium text-[#8d672d] hover:text-[#0c304b]">
        Back to Nivarna Advisors
      </Link>
      <h1 className="mt-8 font-serif text-4xl font-medium text-slate-900">
        Privacy Notice
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: {updatedOn}</p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Who we are</h2>
          <p className="mt-2">
            Nivarna Advisors is a Chartered Accountant-led accounting and
            business advisory firm.
            For questions or requests about information submitted through this
            website, contact us at{" "}
            <a className="font-medium text-[#8d672d] underline" href="mailto:contact@nivarna.in">
              contact@nivarna.in
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Information we collect</h2>
          <p className="mt-2">
            When you express interest, we collect your name, email address, the
            area of interest you select, and any information you choose to
            include in your correspondence. Please do not submit financial records,
            identity documents, account credentials, or other confidential
            material through this website form.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">How we use it</h2>
          <p className="mt-2">
            We use your enquiry details to respond to you, understand your
            requirements, and prevent misuse of the form. We do not use
            enquiries for unrelated marketing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Email service providers</h2>
          <p className="mt-2">
            Your form submission is processed by Resend to send an email
            notification to Nivarna Advisors at nivarna.advisors@gmail.com.
            Enquiry correspondence is handled in that email account. These
            providers process information to deliver the service; please also
            review their privacy terms for details about their systems and
            processing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">How long we keep enquiries</h2>
          <p className="mt-2">
            We intend to keep non-client enquiries for up to 12 months after our
            last communication, then delete them unless a longer period is
            reasonably needed to handle a dispute or meet a legal or
            professional obligation. This schedule applies to enquiry records
            we control; Resend and Gmail may retain delivery and account records
            under their own retention settings and policies. If you become a
            client, separate engagement and record-retention requirements may
            apply.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Your choices</h2>
          <p className="mt-2">
            You may contact us to request access to, correction of, or deletion
            of your enquiry details, or to withdraw your consent for further
            use. We will respond to requests in accordance with applicable law.
            Withdrawal does not affect processing already carried out or
            retention required by law or professional obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Cookies and similar technologies</h2>
          <p className="mt-2">
            This website does not currently use analytics, advertising, or
            non-essential cookies. We do not load third-party tracking scripts.
            Our fonts are served by this website. If we add optional cookies or
            tracking in the future, we will update this notice and request
            consent where required.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Enquiries and professional services</h2>
          <p className="mt-2">
            Website content is general information and does not, by itself,
            create an adviser-client relationship. Any professional work is
            subject to an agreed scope, engagement terms, and applicable
            professional requirements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Updates</h2>
          <p className="mt-2">
            We may update this notice when our practices or applicable
            requirements change. The latest version will be available on this
            page.
          </p>
        </section>
      </div>
    </main>
  );
}
