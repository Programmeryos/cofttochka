import { MetadataRoute } from 'next'
import type { ProductsResponse } from '@/lib/api/types'
import { API_BASE } from '@/lib/api/config'

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

function isoDate(): string {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const now = isoDate()

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `https://www.coftochka.com/product/${p.slug ?? p.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.coftochka.com',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...productPages,
    {
      url: 'https://www.coftochka.com/privacy',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.coftochka.com/terms',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
