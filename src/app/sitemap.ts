import { MetadataRoute } from 'next'
import type { ProductsResponse } from '@/lib/api/types'

const API_BASE = 'https://hospitable-manifestation-production-dc1f.up.railway.app'

async function getAllProducts(): Promise<{ id: string; slug: string | null }[]> {
  try {
    const res = await fetch(`${API_BASE}/products?limit=1000`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json: ProductsResponse = await res.json()
    return json.data.map((p) => ({ id: p.id, slug: p.slug ?? null }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `https://www.coftochka.com/product/${p.slug ?? p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.coftochka.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...productPages,
    {
      url: 'https://www.coftochka.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.coftochka.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
