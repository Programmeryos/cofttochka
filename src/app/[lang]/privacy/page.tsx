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
    title: dict.privacy.pageTitle,
    description: dict.privacy.pageDescription,
    alternates: {
      canonical: `https://www.coftochka.com/${lang}/privacy`,
      languages: {
        uk: 'https://www.coftochka.com/uk/privacy',
        en: 'https://www.coftochka.com/en/privacy',
      },
    },
  };
}

function PrivacyUk() {
  return (
    <div className="prose prose-neutral max-w-none space-y-12">
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">1. Загальні положення</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>1.1. Ця Політика конфіденційності (далі — «Політика») регулює порядок збору, зберігання, обробки та захисту персональних даних користувачів (далі — «Користувач», «Ви») інтернет-магазину <strong>COFTOCHKA.COM</strong>, розміщеного за адресою: <strong>https://www.coftochka.com</strong> (далі — «Сайт», «Магазин»).</p>
          <p>1.2. Ця Політика розроблена відповідно до вимог Закону України «Про захист персональних даних» від 01.06.2010 № 2297-VI, а також застосовних норм Загального регламенту про захист даних ЄС (GDPR).</p>
          <p>1.3. Використовуючи Сайт, здійснюючи замовлення, Ви підтверджуєте, що ознайомились із цією Політикою та надаєте згоду на обробку Ваших персональних даних.</p>
          <p>1.4. Якщо Ви не погоджуєтесь із умовами цієї Політики, будь ласка, утримайтесь від використання Сайту.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">2. Ідентифікація оператора</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>2.1. Оператором персональних даних є фізична особа — підприємець, що здійснює діяльність під торговою маркою <strong>COFTOCHKA.COM</strong>.</p>
          <p>2.2. Контактні дані:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Електронна пошта:</strong> <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a></li>
            <li><strong>Телефон:</strong> +38 0688521018</li>
            <li><strong>Адреса:</strong> м. Київ, Україна</li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">3. Персональні дані, що збираються</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p><strong>3.1. Дані, що Ви надаєте нам:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Прізвище, ім&apos;я та по батькові;</li>
            <li>Контактний номер телефону;</li>
            <li>Адреса електронної пошти;</li>
            <li>Поштова адреса для доставки.</li>
          </ul>
          <p><strong>3.2. Дані, що збираються автоматично:</strong></p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-600">
            <li>IP-адреса; тип та версія браузера;</li>
            <li>Дата і час відвідування; переглянуті сторінки;</li>
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
                ['4.3', "Зв'язок щодо статусу замовлення", 'Виконання договору'],
                ['4.4', 'Обробка звернень та запитів', 'Законний інтерес'],
                ['4.5', 'Маркетингові розсилки', 'Ваша згода'],
                ['4.6', 'Аналіз та покращення Сайту', 'Законний інтерес'],
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
        <h2 className="text-2xl font-serif font-bold mb-4">5. Строки зберігання</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>5.1. Дані, пов&apos;язані із замовленнями, зберігаються протягом <strong>3 (трьох) років</strong> з моменту виконання замовлення.</p>
          <p>5.2. Дані на підставі Вашої згоди — до відкликання такої згоди.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">6. Передача даних третім особам</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Служби доставки</strong> (Нова Пошта, Укрпошта) — для здійснення доставки;</li>
            <li><strong>Платіжні сервіси</strong> — для обробки платежів;</li>
            <li><strong>Державні органи</strong> — на підставі законного запиту.</li>
          </ul>
          <p>Ми не продаємо Ваші дані третім особам.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">7. Файли cookie</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Сайт використовує файли cookie для запам&apos;ятовування Ваших дій та налаштувань. Ви можете вимкнути cookie у налаштуваннях браузера.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">8. Права суб&apos;єктів персональних даних</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Ви маєте права на: доступ, виправлення, видалення, обмеження обробки, заперечення та портативність даних.</p>
          <p>Для реалізації прав надішліть запит на <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a>. Строк розгляду — до 30 днів.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">9. Захист даних</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Ми вживаємо технічних та організаційних заходів для захисту даних. Сайт використовує захищене з&apos;єднання HTTPS.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">10. Зміни до Політики</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Продовження використання Сайту після змін означає Вашу згоду з оновленою редакцією.</p>
          <p className="font-bold">Дата останнього оновлення: 02 червня 2025 року.</p>
        </div>
      </section>
    </div>
  );
}

