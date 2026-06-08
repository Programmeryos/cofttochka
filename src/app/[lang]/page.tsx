import { notFound } from 'next/navigation';
import { hasLocale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Catalog } from '@/components/sections/Catalog';
import { AboutUs } from '@/components/sections/AboutUs';
import { Footer } from '@/components/sections/Footer';
import type { Product, Category } from '@/lib/api/types';
import { API_BASE } from '@/lib/api/config';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${API_BASE}/products?limit=100`, { next: { revalidate: 3600 } }).catch(() => null),
    fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } }).catch(() => null),
  ]);

  const productsData = productsRes?.ok ? await productsRes.json() : { data: [] };
  const initialProducts: Product[] = productsData.data ?? [];
  const categories: Category[] = categoriesRes?.ok ? await categoriesRes.json() : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'COFTOCHKA.COM',
    url: 'https://www.coftochka.com',
    logo: 'https://www.coftochka.com/logo.png',
    description: dict.meta.ogDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: lang === 'en' ? 'Kyiv' : 'Київ',
      addressCountry: 'UA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380688521018',
      contactType: 'customer service',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero dict={dict.hero} />
        <Catalog initialProducts={initialProducts} categories={categories} />
        <AboutUs dict={dict.about} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
