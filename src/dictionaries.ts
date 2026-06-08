import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
  uk: () => import('./dictionaries/uk.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export type { Locale };
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
