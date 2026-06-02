import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Політика конфіденційності | COFTOCHKA.COM',
  description: 'Дізнайтесь як COFTOCHKA.COM збирає, зберігає та захищає ваші персональні дані відповідно до законодавства України.',
  alternates: {
    canonical: 'https://www.coftochka.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Політика конфіденційності</h1>
            <p className="text-sm text-neutral-400 mb-12 italic">Остання редакція: 02 червня 2025 року</p>

            <div className="prose prose-neutral max-w-none space-y-12">
              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">1. Загальні положення</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>1.1. Ця Політика конфіденційності (далі — «Політика») регулює порядок збору, зберігання, обробки та захисту персональних даних користувачів (далі — «Користувач», «Ви») інтернет-магазину <strong>COFTOCHKA.COM</strong>, розміщеного за адресою: <strong>https://www.coftochka.com</strong> (далі — «Сайт», «Магазин»).</p>
                  <p>1.2. Ця Політика розроблена відповідно до вимог Закону України «Про захист персональних даних» від 01.06.2010 № 2297-VI, Закону України «Про інформацію», а також застосовних норм Загального регламенту про захист даних ЄС (GDPR) у частині, що стосується обробки даних громадян держав-членів ЄС.</p>
                  <p>1.3. Використовуючи Сайт, здійснюючи замовлення або реєструючись, Ви підтверджуєте, що ознайомились із цією Політикою та надаєте добровільну, конкретну, поінформовану та однозначну згоду на обробку Ваших персональних даних у порядку та на умовах, визначених цією Політикою.</p>
                  <p>1.4. Якщо Ви не погоджуєтесь із умовами цієї Політики, будь ласка, утримайтесь від використання Сайту та передачі нам будь-яких персональних даних.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">2. Ідентифікація оператора персональних даних</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>2.1. Оператором персональних даних є фізична особа — підприємець, що здійснює діяльність під торговою маркою <strong>COFTOCHKA.COM</strong> (далі — «Оператор», «Ми»).</p>
                  <p>2.2. Контактні дані Оператора:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Електронна пошта:</strong> <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a></li>
                    <li><strong>Телефон:</strong> +38 0688521018</li>
                    <li><strong>Адреса:</strong> м. Київ, Україна</li>
                  </ul>
                  <p>2.3. З усіх питань, пов&apos;язаних із обробкою персональних даних, захистом Ваших прав або відкликанням згоди, Ви можете звернутися до Оператора за зазначеними вище контактними даними.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">3. Перелік персональних даних, що збираються</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p><strong>3.1. Дані, що Ви надаєте нам безпосередньо:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Прізвище, ім&apos;я та по батькові (за наявності);</li>
                    <li>Контактний номер телефону;</li>
                    <li>Адреса електронної пошти;</li>
                    <li>Поштова адреса для доставки (місто, відділення Нової Пошти або Укрпошти, або адреса для кур&apos;єрської доставки);</li>
                    <li>Інформація, що міститься у Ваших повідомленнях до нас (у тому числі через форми зворотного зв&apos;язку, месенджери, електронну пошту).</li>
                  </ul>
                  <p><strong>3.2. Дані, що збираються автоматично:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-600">
                    <li>IP-адреса пристрою; тип та версія браузера; операційна система;</li>
                    <li>Дата і час відвідування Сайту; переглянуті сторінки та час, проведений на них;</li>
                    <li>Реферальне джерело (звідки Ви перейшли на Сайт);</li>
                    <li>Дані файлів cookie.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">4. Мета та правові підстави обробки</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-neutral-100 text-left">
                        <th className="p-3 border border-neutral-200">№</th>
                        <th className="p-3 border border-neutral-200">Мета обробки</th>
                        <th className="p-3 border border-neutral-200">Правова підстава</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['4.1', 'Оформлення та виконання замовлень', 'Виконання договору'],
                        ['4.2', 'Організація доставки товарів', 'Виконання договору'],
                        ['4.3', 'Зв&apos;язок щодо статусу замовлення', 'Виконання договору'],
                        ['4.4', 'Обробка звернень та запитів', 'Законний інтерес'],
                        ['4.5', 'Маркетингові розсилки', 'Ваша згода'],
                        ['4.6', 'Аналіз та покращення Сайту', 'Законний інтерес'],
                        ['4.7', 'Виконання юридичних обов&apos;язків', 'Юридичний обов&apos;язок'],
                      ].map(([no, goal, basis]) => (
                        <tr key={no} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3 border border-neutral-200 font-bold">{no}</td>
                          <td className="p-3 border border-neutral-200">{goal}</td>
                          <td className="p-3 border border-neutral-200">{basis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">5. Строки зберігання персональних даних</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>5.1. Персональні дані, пов&apos;язані із замовленнями, зберігаються протягом <strong>3 (трьох) років</strong> з моменту виконання замовлення.</p>
                  <p>5.2. Дані, що обробляються на підставі Вашої згоди, зберігаються до моменту відкликання такої згоди.</p>
                  <p>5.3. Після закінчення строків зберігання дані знищуються або знеособлюються.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">6. Передача даних третім особам</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>6.1. Ми передаємо Ваші персональні дані лише у таких випадках:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Служби доставки</strong> (Нова Пошта, Укрпошта) — для здійснення доставки;</li>
                    <li><strong>Платіжні сервіси</strong> — для обробки платежів;</li>
                    <li><strong>Сервіси аналітики</strong> — у знеособленому вигляді;</li>
                    <li><strong>Державні органи</strong> — на підставі законного запиту.</li>
                  </ul>
                  <p>6.2. Ми не продаємо Ваші дані третім особам.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">7. Файли cookie</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>7.1. Сайт використовує файли cookie для запам&apos;ятовування Ваших дій та налаштувань.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-neutral-100 text-left">
                          <th className="p-3 border border-neutral-200">Тип</th>
                          <th className="p-3 border border-neutral-200">Призначення</th>
                          <th className="p-3 border border-neutral-200">Строк</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Необхідні', 'Базове функціонування, кошик', '30 днів'],
                          ['Функціональні', 'Запам&apos;ятовування уподобань', '1 рік'],
                          ['Аналітичні', 'Статистика відвідувань', '2 роки'],
                          ['Маркетингові', 'Таргетована реклама', '1 рік'],
                        ].map(([type, desc, term]) => (
                          <tr key={type} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-3 border border-neutral-200 font-bold">{type}</td>
                            <td className="p-3 border border-neutral-200">{desc}</td>
                            <td className="p-3 border border-neutral-200">{term}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">8. Права суб&apos;єктів персональних даних</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>Відповідно до законодавства, Ви маєте права на: доступ, виправлення, видалення («право бути забутим»), обмеження обробки, заперечення, портативність даних та відкликання згоди.</p>
                  <p>Для реалізації прав надішліть запит на <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a>. Строк розгляду — до 30 днів.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">9. Захист персональних даних</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>Ми вживаємо технічних та організаційних заходів для захисту даних від несанкціонованого доступу. Сайт використовує захищене з&apos;єднання HTTPS.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-bold mb-4">10. Зміни до Політики</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>Оператор залишає за собою право вносити зміни до цієї Політики. Продовження використання Сайту після змін означає Вашу згоду з оновленою редакцією.</p>
                  <p className="font-bold">Дата останнього оновлення: 02 червня 2025 року.</p>
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
