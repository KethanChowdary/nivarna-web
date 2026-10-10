import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nivarna Advisors",
  description:
    "Chartered Accountant-led accounting, tax compliance and litigation support, virtual CFO, MIS reporting, business advisory and management consulting for growing businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Nivarna Advisors",
    title: "Accounting, Tax & Business Advisory | Nivarna Advisors",
    description:
      "Practical accounting, tax compliance, virtual CFO, MIS reporting, business advisory and management consulting for growing businesses.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Accounting, Tax & Business Advisory | Nivarna Advisors",
    description:
      "Practical accounting, tax compliance, virtual CFO, MIS reporting, business advisory and management consulting for growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Nivarna Advisors",
  url: siteUrl,
  logo: `${siteUrl}/nivarna-logo.jpeg`,
  description:
    "Chartered Accountant-led accounting, tax, virtual CFO and business advisory services for growing businesses.",
  knowsAbout: [
    "Accounting and bookkeeping",
    "Tax compliance",
    "Business advisory",
    "Virtual CFO services",
    "Management reporting and dashboards",
    "Management consulting",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
