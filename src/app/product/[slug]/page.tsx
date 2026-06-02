import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { ChevronRight, Truck, RefreshCw, Heart } from 'lucide-react';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductCard } from '@/components/sections/Catalog';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return { title: 'Товар не знайдено' };

  return {
    title: `${product.name} — купити в'язану кофту | COFTOCHKA.UA`,
    description: `${product.name}. Склад: ${product.composition}. Доставка по Україні. Ручна робота.`,
    openGraph: {
      title: product.name,
      description: `Купити ${product.name} за ${product.price} ₴`,
      images: [{ url: product.image, width: 800, height: 1000, alt: product.name }],
      type: 'website',
    },
    alternates: {
      canonical: `https://coftochka.ua/product/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter(p => p.type === product.type && p.id !== product.id).slice(0, 4);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://coftochka.ua" },
      { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://coftochka.ua/#catalog" },
      { "@type": "ListItem", "position": 3, "name": product.name }
    ]
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "COFTOCHKA.UA" },
    "offers": {
      "@type": "Offer",
      "price": product.price.toString(),
      "priceCurrency": "UAH",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "COFTOCHKA.UA" }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
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
            {/* Left: Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Related Products */}
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
}
