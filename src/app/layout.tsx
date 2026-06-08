import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  authors: [{ name: 'COFTOCHKA.COM' }],
  openGraph: {
    url: 'https://www.coftochka.com',
    siteName: 'COFTOCHKA.COM',
    type: 'website',
    images: [
      {
        url: 'https://www.coftochka.com/logo.png',
        width: 512,
        height: 512,
        alt: 'COFTOCHKA.COM',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const lang = pathname.startsWith('/en') ? 'en' : 'uk';

  return (
    <html
      lang={lang}
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-neutral-800 bg-white">
        {children}
      </body>
    </html>
  );
}
