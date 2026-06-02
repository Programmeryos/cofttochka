import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <p className="text-8xl mb-6">🧶</p>
          <h1 className="text-6xl font-serif font-bold text-brand-dark mb-4">404</h1>
          <p className="text-xl font-serif italic text-neutral-400 mb-2">
            Сторінку не знайдено
          </p>
          <p className="text-sm text-neutral-400 mb-10 max-w-sm mx-auto">
            Схоже, ця нитка обірвалась. Повернімось до колекції.
          </p>
          <Link
            href="/#catalog"
            className="inline-block bg-brand-primary text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-brand-secondary transition-all hover:shadow-lg hover:-translate-y-1"
          >
            До каталогу
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
