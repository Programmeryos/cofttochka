import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { AboutUs } from "@/components/sections/AboutUs";
import { Footer } from "@/components/sections/Footer";
import type { Product, Category } from "@/lib/api/types";

const API_BASE = 'https://hospitable-manifestation-production-dc1f.up.railway.app';

async function getInitialCatalogData(): Promise<{ products: Product[]; categories: Category[] }> {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API_BASE}/products?limit=100`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } }),
    ]);
    const products: Product[] = productsRes.ok ? (await productsRes.json()).data : [];
    const categories: Category[] = categoriesRes.ok ? await categoriesRes.json() : [];
    return { products, categories };
  } catch {
    return { products: [], categories: [] };
  }
}

export default async function Home() {
  const { products, categories } = await getInitialCatalogData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "COFTOCHKA.COM",
    "url": "https://www.coftochka.com",
    "logo": "https://www.coftochka.com/logo.png",
    "description": "В'язаний одяг ручної роботи з доставкою по Україні",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Київ",
      "addressCountry": "UA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+380688521018",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Catalog initialProducts={products} categories={categories} />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
