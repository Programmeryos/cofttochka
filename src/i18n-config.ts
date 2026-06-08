export const LOCALES = ['uk', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'uk';
export const hasLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);
