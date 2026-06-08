import React from 'react';
import Image from 'next/image';
import { Logo } from '../layout/Header';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import type { Dictionary } from '@/dictionaries';
import type { Locale } from '@/i18n-config';

interface FooterProps {
  dict: Dictionary['footer'];
  lang: Locale;
}

export const Footer = ({ dict, lang }: FooterProps) => {
  return (
    <footer id="contacts" className="bg-brand-dark text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-16 items-start">
          <div>
            <Logo light />
            <p className="mt-6 text-neutral-400 text-sm leading-relaxed">{dict.description}</p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{dict.navigation}</h4>
            <ul className="grid gap-3">
              <li>
                <Link
                  href={`/${lang}/#catalog`}
                  className="text-neutral-400 hover:text-brand-primary transition-colors text-sm"
                >
                  {dict.navCatalog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/#about`}
                  className="text-neutral-400 hover:text-brand-primary transition-colors text-sm"
                >
                  {dict.navAbout}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/#contacts`}
                  className="text-neutral-400 hover:text-brand-primary transition-colors text-sm"
                >
                  {dict.navContacts}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{dict.contactUs}</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/alla_thalanchyk?igsh=dDAzZXNrYmVwYW4z"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.instagramAriaLabel}
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="tel:+380688521018"
                aria-label={dict.phoneAriaLabel}
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
            <p className="text-sm text-neutral-400">
              {dict.address} <br />
              <a
                href="tel:+380688521018"
                className="inline-block py-1.5 hover:text-brand-primary transition-colors"
              >
                +38 0688521018
              </a>{' '}
              <br />
              <a
                href="mailto:romandricik@gmail.com"
                className="inline-block py-1.5 hover:text-brand-primary transition-colors"
              >
                romandricik@gmail.com
              </a>
            </p>
          </div>

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
          <p>{dict.rights}</p>
          <div className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">
              {dict.privacyLink}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors">
              {dict.termsLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
