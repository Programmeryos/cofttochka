import { MetadataRoute } from 'next';
import type { ProductsResponse } from '@/lib/api/types';
import { API_BASE } from '@/lib/api/config';
import { LOCALES } from '@/i18n-config';

async function getAllProducts(): Promise<{ id: string; slug: string | null }[]> {
  try {
    const limit = 100;
    const first = await fetch(`${API_BASE}/products?limit=${limit}&page=1`, {
      next: { revalidate: 3600 },
    });
    if (!first.ok) return [];
    const firstJson: ProductsResponse = await first.json();
    const all = [...firstJson.data];
    const totalPages = Math.ceil(firstJson.total / limit);
    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`${API_BASE}/products?limit=${limit}&page=${page}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;
      const json: ProductsResponse = await res.json();
      all.push(...json.data);
    }
    return all.map((p) => ({ id: p.id, slug: p.slug ?? null }));
  } catch {
    return [];
  }
}

function isoDate(): string {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

const BASE = 'https://www.coftochka.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const now = isoDate();

  const productPages: MetadataRoute.Sitemap = products.flatMap((p) =>
    LOCALES.map((lang) => ({
      url: `${BASE}/${lang}/product/${p.slug ?? p.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  );

  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => [
    { url: `${BASE}/${lang}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE}/${lang}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/${lang}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]);

  return [...staticPages, ...productPages];
}
