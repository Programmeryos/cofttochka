import React from 'react';
import Image from 'next/image';
import { Logo } from '../layout/Header';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer id="contacts" className="bg-brand-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-16 items-start">
          {/* Ліво: лого + опис */}
          <div>
            <Logo light />
            <p className="mt-6 text-neutral-400 text-sm leading-relaxed">
              Ваш ідеальний затишок у кожній петельці. В&apos;язані вироби ручної роботи з доставкою по всій Україні.
            </p>
          </div>

          {/* Навігація */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Навігація</h4>
            <ul className="grid gap-3">
              <li><Link href="#catalog" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Каталог</Link></li>
              <li><Link href="#about" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Про нас</Link></li>
              <li><Link href="#contacts" className="text-neutral-400 hover:text-brand-primary transition-colors text-sm">Контакти</Link></li>
            </ul>
          </div>

          {/* Зв'язатися з нами */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Зв&apos;язатися з нами</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.instagram.com/alla_thalanchyk?igsh=dDAzZXNrYmVwYW4z" target="_blank" rel="noopener noreferrer" aria-label="Instagram COFTOCHKA" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="tel:+380688521018" aria-label="Зателефонувати" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-sm text-neutral-400">
              Київ, Україна <br />
              <a href="tel:+380688521018" className="inline-block py-1.5 hover:text-brand-primary transition-colors">+38 0688521018</a> <br />
              <a href="mailto:romandricik@gmail.com" className="inline-block py-1.5 hover:text-brand-primary transition-colors">romandricik@gmail.com</a>
            </p>
          </div>

          {/* Право: велике лого */}
          <div className="hidden md:flex justify-end items-start">
            <Image
              src="/logo.svg"
              alt="COFTOCHKA.COM"
              width={200}
              height={200}
              className="object-contain opacity-90"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <p>© 2026 COFTOCHKA.COM. Усі права захищені.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Політика конфіденційності</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Умови використання</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
