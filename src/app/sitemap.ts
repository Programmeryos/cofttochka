import { MetadataRoute } from 'next'
import type { ProductsResponse } from '@/lib/api/types'

const API_BASE = 'https://hospitable-manifestation-production-dc1f.up.railway.app'

async function getAllProducts(): Promise<{ id: string; slug: string | null }[]> {
  try {
    const limit = 100
    const first = await fetch(`${API_BASE}/products?limit=${limit}&page=1`, {
      next: { revalidate: 3600 },
    })
    if (!first.ok) return []
    const firstJson: ProductsResponse = await first.json()
    const all = [...firstJson.data]
    const totalPages = Math.ceil(firstJson.total / limit)
    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(`${API_BASE}/products?limit=${limit}&page=${page}`, {
        next: { revalidate: 3600 },
      })
      if (!res.ok) break
      const json: ProductsResponse = await res.json()
      all.push(...json.data)
    }
    return all.map((p) => ({ id: p.id, slug: p.slug ?? null }))
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
