import React from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';

export const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1632649027900-389e810204e6?w=800&h=800&fit=crop&q=85"
                alt="Майстриня за в'язанням — ручна робота COFTOCHKA.UA"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-serif font-bold mb-8">Зроблено з любов&apos;ю до кожної деталі</h2>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
              COFTOCHKA.UA — це не просто бренд одягу, це філософія затишку. Кожна наша кофта створюється вручну майстрами, які вкладають частку своєї душі у кожен виріб. Ми використовуємо тільки високоякісну натуральну пряжу, щоб ви відчували тепло та ніжність кожного дня.
            </p>

            <div className="grid gap-6">
              {[
                { icon: Heart, title: 'Handmade', text: 'Кожен виріб унікальний та створений вручну.' },
                { icon: ShieldCheck, title: 'Якість', text: 'Використовуємо лише преміальну італійську та турецьку пряжу.' },
                { icon: MapPin, title: 'Зроблено в Україні', text: 'Ми пишаємося нашим українським корінням.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shrink-0 shadow-sm">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