function PrivacyEn() {
  return (
    <div className="prose prose-neutral max-w-none space-y-12">
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">1. General Provisions</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>1.1. This Privacy Policy (hereinafter — &quot;Policy&quot;) governs the collection, storage, processing and protection of personal data of users (hereinafter — &quot;User&quot;, &quot;You&quot;) of the <strong>COFTOCHKA.COM</strong> online store at <strong>https://www.coftochka.com</strong>.</p>
          <p>1.2. This Policy is developed in accordance with the Law of Ukraine &quot;On Personal Data Protection&quot; and applicable provisions of the EU General Data Protection Regulation (GDPR).</p>
          <p>1.3. By using the Website or placing an order, You confirm that You have read this Policy and consent to the processing of Your personal data.</p>
          <p>1.4. If You disagree with this Policy, please refrain from using the Website.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">2. Data Controller</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>2.1. The data controller is a sole proprietor operating under the trademark <strong>COFTOCHKA.COM</strong>.</p>
          <p>2.2. Contact details:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email:</strong> <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a></li>
            <li><strong>Phone:</strong> +38 0688521018</li>
            <li><strong>Address:</strong> Kyiv, Ukraine</li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">3. Data Collected</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p><strong>3.1. Data you provide directly:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full name;</li>
            <li>Phone number;</li>
            <li>Email address;</li>
            <li>Delivery address.</li>
          </ul>
          <p><strong>3.2. Data collected automatically:</strong></p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-600">
            <li>IP address; browser type and version;</li>
            <li>Visit date and time; pages viewed;</li>
            <li>Cookie data.</li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">4. Processing Purposes and Legal Basis</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-100 text-left">
                <th className="p-3 border border-neutral-200">#</th>
                <th className="p-3 border border-neutral-200">Purpose</th>
                <th className="p-3 border border-neutral-200">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['4.1', 'Processing and fulfilling orders', 'Contract performance'],
                ['4.2', 'Arranging delivery', 'Contract performance'],
                ['4.3', 'Order status communication', 'Contract performance'],
                ['4.4', 'Handling inquiries', 'Legitimate interest'],
                ['4.5', 'Marketing communications', 'Your consent'],
                ['4.6', 'Website analytics and improvement', 'Legitimate interest'],
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
        <h2 className="text-2xl font-serif font-bold mb-4">5. Retention Periods</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>5.1. Order-related data is retained for <strong>3 years</strong> from order fulfillment.</p>
          <p>5.2. Consent-based data is retained until consent is withdrawn.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">6. Third-Party Sharing</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Delivery services</strong> (Nova Poshta, Ukrposhta) — to fulfill delivery;</li>
            <li><strong>Payment processors</strong> — to process payments;</li>
            <li><strong>Government authorities</strong> — upon lawful request.</li>
          </ul>
          <p>We do not sell Your personal data to third parties.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">7. Cookies</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>The Website uses cookies to remember Your actions and preferences. You may disable cookies in your browser settings.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">8. Your Rights</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>You have the rights of access, rectification, erasure, restriction of processing, objection, and data portability.</p>
          <p>To exercise your rights, send a request to <a href="mailto:romandricik@gmail.com" className="text-brand-primary hover:underline">romandricik@gmail.com</a>. Response time — up to 30 days.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">9. Data Security</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>We implement technical and organizational measures to protect your data. The Website uses a secure HTTPS connection.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-serif font-bold mb-4">10. Policy Updates</h2>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>Continued use of the Website after changes constitutes Your agreement with the updated Policy.</p>
          <p className="font-bold">Date of last update: June 2, 2025.</p>
        </div>
      </section>
    </div>
  );
}

export default async function PrivacyPage({
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{dict.privacy.title}</h1>
            <p className="text-sm text-neutral-400 mb-12 italic">{dict.privacy.lastUpdated}</p>
            {lang === 'en' ? <PrivacyEn /> : <PrivacyUk />}
          </article>
        </div>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
