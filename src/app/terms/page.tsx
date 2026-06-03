import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Умови використання | COFTOCHKA.COM',
  description: 'Умови та правила використання інтернет-магазину COFTOCHKA.COM. Порядок замовлення, оплати, доставки та повернення товарів.',
  alternates: {
    canonical: 'https://www.coftochka.com/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Публічна оферта та умови використання</h1>
            <p className="text-sm text-neutral-400 mb-12 italic">Остання редакція: 02 червня 2025 року</p>

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
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
