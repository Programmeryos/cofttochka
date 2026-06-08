import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
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

async function fetchReviews(id: string) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}/reviews?page=1&limit=5`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const product = await fetchProduct(id);
  if (!product) return {};

  const dict = await getDictionary(lang);
  const slug = product.slug ?? id;
  const title =
    lang === 'en'
      ? `${product.name} — buy at COFTOCHKA.COM`
      : `${product.name} — купити в COFTOCHKA.COM`;
  const description = product.description
    ? product.description.slice(0, 160)
    : lang === 'en'
    ? `${product.name} — handmade knitwear. Price: ${Number(product.price).toLocaleString('uk-UA')} UAH. Delivery across Ukraine.`
    : `${product.name} — в'язаний одяг ручної роботи. Ціна: ${Number(product.price).toLocaleString('uk-UA')} ₴. Доставка по Україні.`;
  const imageUrl = product.images?.[0]?.url;
  const locale = lang === 'en' ? 'en_US' : 'uk_UA';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.coftochka.com/${lang}/product/${slug}`,
      siteName: 'COFTOCHKA.COM',
      locale,
      type: 'website',
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] }),
    },
    alternates: {
      canonical: `https://www.coftochka.com/${lang}/product/${slug}`,
      languages: {
        uk: `https://www.coftochka.com/uk/product/${slug}`,
        en: `https://www.coftochka.com/en/product/${slug}`,
        'x-default': `https://www.coftochka.com/uk/product/${slug}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const [product, reviews] = await Promise.all([fetchProduct(id), fetchReviews(id)]);

  const authorName = lang === 'en' ? 'Buyer' : 'Покупець';
  const homeLabel = lang === 'en' ? 'Home' : 'Головна';
  const catalogLabel = lang === 'en' ? 'Catalog' : 'Каталог';
  const shippingLabel = lang === 'en' ? 'Nova Poshta rates' : 'За тарифами Нової Пошти';

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
            brand: { '@type': 'Brand', name: 'COFTOCHKA.COM' },
            ...(product.reviewCount > 0 && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: String(product.avgRating.toFixed(1)),
                reviewCount: product.reviewCount,
                bestRating: '5',
                worstRating: '1',
              },
              review: reviews?.data.slice(0, 5).map(
                (r: { rating: number; text: string | null; createdAt: string }) => ({
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: String(r.rating),
                    bestRating: '5',
                    worstRating: '1',
                  },
                  ...(r.text && { reviewBody: r.text }),
                  datePublished: r.createdAt.slice(0, 10),
                  author: { '@type': 'Person', name: authorName },
                }),
              ),
            }),
            offers: {
              '@type': 'Offer',
              price: String(product.price),
              priceCurrency: 'UAH',
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@type': 'Organization', name: 'COFTOCHKA.COM' },
              url: `https://www.coftochka.com/${lang}/product/${product.slug ?? id}`,
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'UA',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
              },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingLabel,
                shippingRate: { '@type': 'MonetaryAmount', value: '150', currency: 'UAH' },
                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
                  transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 7, unitCode: 'DAY' },
                },
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://www.coftochka.com/${lang}` },
              { '@type': 'ListItem', position: 2, name: catalogLabel, item: `https://www.coftochka.com/${lang}#catalog` },
              { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.coftochka.com/${lang}/product/${product.slug ?? id}` },
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
      <ProductPageClient id={id} lang={lang} initialProduct={product ?? undefined} initialReviews={reviews ?? undefined} />
    </>
  );
}
