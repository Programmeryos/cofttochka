import React from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';
import type { Dictionary } from '@/dictionaries';

export const AboutUs = ({ dict }: { dict: Dictionary['about'] }) => {
  const features = [
    { icon: Heart, title: dict.features.handmade.title, text: dict.features.handmade.text },
    { icon: ShieldCheck, title: dict.features.quality.title, text: dict.features.quality.text },
    { icon: MapPin, title: dict.features.madeInUkraine.title, text: dict.features.madeInUkraine.text },
  ];

  return (
    <section id="about" className="py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1632649027900-389e810204e6?w=800&h=800&fit=crop&q=85"
                alt={dict.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-serif font-bold mb-8">{dict.title}</h2>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed">{dict.description}</p>

            <div className="grid gap-6">
              {features.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shrink-0 shadow-sm">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
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
