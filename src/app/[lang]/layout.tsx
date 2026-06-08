import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { LocaleProvider } from '@/context/LocaleContext';
import { CartProvider } from '@/context/CartContext';
import { StoreProvider } from '@/lib/StoreProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';

export async function generateStaticParams() {
  return [{ lang: 'uk' }, { lang: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [
      'кофта', 'кофточка', 'в\'язана кофта', 'светр', 'кардиган', 'оверсайз светр',
      'в\'язаний одяг', 'купити кофту', 'ручна робота', 'handmade Україна',
      'knit sweater', 'knitted cardigan', 'knitwear Ukraine', 'handmade sweater',
      'oversized knit', 'wool cardigan', 'buy knit sweater', 'handmade knitwear',
    ],
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      alternateLocale: lang === 'en' ? 'uk_UA' : 'en_US',
    },
    alternates: {
      languages: {
        uk: 'https://www.coftochka.com/uk',
        en: 'https://www.coftochka.com/en',
        'x-default': 'https://www.coftochka.com/uk',
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <LocaleProvider locale={lang} dict={dict}>
      <StoreProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </StoreProvider>
    </LocaleProvider>
  );
}
