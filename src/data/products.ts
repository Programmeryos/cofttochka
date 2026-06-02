export interface ProductColor {
  hex: string;
  name: string;
}

export type ProductType = 'Оверсайз' | 'Приталена' | 'Кардиган' | 'Светр';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: number;
  name: string;
  price: number;
  type: ProductType;
  colors: ProductColor[];
  sizes: ProductSize[];
  image: string;
  isNew?: boolean;
  isHit?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=750&fit=crop&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Кардиган 'Лавандовий вечір'",
    price: 2400,
    type: 'Кардиган',
    colors: [{ hex: '#C9B8D8', name: 'Лавандовий' }],
    sizes: ['S', 'M', 'L'],
    image: img('1576566588028-4147f3842f27'),
    isNew: true,
  },
  {
    id: 2,
    name: "Светр 'Молочний затишок'",
    price: 1850,
    type: 'Светр',
    colors: [{ hex: '#FFF8E7', name: 'Кремовий' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: img('1583744946564-b52ac1c389c8'),
    isHit: true,
  },
  {
    id: 3,
    name: "Оверсайз 'Теракота'",
    price: 2100,
    type: 'Оверсайз',
    colors: [{ hex: '#E2725B', name: 'Теракота' }],
    sizes: ['S', 'M', 'L'],
    image: img('1520367445093-50dc08a59d9d'),
  },
  {
    id: 4,
    name: "Приталена 'Графіт'",
    price: 1600,
    type: 'Приталена',
    colors: [{ hex: '#4B4B4B', name: 'Графіт' }],
    sizes: ['S', 'M', 'L'],
    image: img('1485218126466-34e6392ec754'),
  },
  {
    id: 5,
    name: "Светр 'Гірчиця'",
    price: 1950,
    type: 'Светр',
    colors: [{ hex: '#D4A017', name: 'Гірчичний' }],
    sizes: ['M', 'L', 'XL'],
    image: img('1608234808654-2a8875faa7fd'),
    isNew: true,
  },
  {
    id: 6,
    name: "Кардиган 'Кремовий'",
    price: 2600,
    type: 'Кардиган',
    colors: [{ hex: '#FFF8E7', name: 'Кремовий' }],
    sizes: ['S', 'M', 'L', 'XL'],
    image: img('1585487000160-6ebcfceb0d03'),
  },
  {
    id: 7,
    name: "Оверсайз 'Шоколад'",
    price: 2200,
    type: 'Оверсайз',
    colors: [{ hex: '#8B5E3C', name: 'Коричневий' }],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: img('1574180566232-aaad1b5b8450'),
  },
  {
    id: 8,
    name: "Приталена 'Пудра'",
    price: 1750,
    type: 'Приталена',
    colors: [{ hex: '#F4C2C2', name: 'Рожевий' }],
    sizes: ['XS', 'S', 'M'],
    image: img('1548624313-0396c75e4b1a'),
    isNew: true,
  },
  {
    id: 9,
    name: "Светр 'Морська хвиля'",
    price: 2050,
    type: 'Светр',
    colors: [{ hex: '#4ECDC4', name: 'Бірюзовий' }],
    sizes: ['S', 'M', 'L', 'XL'],
    image: img('1434389677669-e08b4cac3105'),
  },
  {
    id: 10,
    name: "Кардиган 'Кавовий'",
    price: 2800,
    type: 'Кардиган',
    colors: [{ hex: '#A0784E', name: 'Кавовий' }],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: img('1590330297626-d7aff25a0431'),
    isHit: true,
  },
  {
    id: 11,
    name: "Оверсайз 'Сніговий'",
    price: 1900,
    type: 'Оверсайз',
    colors: [{ hex: '#F5F5F5', name: 'Білий' }],
    sizes: ['XS', 'S', 'M', 'L'],
    image: img('1581655353564-df123a1eb820'),
  },
  {
    id: 12,
    name: "Приталена 'Чорна ніч'",
    price: 1550,
    type: 'Приталена',
    colors: [{ hex: '#1A1A1A', name: 'Чорний' }],
    sizes: ['XS', 'S', 'M', 'L'],
    image: img('1516762689617-e1cffcef479d'),
  },
];

export const ALL_COLORS: ProductColor[] = Array.from(
  new Map(
    PRODUCTS.flatMap(p => p.colors).map(c => [c.name, c])
  ).values()
);
