'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/lib/api';
import type { Product } from '@/lib/api/types';

type SortOption = 'default' | 'price_asc' | 'price_desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'За замовчуванням' },
  { value: 'price_asc', label: 'Ціна ↑' },
  { value: 'price_desc', label: 'Ціна ↓' },
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const imageUrl = product.images[0]?.url;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="aspect-4/5 bg-brand-light relative overflow-hidden rounded-2xl">
        <Link href={`/product/${product.slug ?? product.id}`} className="block w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              <ShoppingBag size={40} strokeWidth={1} />
            </div>
          )}
        </Link>

        {!product.inStock && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-neutral-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Немає в наявності
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10 pointer-events-none">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-white text-brand-dark py-3 rounded-xl font-medium shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 active:scale-95 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={18} />
            До кошика
          </button>
        </div>
      </div>

      <div className="mt-4 px-1">
        <Link href={`/product/${product.slug ?? product.id}`}>
          <h3 className="font-serif text-lg font-bold group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          {product.category && (
            <span className="text-xs text-neutral-400">{product.category.name}</span>
          )}
          {product.size && (
            <span className="text-xs text-neutral-400 ml-auto">{product.size}</span>
          )}
        </div>
        <p className="mt-2 font-bold text-lg">{Number(product.price).toLocaleString('uk-UA')} ₴</p>
      </div>
    </motion.article>
  );
};

export const Catalog = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [inStock, setInStock] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  const searchTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(value), 400);
  };

  const { data: categoriesData } = useGetCategoriesQuery();

  const { data, isLoading, isError } = useGetProductsQuery({
    search: debouncedSearch || undefined,
    categoryId: selectedCategoryId,
    inStock: inStock || undefined,
    limit: 100,
  });

  const toggleSize = (size: string) =>
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );

  const activeFilterCount =
    selectedSizes.length +
    (inStock ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0);

  const resetFilters = () => {
    setSelectedSizes([]);
    setInStock(false);
    setSortBy('default');
    setSelectedCategoryId(undefined);
    setSearch('');
    setDebouncedSearch('');
  };

  const filteredProducts = useMemo(() => {
    const products = data?.data ?? [];
    let result = selectedSizes.length > 0
      ? products.filter(p => p.size && selectedSizes.includes(p.size))
      : products;

    switch (sortBy) {

      case 'price_asc': return [...result].sort((a, b) => Number(a.price) - Number(b.price));
      case 'price_desc':return [...result].sort((a, b) => Number(b.price) - Number(a.price));
      default:          return result;
    }
  }, [data, selectedSizes, sortBy]);

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Наша Колекція</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategoryId(undefined)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategoryId ? 'bg-brand-dark text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Всі
              </button>
              {categoriesData?.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategoryId === cat.id
                      ? 'bg-brand-dark text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Пошук за назвою..."
                value={search}
                onChange={e => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 rounded-2xl border border-transparent focus:border-brand-primary focus:bg-white outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(prev => !prev)}
              className={`relative p-3 rounded-2xl transition-colors ${
                showFilters ? 'bg-brand-dark text-white' : 'bg-neutral-50 hover:bg-neutral-100'
              }`}
            >
              <SlidersHorizontal size={20} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-4 py-3 text-sm text-neutral-500 hover:text-brand-dark bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                <X size={14} />
                Скинути
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="py-6 mb-6 border-t border-b border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Size */}
                <div>
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-neutral-400">Розмір</h4>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-brand-primary bg-brand-primary/10 text-brand-primary font-semibold'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-neutral-400">Наявність</h4>
                  <button
                    onClick={() => setInStock(prev => !prev)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      inStock
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${inStock ? 'bg-brand-primary border-brand-primary' : 'border-neutral-300'}`}>
                      {inStock && <Check size={11} strokeWidth={3} className="text-white" />}
                    </span>
                    Тільки в наявності
                  </button>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-neutral-400">Сортування</h4>
                  <div className="flex flex-col gap-1">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                          sortBy === opt.value
                            ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                            : 'hover:bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-neutral-400 mb-8">
          Знайдено: <span className="font-semibold text-brand-dark">{filteredProducts.length}</span> товарів
        </p>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-4/5 bg-neutral-100 rounded-2xl" />
                <div className="mt-4 h-5 bg-neutral-100 rounded-lg w-3/4" />
                <div className="mt-2 h-4 bg-neutral-100 rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="py-24 text-center">
            <p className="text-neutral-400 font-serif italic text-xl">Не вдалося завантажити товари</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-neutral-400 font-serif italic text-xl">Нічого не знайдено...</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-brand-dark text-white rounded-full text-sm hover:bg-brand-secondary transition-colors"
                >
                  Скинути всі фільтри
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
