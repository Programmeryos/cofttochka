'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTranslations, useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/i18n-config';

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link href="/" className="flex items-center gap-2 group">
    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-serif text-xl font-bold group-hover:scale-105 transition-transform">
      C
    </div>
    <span
      className={`font-serif text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-brand-dark'}`}
    >
      COFTOCHKA<span className="text-brand-secondary">.COM</span>
    </span>
  </Link>
);

function LangSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === locale) return pathname;
    return pathname.replace(`/${locale}`, `/${next}`);
  };

  const otherLocale: Locale = locale === 'uk' ? 'en' : 'uk';

  return (
    <Link
      href={switchTo(otherLocale)}
      className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
        light
          ? 'border-white/30 text-white/70 hover:border-white hover:text-white'
          : 'border-neutral-200 text-neutral-500 hover:border-brand-primary hover:text-brand-primary'
      }`}
    >
      {otherLocale === 'en' ? 'ENG' : 'УКР'}
    </Link>
  );
}

export const Header = () => {
  const { openCart, count } = useCart();
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#catalog"
            className="text-sm font-medium hover:text-brand-primary transition-colors"
          >
            {t.header.catalog}
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-brand-primary transition-colors"
          >
            {t.header.about}
          </Link>
          <Link
            href="#contacts"
            className="text-sm font-medium hover:text-brand-primary transition-colors"
          >
            {t.header.contacts}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <button
            onClick={openCart}
            aria-label={t.header.cartAriaLabel}
            className="relative p-2 hover:bg-neutral-50 rounded-full transition-colors group"
          >
            <ShoppingCart
              size={24}
              strokeWidth={1.5}
              className="group-hover:scale-110 transition-transform"
            />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key={count}
                  className="absolute top-0 right-0 w-5 h-5 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
};
