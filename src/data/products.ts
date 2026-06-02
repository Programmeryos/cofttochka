export interface ProductColor {
  hex: string;
  name: string;
}

export type ProductType = 'Оверсайз' | 'Приталена' | 'Кардиган' | 'Светр';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  type: ProductType;
  colors: ProductColor[];
  sizes: ProductSize[];
  image: string;
  images: string[];
  isNew?: boolean;
  isHit?: boolean;
  description: string;
  composition: string;
  care: string[];
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "kardyhan-lavendovyi-vichir",
    name: "Кардиган 'Лавандовий вечір'",
    price: 2400,
    type: 'Кардиган',
    colors: [{ hex: '#C9B8D8', name: 'Лавандовий' }],
    sizes: ['S', 'M', 'L'],
    image: img('1576566588028-4147f3842f27'),
    images: [
      img('1576566588028-4147f3842f27'),
      img('1591369822096-ffd140ec948f'),
      img('1583743814966-8936f5b7be1a')
    ],
    isNew: true,
    description: "Ніжний та затишний кардиган ручної в'язки. Ідеально підходить для прохолодних літніх вечорів та осінніх прогулянок. Вільний крій забезпечує максимальний комфорт та свободу рухів.",
    composition: "80% мериносова вовна, 20% акрил",
    care: ["Ручне прання при 30°C", "Сушити в розправленому вигляді", "Не прасувати"]
  },
  {
    id: 2,
    slug: "svetr-molochnyi-zatyshok",
    name: "Светр 'Молочний затишок'",
    price: 1850,
    type: 'Светр',
    colors: [{ hex: '#FFF8E7', name: 'Кремовий' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: img('1583744946564-b52ac1c389c8'),
    images: [
      img('1583744946564-b52ac1c389c8'),
      img('1583743814966-8936f5b7be1a')
    ],
    isHit: true,
    description: "Класичний светр у молочному відтінку. Виконаний з м'якої преміальної пряжі, яка не подразнює шкіру. Базова річ для будь-якого гардеробу, що дарує відчуття справжнього домашнього тепла.",
    composition: "70% бавовна, 30% вовна",
    care: ["Машинне прання (режим вовна)", "Не відбілювати", "Сушити горизонтально"]
  },
  {
    id: 3,
    slug: "oversayз-terakota",
    name: "Оверсайз 'Теракота'",
    price: 2100,
    type: 'Оверсайз',
    colors: [{ hex: '#E2725B', name: 'Теракота' }],
    sizes: ['S', 'M', 'L'],
    image: img('1520367445093-50dc08a59d9d'),
    images: [img('1520367445093-50dc08a59d9d')],
    description: "Об'ємний оверсайз насиченого теракотового кольору. Створений для тих, хто цінує стиль, комфорт та натуральні матеріали.",
    composition: "100% органічна бавовна",
    care: ["Ручне прання", "Прасувати при низькій температурі"]
  },
  {
    id: 4,
    slug: "prytalena-hrafıt",
    name: "Приталена 'Графіт'",
    price: 1600,
    type: 'Приталена',
    colors: [{ hex: '#4B4B4B', name: 'Графіт' }],
    sizes: ['S', 'M', 'L'],
    image: img('1485218126466-34e6392ec754'),
    images: [img('1485218126466-34e6392ec754')],
    description: "Елегантний приталений светр, що ідеально підкреслює фігуру. Чудово поєднується як з класичними брюками, так і з повсякденними джинсами.",
    composition: "50% віскоза, 50% акрил",
    care: ["Машинне прання 40°C", "Можна прасувати"]
  },
  {
    id: 5,
    slug: "svetr-hırtchytsia",
    name: "Светр 'Гірчиця'",
    price: 1950,
    type: 'Светр',
    colors: [{ hex: '#D4A017', name: 'Гірчичний' }],
    sizes: ['M', 'L', 'XL'],
    image: img('1608234808654-2a8875faa7fd'),
    images: [img('1608234808654-2a8875faa7fd')],
    isNew: true,
    description: "Яскравий светр кольору гірчиці додасть сонячного настрою вашому осінньому гардеробу. Ручна робота високої якості з увагою до кожної петельки.",
    composition: "100% мериносова вовна",
    care: ["Тільки ручне прання", "Не сушити в машині"]
  },
  {
    id: 6,
    slug: "kardyhan-kremovyi",
    name: "Кардиган 'Кремовий'",
    price: 2600,
    type: 'Кардиган',
    colors: [{ hex: '#FFF8E7', name: 'Кремовий' }],
    sizes: ['S', 'M', 'L', 'XL'],
    image: img('1585487000160-6ebcfceb0d03'),
    images: [img('1585487000160-6ebcfceb0d03')],
    description: "Класичний довгий кардиган у благородному кремовому кольорі. Теплий, м'який та неймовірно приємний на дотик.",
    composition: "80% вовна, 20% нейлон",
    care: ["Хімчистка рекомендована", "Ручне прання у холодній воді"]
  }
];

export const ALL_COLORS: ProductColor[] = Array.from(
  new Map(
    PRODUCTS.flatMap(p => p.colors).map(c => [c.name, c])
  ).values()
);

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
