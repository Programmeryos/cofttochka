'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGallery = ({ images, name }: { images: string[], name: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-4/5 bg-brand-light relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${name} — головне фото`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-24 aspect-4/5 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
              activeIndex === i ? 'border-brand-primary scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`${name} — мініатюра ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
