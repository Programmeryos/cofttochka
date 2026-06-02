'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQty, removeItem, total, count } = useCart();

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white z-[70] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Кошик"
          >
            {/* Header */}
            <div className="px-6 h-20 flex items-center justify-between border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-3">
                 <h2 className="text-xl font-serif font-bold">Кошик</h2>
                 <span className="text-sm text-neutral-400 font-medium">({count})</span>
              </div>
              <button 
                onClick={closeCart}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand-primary mb-6">
                    <ShoppingBag size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">Кошик порожній</h3>
                  <p className="text-neutral-400 text-sm italic mb-8">Додайте щось тепле 🤍</p>
                  <button 
                    onClick={closeCart}
                    className="w-full border-2 border-brand-primary text-brand-primary py-4 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all"
                  >
                    Перейти до каталогу
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color.name}`} className="flex gap-4 group">
                      <Link href={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                        <div className="w-24 h-32 bg-brand-light relative rounded-xl overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </Link>
                      
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/product/${item.slug}`} onClick={closeCart}>
                            <h4 className="font-serif font-bold text-sm hover:text-brand-primary transition-colors">{item.name}</h4>
                          </Link>
                          <button 
                            onClick={() => removeItem(item.productId, item.size, item.color.name)}
                            className="text-neutral-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-auto">
                          {item.color.name} · {item.size}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => updateQty(item.productId, item.size, item.color.name, -1)}
                              className="w-8 h-8 rounded-lg border border-neutral-100 flex items-center justify-center hover:border-brand-primary transition-colors disabled:opacity-30"
                            >
                              {item.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.productId, item.size, item.color.name, 1)}
                              className="w-8 h-8 rounded-lg border border-neutral-100 flex items-center justify-center hover:border-brand-primary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-sm">{(item.price * item.qty).toLocaleString('uk-UA')} ₴</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-neutral-500 text-sm">
                    <span>Доставка</span>
                    <span>розраховується</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg">Разом:</span>
                    <span className="font-bold text-2xl text-brand-dark">{total.toLocaleString('uk-UA')} ₴</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-brand-primary text-white py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all hover:shadow-xl active:scale-[0.98]">
                    Оформити замовлення
                  </button>
                  <button 
                    onClick={closeCart}
                    className="w-full py-2 text-sm text-neutral-400 font-medium hover:text-brand-dark transition-colors"
                  >
                    Продовжити покупки
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
