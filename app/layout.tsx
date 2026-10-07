import type { Metadata } from "next";
import { Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://imrnes.team";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IMRNES — Ingin Menjadi Root",
    template: "%s | IMRNES",
  },
  description:
    "IMRNES is an Indonesian cyber security community member list. Track CTF achievements, CVE discoveries, and the leaderboard.",
  keywords: [
    "IMRNES",
    "cyber security community",
    "CTF",
    "CVE",
    "vulnerability research",
    "indie hacker",
    "indonesia",
  ],
  authors: [{ name: "IMRNES Team", url: SITE_URL }],
  creator: "IMRNES Team",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "IMRNES",
    title: "IMRNES — Ingin Menjadi Root",
    description:
      "Cyber security community member list: CTF achievements, CVE discoveries, and leaderboard.",
    locale: "en_US",
    images: [{ url: "/logo.png", width: 612, height: 408, alt: "IMRNES" }],
  },
  twitter: {
    card: "summary",
    title: "IMRNES — Ingin Menjadi Root",
    description:
      "Cyber security community member list: CTF achievements, CVE discoveries, and leaderboard.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0f0518",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.className} ${pressStart2P.variable} antialiased bg-brand-dark text-brand-light selection:bg-brand-green selection:text-brand-dark pt-16`}
      >
        <TopBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
