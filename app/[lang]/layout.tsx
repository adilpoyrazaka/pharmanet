import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locales, siteUrl, type Locale } from "@/lib/i18n";
import "../globals.css";
import "../medpusula.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// D51: only /tr and /en exist; any other prefix is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy: Record<Locale, { title: string; description: string }> = {
  tr: {
    title: "MEDPUSULA",
    description: "Kurumunla anlaşmalı en yakın eczaneyi bul.",
  },
  en: {
    title: "MEDPUSULA",
    description: "Find the nearest pharmacy contracted with your institution.",
  },
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return {
    metadataBase: new URL(siteUrl),
    ...copy[lang],
    // D51: self-canonical, hreflang for the other locale, x-default is /tr.
    alternates: {
      canonical: `/${lang}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/tr" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
