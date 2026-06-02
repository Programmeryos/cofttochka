'use client';

import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-serif text-xl font-bold group-hover:scale-105 transition-transform">
      C
    </div>
    <span className="font-serif text-xl font-bold tracking-tight text-brand-dark">
      COFTOCHKA<span className="text-brand-primary">.UA</span>
    </span>
  </Link>
);

export const Header = () => {
  const { openCart, count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#catalog" className="text-sm font-medium hover:text-brand-primary transition-colors">Каталог</Link>
          <Link href="/#about" className="text-sm font-medium hover:text-brand-primary transition-colors">Про нас</Link>
          <Link href="/#contacts" className="text-sm font-medium hover:text-brand-primary transition-colors">Контакти</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={openCart}
            className="relative p-2 hover:bg-neutral-50 rounded-full transition-colors group"
          >
            <ShoppingCart size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
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
          <button className="md:hidden p-2 hover:bg-neutral-50 rounded-full transition-colors">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
