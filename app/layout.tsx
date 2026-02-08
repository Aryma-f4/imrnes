import type { Metadata } from "next";
import Link from "next/link";
import { Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";

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
  title: "IMRNES - Ingin Menjadi Root",
  description: "Cyber Security Community Member List",
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
      </body>
    </html>
  );
}
