import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';

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
    title: dict.terms.pageTitle,
    description: dict.terms.pageDescription,
    alternates: {
      canonical: `https://www.coftochka.com/${lang}/terms`,
      languages: {
        uk: 'https://www.coftochka.com/uk/terms',
        en: 'https://www.coftochka.com/en/terms',
      },
    },
  };
}

function TermsUk() {
  return (
    <div className="prose prose-neutral max-w-none space-y-12">
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">1. Загальні положення</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>1.1. Цей документ є офіційною публічною офертою фізичної особи — підприємця, що здійснює діяльність під торговою маркою <strong>COFTOCHKA.COM</strong> (далі — «Продавець», «Ми»), та містить умови договору купівлі-продажу товарів дистанційним способом.</p>
          <p>1.2. Особа, що здійснює замовлення на Сайті <strong>https://www.coftochka.com</strong> (далі — «Покупець», «Ви»), вважається такою, що прийняла (акцептувала) цю оферту в повному обсязі з моменту підтвердження замовлення.</p>
          <p>1.3. Продавець та Покупець разом іменуються «Сторони», а кожен окремо — «Сторона».</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">2. Предмет договору</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>2.1. Продавець зобов&apos;язується передати у власність Покупця в&apos;язані вироби ручної роботи (далі — «Товар»), а Покупець зобов&apos;язується прийняти та оплатити їх.</p>
          <p>2.2. Асортимент, опис та ціна Товарів визначаються відповідно до інформації на Сайті.</p>
          <p>2.3. Усі Товари є виробами ручної роботи. Незначні відмінності у кольоровій гамі можуть мати місце внаслідок налаштувань екранів та властивостей натуральної пряжі.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">3. Ціни та оплата</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>3.1. Ціни на Товари зазначені на Сайті у гривнях (UAH).</p>
          <p>3.2. Доступні способи оплати: накладений платіж при отриманні, онлайн-оплата банківською карткою, переказ за реквізитами.</p>
          <p>3.3. При оплаті накладеним платежем сплачується комісія служби доставки відповідно до її тарифів.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">4. Порядок замовлення</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>4.1. Замовлення вважається оформленим з моменту його підтвердження Покупцем на Сайті.</p>
          <p>4.2. Після оформлення замовлення Продавець зв&apos;язується з Покупцем протягом 1 робочого дня для уточнення деталей.</p>
          <p>4.3. У разі відсутності Товару Продавець повідомляє про це Покупця та повертає кошти протягом 5 робочих днів.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">5. Доставка</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>5.1. Доставка здійснюється по всій території України службами <strong>Нова Пошта</strong> та <strong>Укрпошта</strong>.</p>
          <p>5.2. Строки доставки становлять від 1 до 7 робочих днів залежно від обраного способу та регіону.</p>
          <p>5.3. Покупець зобов&apos;язаний перевірити цілісність пакування та відповідність Товару при отриманні.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">6. Повернення та обмін</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>6.1. Покупець має право на повернення Товару належної якості протягом <strong>14 календарних днів</strong>.</p>
          <p>6.2. Товар повинен зберегти первісний товарний вигляд, ярлики та пакування.</p>
          <p>6.3. Товари, виготовлені за індивідуальним замовленням, поверненню належної якості не підлягають.</p>
          <p>6.4. У разі браку Покупець має право на заміну або повернення коштів протягом 30 днів.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">7. Гарантія</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>7.1. Гарантійний строк на Товари становить 30 календарних днів з дати отримання.</p>
          <p>7.2. Гарантія не поширюється на дефекти, що виникли внаслідок неналежного догляду (недотримання інструкцій на ярлику).</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">8. Інтелектуальна власність</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>8.1. Усі матеріали на Сайті (фото, тексти, дизайн) є об&apos;єктами інтелектуальної власності Продавця.</p>
          <p>8.2. Забороняється копіювання або використання матеріалів у комерційних цілях без письмового дозволу.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">9. Обмеження відповідальності</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>9.1. Продавець не несе відповідальності за технічні збої в роботі мереж зв&apos;язку або дії служб доставки.</p>
          <p>9.2. Сукупна відповідальність Продавця не може перевищувати вартість відповідного замовлення.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">10. Форс-мажор</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Сторони звільняються від відповідальності у разі виникнення обставин непереборної сили (стихійні лиха, воєнні дії тощо).</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">11. Вирішення спорів</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Усі спори вирішуються шляхом переговорів. У разі недосягнення згоди — у судовому порядку згідно з законодавством України.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">12. Зміна умов</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Продавець залишає за собою право вносити зміни до цих Умов. Зміни набирають чинності з моменту публікації на Сайті.</p>
          <p className="font-bold">Дата останнього оновлення: 02 червня 2025 року.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">13. Застосовне право</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Ці Умови регулюються та тлумачаться відповідно до законодавства України.</p>
        </div>
      </section>
    </div>
  );
}

