import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { generateWebSiteStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Slanguage — Gen Z Slang Field Guide",
    template: "%s | Slanguage",
  },
  description:
    "A curated reference for internet slang with definitions, examples, and moderated submissions.",
  keywords: [
    "Gen Z slang",
    "internet slang",
    "slang dictionary",
    "brainrot",
    "TikTok slang",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Slanguage",
    description:
      "A curated reference for internet slang with definitions, examples, and moderated submissions.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Slanguage — Gen Z Slang Field Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slanguage",
    description:
      "A curated reference for internet slang with definitions, examples, and moderated submissions.",
    images: [`${siteUrl}/api/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteStructuredData(siteUrl)),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-[family-name:var(--font-geist-sans)]`}
      >
        <ThemeProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
