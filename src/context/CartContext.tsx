'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductColor, ProductSize } from '@/data/products';

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  image: string;
  color: ProductColor;
  size: ProductSize;
  price: number;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, color: ProductColor, size: ProductSize) => void;
  removeItem: (productId: number, size: string, colorName: string) => void;
  updateQty: (productId: number, size: string, colorName: string, delta: number) => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('coftochka_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('coftochka_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: Product, color: ProductColor, size: ProductSize) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.productId === product.id && item.size === size && item.color.name === color.name
      );

      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, qty: item.qty + 1 } : item
        );
      }

      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        color,
        size,
        price: product.price,
        qty: 1,
      };

      return [...prev, newItem];
    });
    openCart();
  };

  const removeItem = (productId: number, size: string, colorName: string) => {
    setItems(prev => prev.filter(
      item => !(item.productId === productId && item.size === size && item.color.name === colorName)
    ));
  };

  const updateQty = (productId: number, size: string, colorName: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.productId === productId && item.size === size && item.color.name === colorName) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQty,
      total,
      count
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