function TermsEn() {
  return (
    <div className="prose prose-neutral max-w-none space-y-12">
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">1. General Provisions</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>1.1. This document is the official public offer of a sole proprietor operating under the trademark <strong>COFTOCHKA.COM</strong> (hereinafter — &quot;Seller&quot;, &quot;We&quot;), and contains the terms of a remote sales contract.</p>
          <p>1.2. A person placing an order on the Website <strong>https://www.coftochka.com</strong> (hereinafter — &quot;Buyer&quot;, &quot;You&quot;) is deemed to have accepted this offer in full upon confirming the order.</p>
          <p>1.3. The Seller and the Buyer are collectively referred to as &quot;Parties&quot; and individually as &quot;Party&quot;.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">2. Subject Matter</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>2.1. The Seller undertakes to transfer ownership of handmade knitted items (hereinafter — &quot;Goods&quot;) to the Buyer, and the Buyer undertakes to accept and pay for them.</p>
          <p>2.2. The assortment, description, and price of Goods are determined by the information on the Website.</p>
          <p>2.3. All Goods are handmade items. Minor color variations may occur due to screen settings and natural yarn properties.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">3. Prices and Payment</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>3.1. Prices are listed on the Website in Ukrainian hryvnias (UAH).</p>
          <p>3.2. Available payment methods: cash on delivery, online card payment, bank transfer.</p>
          <p>3.3. Cash-on-delivery orders incur a service fee per the delivery provider&apos;s rates.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">4. Order Process</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>4.1. An order is considered placed from the moment the Buyer confirms it on the Website.</p>
          <p>4.2. After the order is placed, the Seller contacts the Buyer within 1 business day to clarify details.</p>
          <p>4.3. If a product is unavailable, the Seller notifies the Buyer and issues a refund within 5 business days.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">5. Delivery</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>5.1. Delivery is available throughout Ukraine via <strong>Nova Poshta</strong> and <strong>Ukrposhta</strong>.</p>
          <p>5.2. Delivery time is 1–7 business days depending on the method and region.</p>
          <p>5.3. The Buyer must inspect the packaging and verify the Goods upon receipt.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">6. Returns and Exchanges</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>6.1. The Buyer may return undamaged Goods within <strong>14 calendar days</strong>.</p>
          <p>6.2. Goods must retain their original condition, tags, and packaging.</p>
          <p>6.3. Custom-made items are not eligible for return if they are of acceptable quality.</p>
          <p>6.4. In case of defects, the Buyer may request a replacement or refund within 30 days.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">7. Warranty</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>7.1. The warranty period is 30 calendar days from the date of receipt.</p>
          <p>7.2. The warranty does not cover defects caused by improper care (failure to follow label instructions).</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">8. Intellectual Property</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>8.1. All materials on the Website (photos, text, design) are the intellectual property of the Seller.</p>
          <p>8.2. Copying or commercial use of materials without written permission is prohibited.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">9. Limitation of Liability</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>9.1. The Seller is not liable for technical failures of communication networks or delivery service actions.</p>
          <p>9.2. The Seller&apos;s total liability shall not exceed the value of the relevant order.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">10. Force Majeure</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>The Parties are released from liability in the event of force majeure circumstances (natural disasters, military actions, etc.).</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">11. Dispute Resolution</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>All disputes shall be resolved through negotiations. If no agreement is reached — through court proceedings in accordance with Ukrainian law.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">12. Amendments</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>The Seller reserves the right to amend these Terms. Changes take effect upon publication on the Website.</p>
          <p className="font-bold">Date of last update: June 2, 2025.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">13. Governing Law</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>These Terms are governed by and construed in accordance with the laws of Ukraine.</p>
        </div>
      </section>
    </div>
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{dict.terms.title}</h1>
            <p className="text-sm text-neutral-400 mb-12 italic">{dict.terms.lastUpdated}</p>
            {lang === 'en' ? <TermsEn /> : <TermsUk />}
          </article>
        </div>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
