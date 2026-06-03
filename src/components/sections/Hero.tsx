'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] h-auto flex items-center overflow-hidden bg-brand-light py-16 md:py-0">
      {/* Background Pattern/Texture Placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A373 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 md:mb-6"
          >
            В&apos;язаний одяг, <br />
            <span className="text-brand-primary italic">який обіймає</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-neutral-600 mb-6 md:mb-10 max-w-lg leading-relaxed"
          >
            Ручна робота з душею. Натуральна пряжа, сучасний крій та затишок у кожній петельці для вашого ідеального образу.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="#catalog"
              className="inline-block bg-brand-primary text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-brand-secondary transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Переглянути колекцію
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1607557997149-96bf2b30c3c3?w=900&h=1200&fit=crop&q=85"
          alt="Дівчина у в'язаному одязі — COFTOCHKA.COM"
          fill
          priority
          className="object-cover object-top"
        />
        {/* gradient fade до лівого краю */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-light via-brand-light/20 to-transparent" />
      </div>
    </section>
  );
};
