import { MetadataRoute } from 'next'
import type { ProductsResponse } from '@/lib/api/types'

const API_BASE = 'https://hospitable-manifestation-production-dc1f.up.railway.app'

async function getAllProductIds(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/products?limit=1000`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json: ProductsResponse = await res.json()
    return json.data.map((p) => p.id)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await getAllProductIds()

  const productPages: MetadataRoute.Sitemap = productIds.map((id) => ({
    url: `https://www.coftochka.com/product/${id}`,
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
