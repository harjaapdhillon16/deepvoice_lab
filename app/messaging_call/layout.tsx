'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nextProvider } from 'react-i18next';
import i18n from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <I18nextProvider i18n={i18n}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </I18nextProvider>
    </html>
  );
}
