'use client';

import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import { I18nextProvider } from 'react-i18next';
import i18n from "@/lib/i18n";

// Primary font - Inter is a clean, modern sans-serif
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Secondary font - Space Grotesk is a modern geometric sans with distinctive character
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Display font - Outfit has a modern, minimal aesthetic
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Keep Geist Mono for code blocks
const geistMono = {
  variable: "--font-geist-mono"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <I18nextProvider i18n={i18n}>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </I18nextProvider>
    </html>
  );
}