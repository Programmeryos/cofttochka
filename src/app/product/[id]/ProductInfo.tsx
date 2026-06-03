'use client';

import React, { useState } from 'react';
import { ShoppingBag, Truck, RefreshCw, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/api/types';

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between group"
      >
        <span className="font-bold text-sm uppercase tracking-widest text-neutral-400 group-hover:text-brand-dark transition-colors">
          {title}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-neutral-600 leading-relaxed text-sm">{children}</div>
      </motion.div>
    </div>
  );
};

export const ProductInfo = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-3xl font-bold text-brand-dark">
          {Number(product.price).toLocaleString('uk-UA')} ₴
        </span>
        <span className={`text-sm italic ${product.inStock ? 'text-green-500' : 'text-neutral-400'}`}>
          {product.inStock ? 'В наявності' : 'Немає в наявності'}
        </span>
      </div>

      {(product.size || product.category) && (
        <div className="flex flex-wrap gap-6 mb-10">
          {product.size && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Розмір</span>
              <span className="px-5 py-2.5 border-2 border-brand-dark bg-brand-dark text-white rounded-xl font-medium text-sm">
                {product.size}
              </span>
            </div>
          )}
          {product.category && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Категорія</span>
              <span className="px-5 py-2.5 border-2 border-neutral-200 rounded-xl text-sm text-neutral-600">
                {product.category.name}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 mb-12">
        <button
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="flex-1 bg-brand-primary text-white py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <ShoppingBag size={22} />
          {product.inStock ? 'До кошика' : 'Немає в наявності'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 py-8 border-t border-neutral-100 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-primary">
            <Truck size={20} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium text-neutral-500 leading-tight">
            Доставка по всій <br /> Україні
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-primary">
            <RefreshCw size={20} strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium text-neutral-500 leading-tight">
            Обмін та повернення <br /> протягом 14 днів
          </span>
        </div>
      </div>

      <div className="border-t border-neutral-100">
        {product.description && (
          <Accordion title="Опис">
            <p>{product.description}</p>
          </Accordion>
        )}
        <Accordion title="Доставка та оплата">
          <p className="mb-2">
            <strong>Доставка:</strong> Нова Пошта (відділення, поштомат, кур&apos;єр), Укрпошта.
          </p>
          <p>
            <strong>Оплата:</strong> Накладений платіж при отриманні або онлайн-оплата карткою.
          </p>
        </Accordion>
      </div>
    </div>
  );
};
