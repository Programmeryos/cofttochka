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
  title: "COFTOCHKA.COM — В'язаний одяг ручної роботи з доставкою по Україні",
  description: "Відкрийте для себе затишок з COFTOCHKA.COM. В'язаний одяг ручної роботи, який обіймає. Светри, кардигани, оверсайз. Якість, стиль та handmade з любов'ю в Україні.",
  keywords: [
    // Ukrainian
    "кофта", "кофточка", "кофтина", "кофтинка",
    "в'язана кофта", "в'язана кофточка", "в'язана кофтина",
    "светр", "в'язаний светр", "кардиган", "в'язаний кардиган",
    "оверсайз светр", "в'язаний одяг", "в'язані речі",
    "купити кофту", "купити светр", "купити кардиган",
    "ручна робота", "handmade Україна",
    // Russian
    "кофта вязаная", "кофточка вязаная", "кофтина",
    "свитер вязаный", "кардиган вязаный", "вязаная одежда",
    "купить кофту", "купить свитер", "ручная работа",
    // English
    "knit sweater", "knitted cardigan", "knitwear Ukraine",
    "handmade sweater", "oversized knit", "wool cardigan",
    "buy knit sweater", "handmade knitwear",
  ],
  authors: [{ name: "COFTOCHKA.COM" }],
  openGraph: {
    title: "COFTOCHKA.COM — В'язаний одяг ручної роботи",
    description: "Затишний в'язаний одяг ручної роботи. Светри, кардигани, оверсайз. Зроблено в Україні.",
    url: "https://www.coftochka.com",
    siteName: "COFTOCHKA.COM",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "https://www.coftochka.com/logo.png",
        width: 512,
        height: 512,
        alt: "COFTOCHKA.COM — В'язаний одяг ручної роботи",
      },
    ],
  },
  alternates: {
    canonical: "https://www.coftochka.com",
  },
};

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StoreProvider } from "@/lib/StoreProvider";

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
        <StoreProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
