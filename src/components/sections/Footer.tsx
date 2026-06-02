import React from 'react';
import { Logo } from '../layout/Header';
import { Instagram, Send, Phone } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer id="contacts" className="bg-brand-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Logo light />
            <p className="mt-6 text-neutral-400 text-sm leading-relaxed">
              Ваш ідеальний затишок у кожній петельці. В&apos;язані вироби ручної роботи з доставкою по всій Україні.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Навігація</h4>
            <ul className="grid gap-3">
              <li><Link href="#catalog" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Каталог</Link></li>
              <li><Link href="#about" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Про нас</Link></li>
              <li><Link href="#contacts" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Контакти</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Допомога</h4>
            <ul className="grid gap-3">
              <li><Link href="#" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Доставка та оплата</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Повернення</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Таблиця розмірів</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Зв&apos;язатися з нами</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Send size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-sm text-neutral-400">
              Київ, Україна <br />
              +38 (099) 000-00-00 <br />
              hello@coftochka.ua
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© 2025 COFTOCHKA.UA. Усі права захищені.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Політика конфіденційності</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Умови використання</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
