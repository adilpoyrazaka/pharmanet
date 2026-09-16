export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

/** D51: canonical origin for canonical and hreflang URLs. */
export const siteUrl = 'https://medpusula.com';
