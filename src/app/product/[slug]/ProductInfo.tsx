'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { ShoppingBag, Heart, Truck, RefreshCw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between group"
      >
        <span className="font-bold text-sm uppercase tracking-widest text-neutral-400 group-hover:text-brand-dark transition-colors">{title}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-neutral-600 leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useCart } from '@/context/CartContext';

export const ProductInfo = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        {product.isNew && (
          <span className="bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Новинка
          </span>
        )}
        {product.isHit && (
          <span className="bg-brand-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Хіт
          </span>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
      
      <div className="flex items-center gap-4 mb-8">
        <span className="text-3xl font-bold text-brand-dark">{product.price} ₴</span>
        <span className="text-neutral-400 text-sm italic">В наявності</span>
      </div>

      <div className="space-y-8 mb-10">
        {/* Color Picker */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Колір: <span className="text-brand-dark">{selectedColor.name}</span>
          </span>
          <div className="flex gap-3">
            {product.colors.map((color, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor.name === color.name ? 'border-brand-primary scale-110 shadow-md' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Size Picker */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="block text-xs font-bold uppercase tracking-widest text-neutral-400">Розмір</span>
            <button className="text-xs text-brand-primary hover:underline font-medium transition-all">Таблиця розмірів</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isAvailable = product.sizes.includes(size as any);
                return (
                    <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size as any)}
                        className={`w-14 h-12 flex items-center justify-center rounded-xl border-2 transition-all font-medium ${
                            !isAvailable 
                                ? 'bg-neutral-50 border-neutral-100 text-neutral-300 cursor-not-allowed line-through' 
                                : selectedSize === size 
                                    ? 'border-brand-dark bg-brand-dark text-white' 
                                    : 'border-neutral-200 hover:border-brand-dark'
                        }`}
                    >
                        {size}
                    </button>
                );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex gap-4 mb-12">
        <button 
          onClick={() => addItem(product, selectedColor, selectedSize as any)}
          className="flex-1 bg-brand-primary text-white py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
        >
          <ShoppingBag size={22} />
          До кошика
        </button>
        <button className="w-16 h-16 border-2 border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-400 transition-all active:scale-90">
          <Heart size={24} />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 py-8 border-t border-neutral-100 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-primary">
            <Truck size={20} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium text-neutral-500 leading-tight">Безкоштовна доставка <br /> від 1500 ₴</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-primary">
            <RefreshCw size={20} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium text-neutral-500 leading-tight">Обмін та повернення <br /> протягом 14 днів</span>
        </div>
      </div>

      {/* Details Accordions */}
      <div className="border-t border-neutral-100">
        <Accordion title="Опис">
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Склад та догляд">
          <p className="font-bold mb-2">Склад:</p>
          <p className="mb-4">{product.composition}</p>
          <p className="font-bold mb-2">Рекомендації по догляду:</p>
          <ul className="list-disc pl-4 space-y-1">
            {product.care.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Accordion>
        <Accordion title="Доставка та оплата">
          <p className="mb-2"><strong>Доставка:</strong> Нова Пошта (відділення, поштомат, кур&apos;єр), Укрпошта.</p>
          <p><strong>Оплата:</strong> Накладений платіж при отриманні або онлайн-оплата карткою.</p>
        </Accordion>
      </div>
    </div>
  );
};
