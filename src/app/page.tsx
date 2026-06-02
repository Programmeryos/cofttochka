import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { AboutUs } from "@/components/sections/AboutUs";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COFTOCHKA.UA",
    "url": "https://coftochka.ua",
    "logo": "https://coftochka.ua/logo.png",
    "description": "В'язані кофти ручної роботи з доставкою по Україні",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Київ",
      "addressCountry": "UA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+38-099-000-00-00",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Catalog />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
