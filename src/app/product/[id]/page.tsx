import type { Metadata } from 'next';
import { ProductPageClient } from './ProductPageClient';
import { API_BASE } from '@/lib/api/config';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    const product = await res.json();
    const slug = product.slug ?? id;
    return {
      alternates: { canonical: `https://www.coftochka.com/product/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductPageClient id={id} />;
}
