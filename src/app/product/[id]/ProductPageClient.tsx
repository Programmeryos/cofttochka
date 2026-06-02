'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductCard } from '@/components/sections/Catalog';
import { useGetProductByIdQuery, useGetProductsQuery } from '@/lib/api';

export const ProductPageClient = ({ id }: { id: string }) => {
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: relatedData } = useGetProductsQuery(
    { categoryId: product?.categoryId ?? undefined, limit: 5 },
    { skip: !product?.categoryId }
  );

  const relatedProducts = relatedData?.data.filter(p => p.id !== id).slice(0, 4) ?? [];

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-16">
              <div className="lg:col-span-7">
                <div className="aspect-4/5 bg-neutral-100 rounded-3xl animate-pulse" />
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="h-10 bg-neutral-100 rounded-xl animate-pulse w-3/4" />
                <div className="h-8 bg-neutral-100 rounded-xl animate-pulse w-1/3" />
                <div className="h-14 bg-neutral-100 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isError || !product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li><Link href="/" className="hover:text-brand-dark transition-colors">Головна</Link></li>
              <li><ChevronRight size={14} /></li>
              <li><Link href="/#catalog" className="hover:text-brand-dark transition-colors">Каталог</Link></li>
              <li><ChevronRight size={14} /></li>
              <li className="text-brand-dark font-medium truncate">{product.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>
            <div className="lg:col-span-5">
              <ProductInfo product={product} />
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-32 mb-16">
              <h2 className="text-3xl font-serif font-bold mb-12">Вам також може сподобатись</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
