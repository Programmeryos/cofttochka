import type { Metadata } from 'next';
import { ProductPageClient } from './ProductPageClient';
import { API_BASE } from '@/lib/api/config';

async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) return {};

  const slug = product.slug ?? id;
  const title = `${product.name} — купити в COFTOCHKA.COM`;
  const description = product.description
    ? product.description.slice(0, 160)
    : `${product.name} — в'язаний одяг ручної роботи. Ціна: ${Number(product.price).toLocaleString('uk-UA')} ₴. Доставка по Україні.`;
  const imageUrl = product.images?.[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coftochka.com/product/${slug}`,
      siteName: 'COFTOCHKA.COM',
      locale: 'uk_UA',
      type: 'website',
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] }),
    },
    alternates: { canonical: `https://www.coftochka.com/product/${slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);


  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name: product.name,
            description: product.description ?? undefined,
            image: product.images?.map((img: { url: string }) => img.url) ?? [],
            sku: product.id,
            brand: {
              '@type': 'Brand',
              name: 'COFTOCHKA.COM',
            },
            offers: {
              '@type': 'Offer',
              price: String(product.price),
              priceCurrency: 'UAH',
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'COFTOCHKA.COM',
              },
              url: `https://www.coftochka.com/product/${product.slug ?? id}`,
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://www.coftochka.com' },
              { '@type': 'ListItem', position: 2, name: 'Каталог', item: 'https://www.coftochka.com/#catalog' },
              { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.coftochka.com/product/${product.slug ?? id}` },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductPageClient id={id} initialProduct={product ?? undefined} />
    </>
  );
}
