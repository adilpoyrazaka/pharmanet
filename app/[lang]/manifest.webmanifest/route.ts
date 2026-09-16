import { locales, type Locale } from '@/lib/i18n';

// D52: one manifest per locale; start_url points at the install language.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const copy: Record<Locale, { name: string; description: string }> = {
  tr: {
    name: 'MEDPUSULA — Anlaşmalı Eczane Bulucu',
    description: 'İzmir anlaşmalı eczane bulucu — demo uygulama',
  },
  en: {
    name: 'MEDPUSULA — Contracted Pharmacy Finder',
    description: 'İzmir contracted pharmacy finder — demo app',
  },
};

export async function GET(
  _request: Request,
  { params }: RouteContext<'/[lang]/manifest.webmanifest'>,
) {
  const lang = (await params).lang as Locale;
  const manifest = {
    id: `/${lang}`,
    ...copy[lang],
    short_name: 'medpusula',
    lang,
    start_url: `/${lang}`,
    scope: '/',
    display: 'standalone',
    background_color: '#f8fafb',
    theme_color: '#087f78',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
