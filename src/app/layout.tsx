import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "COFTOCHKA.UA — В'язані кофти ручної роботи з доставкою по Україні",
  description: "Відкрийте для себе затишок з COFTOCHKA.UA. В'язані кофти ручної роботи, які обіймають. Якість, стиль та handmade з любов'ю в Україні.",
  keywords: ["в'язані кофти", "купити кофту", "handmade", "Україна", "ручна робота", "одяг"],
  authors: [{ name: "COFTOCHKA.UA" }],
  openGraph: {
    title: "COFTOCHKA.UA — В'язані кофти ручної роботи",
    description: "Затишні в'язані кофти ручної роботи. Зроблено в Україні.",
    url: "https://coftochka.ua",
    siteName: "COFTOCHKA.UA",
    locale: "uk_UA",
    type: "website",
  },
  alternates: {
    canonical: "https://coftochka.ua",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-neutral-800 bg-white">
        {children}
      </body>
    </html>
  );
}
