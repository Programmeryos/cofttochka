'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Product, ProductSize } from '@/lib/api/types';

export interface CartItem {
  productId: string;
  slug: string | null;
  name: string;
  image: string | null;
  size: ProductSize | null;
  price: number;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, delta: number) => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('coftochka_cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('coftochka_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product) => {
    setItems(prev => {
      if (prev.find(item => item.productId === product.id)) return prev;
      return [...prev, {
        productId: product.id,
        slug: product.slug ?? null,
        name: product.name,
        image: product.images[0]?.url ?? null,
        size: product.size,
        price: Number(product.price),
        qty: 1,
      }];
    });
    openCart();
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setItems(prev => {
      const updated = prev.map(item => {
        if (item.productId !== productId) return item;
        const newQty = item.qty + delta;
        return newQty <= 0 ? null : { ...item, qty: newQty };
      }).filter(Boolean) as CartItem[];
      return updated;
    });
  };

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
