'use client';

import React, { createContext, useContext } from 'react';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/i18n-config';

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslations(): Dictionary {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useTranslations must be used within LocaleProvider');
  return ctx.dict;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx.locale;
}
