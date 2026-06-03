import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { AboutUs } from "@/components/sections/AboutUs";
import { Footer } from "@/components/sections/Footer";
import type { Product, Category } from "@/lib/api/types";
import { API_BASE } from "@/lib/api/config";

export default async function Home() {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${API_BASE}/products?limit=100`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } }).catch(() => null),
  ]);

  const productsData = productsRes?.ok ? await productsRes.json() : { data: [] };
  const initialProducts: Product[] = productsData.data ?? [];
  const categories: Category[] = categoriesRes?.ok ? await categoriesRes.json() : [];

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
        <Catalog initialProducts={initialProducts} categories={categories} />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
