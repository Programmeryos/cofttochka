import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from '@/dictionaries';

export const Hero = ({ dict }: { dict: Dictionary['hero'] }) => {
  return (
    <section className="relative min-h-[80vh] h-auto flex items-center overflow-hidden bg-brand-light py-16 md:py-0">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #D4A373 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-4 md:mb-6 animate-slide-up">
            {dict.title} <br />
            <span className="text-brand-primary italic">{dict.titleHighlight}</span>
          </h1>

          <p className="text-base md:text-xl text-neutral-600 mb-6 md:mb-10 max-w-lg leading-relaxed animate-slide-up [animation-delay:0.2s]">
            {dict.description}
          </p>

          <div className="animate-slide-up [animation-delay:0.4s]">
            <Link
              href="#catalog"
              className="inline-block bg-brand-dark text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-neutral-700 transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              {dict.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1607557997149-96bf2b30c3c3?w=900&h=1200&fit=crop&q=85"
          alt={dict.imageAlt}
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-light via-brand-light/20 to-transparent" />
      </div>
    </section>
  );
};
