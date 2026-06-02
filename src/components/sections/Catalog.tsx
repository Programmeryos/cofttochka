'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product, ALL_COLORS } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

type SortOption = 'default' | 'newest' | 'price_asc' | 'price_desc' | 'popular';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'За замовчуванням' },
  { value: 'newest', label: 'Новинки' },
  { value: 'price_asc', label: 'Ціна ↑' },
  { value: 'price_desc', label: 'Ціна ↓' },
  { value: 'popular', label: 'Популярні' },
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ALL_TYPES = ['Всі', 'Оверсайз', 'Приталена', 'Кардиган', 'Светр'];
const PRICE_MIN = 1000;
const PRICE_MAX = 4000;

const PriceRangeSlider = ({
  min, max, value, onChange,
}: {
  min: number; max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) => {
  const minPct = ((value[0] - min) / (max - min)) * 100;
  const maxPct = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="relative" style={{ height: '24px' }}>
      <div className="absolute left-0 right-0" style={{ top: '10px', height: '4px' }}>
        <div className="w-full h-full bg-neutral-200 rounded-full">
          <div
            className="absolute h-full bg-brand-primary rounded-full"
            style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
          />
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={100}
        value={value[0]}
        onChange={e => {
          const v = +e.target.value;
          if (v < value[1]) onChange([v, value[1]]);
        }}
        className="absolute w-full opacity-0 cursor-pointer"
        style={{ top: 0, height: '24px', zIndex: value[0] >= value[1] - 100 ? 5 : 3 }}
      />
      <input
        type="range" min={min} max={max} step={100}
        value={value[1]}
        onChange={e => {
          const v = +e.target.value;
          if (v > value[0]) onChange([value[0], v]);
        }}
        className="absolute w-full opacity-0 cursor-pointer"
        style={{ top: 0, height: '24px', zIndex: 4 }}
      />
      <div
        className="absolute w-5 h-5 bg-white rounded-full border-2 border-brand-primary shadow-sm pointer-events-none"
        style={{ left: `calc(${minPct}% - 10px)`, top: '2px' }}
      />
      <div
        className="absolute w-5 h-5 bg-white rounded-full border-2 border-brand-primary shadow-sm pointer-events-none"
        style={{ left: `calc(${maxPct}% - 10px)`, top: '2px' }}
      />
    </div>
  );
};

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.colors[0], product.sizes[0]);
  };

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
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={`${product.name} — в'язана кофта ${product.colors.map(c => c.name).join(', ')}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {(product.isNew || product.isHit) && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
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
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10 pointer-events-none">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-brand-dark py-3 rounded-xl font-medium shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 active:scale-95 pointer-events-auto"
          >
            <ShoppingBag size={18} />
            До кошика
          </button>
        </div>
      </div>

      <div className="mt-4 px-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border border-neutral-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <span className="text-xs text-neutral-400 ml-auto">
            {product.sizes.join(' · ')}
          </span>
        </div>
        <p className="mt-2 font-bold text-lg">{product.price.toLocaleString('uk-UA')} ₴</p>
      </div>
    </motion.article>
  );
};

export const Catalog = () => {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('Всі');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  const toggleSize = (size: string) =>
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );

  const toggleColor = (name: string) =>
    setSelectedColors(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );

  const activeFilterCount =
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0);

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSortBy('default');
    setActiveType('Всі');
    setSearch('');
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchesType = activeType === 'Всі' || p.type === activeType;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
      const matchesColor = selectedColors.length === 0 || p.colors.some(c => selectedColors.includes(c.name));
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesType && matchesSearch && matchesSize && matchesColor && matchesPrice;
    });

    switch (sortBy) {
      case 'newest':    return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'price_asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price_desc':return [...result].sort((a, b) => b.price - a.price);
      case 'popular':   return [...result].sort((a, b) => (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0));
      default:          return result;
    }
  }, [search, activeType, selectedSizes, selectedColors, priceRange, sortBy]);

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Наша Колекція</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeType === type
                      ? 'bg-brand-dark text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {type}
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
                onChange={e => setSearch(e.target.value)}
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

        {/* Advanced filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="py-6 mb-6 border-t border-b border-neutral-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

                {/* Color */}
                <div>
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-neutral-400">Колір</h4>
                  <div className="flex flex-wrap gap-3">
                    {ALL_COLORS.map(color => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        title={color.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color.name)
                            ? 'border-brand-primary scale-110 shadow-md'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-xs font-bold mb-3 uppercase tracking-widest text-neutral-400">
                    Ціна: {priceRange[0].toLocaleString('uk-UA')} — {priceRange[1].toLocaleString('uk-UA')} ₴
                  </h4>
                  <PriceRangeSlider
                    min={PRICE_MIN} max={PRICE_MAX}
                    value={priceRange}
                    onChange={setPriceRange}
                  />
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
      </div>
    </section>
  );
};
