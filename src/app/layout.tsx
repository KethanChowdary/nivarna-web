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
  title: "Nivarna Advisors | Beyond Numbers. Built for Better Decisions",
  description:
    "Chartered Accountant-led advisory firm combining professional CA expertise with AI tools for accounting, risk management, tax compliance, virtual CFO, and business advisory.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Nivarna Advisors",
    title: "Nivarna Advisors | Beyond Numbers. Built for Better Decisions",
    description:
      "Chartered Accountant expertise combined with AI-powered tools to simplify accounting, compliance, tax, risk management and financial decision-making.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Nivarna Advisors | Beyond Numbers. Built for Better Decisions",
    description:
      "Chartered Accountant expertise combined with AI-powered tools to simplify accounting, compliance, tax, risk management and financial decision-making.",
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
    "Chartered Accountant-led advisory firm combining professional expertise with AI-driven workflows for accounting, risk management, tax compliance, virtual CFO, and business advisory.",
  knowsAbout: [
    "Accounting and bookkeeping",
    "Risk management and internal controls",
    "Tax compliance and litigation support",
    "Tax advisory",
    "Finance transformation",
    "Business advisory",
    "Virtual CFO services",
    "Incorporation and regulatory compliance",
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
