import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SWRProvider from "@/components/providers/SWRProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Chakravyuh AI — Global Conflict Intelligence",
    template: "%s — Chakravyuh AI",
  },
  description:
    "AI-powered interactive geopolitics intelligence platform. Understand any global conflict in under 3 minutes.",
  keywords: [
    "geopolitics",
    "conflict intelligence",
    "war tracker",
    "AI analysis",
    "global conflicts",
    "humanitarian impact",
  ],
  authors: [{ name: "Chakravyuh AI" }],
  openGraph: {
    type: "website",
    siteName: "Chakravyuh AI",
    title: "Chakravyuh AI — Global Conflict Intelligence",
    description:
      "AI-powered interactive geopolitics intelligence platform. Understand any global conflict in under 3 minutes.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chakravyuh AI — Global Conflict Intelligence",
    description:
      "AI-powered interactive geopolitics intelligence platform. Understand any global conflict in under 3 minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SWRProvider>
          <main id="main-content">{children}</main>
        </SWRProvider>
      </body>
    </html>
  );
}
