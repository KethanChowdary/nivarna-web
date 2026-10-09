import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nivarna Advisors",
  description:
    "Chartered Accountant-led accounting, bookkeeping, audit, tax and virtual CFO services for businesses in Bengaluru. Practical financial advice from Nivarna Advisors.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nivarna Advisors",
    title: "Accounting, Audit & Tax Services in Bengaluru | Nivarna Advisors",
    description:
      "Chartered Accountant-led accounting, bookkeeping, audit, tax and virtual CFO services for businesses in Bengaluru.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Accounting, Audit & Tax Services in Bengaluru | Nivarna Advisors",
    description:
      "Chartered Accountant-led accounting, bookkeeping, audit, tax and virtual CFO services for businesses in Bengaluru.",
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
  logo: `${siteUrl}/icon.png`,
  description:
    "Chartered Accountant-led accounting, bookkeeping, audit, tax and business advisory services.",
  knowsAbout: [
    "Accounting and bookkeeping",
    "Financial statement audit",
    "Internal audit",
    "Tax compliance and advisory",
    "Virtual CFO services",
    "Finance transformation",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
