export interface ProductImage {
  id: string;
  url: string;
  position: number;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface Product {
  id: string;
  slug: string | null;
  name: string;
  description: string | null;
  price: number;
  inStock: boolean;
  size: ProductSize | null;
  categoryId: string | null;
  category: Category | null;
  images: ProductImage[];
  avgRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}

export interface ProductsParams {
  categoryId?: string;
  inStock?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  text: string | null;
  createdAt: string;
}

export interface ReviewsResponse {
  data: Review[];
  avgRating: number;
  total: number;
}

export interface RecentReview {
  id: string;
  rating: number;
  text: string | null;
  createdAt: string;
  productId: string;
  product: {
    id: string;
    name: string;
    images: ProductImage[];
  };
}

export interface CheckReviewResponse {
  hasReview: boolean;
}

export interface CreateReviewBody {
  deviceId: string;
  rating: number;
  text?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  comment: string | null;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderBody {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  comment?: string;
  items: { productId: string; quantity: number }[];
}
