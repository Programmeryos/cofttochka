import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Category,
  Product,
  ProductsResponse,
  ProductsParams,
  Review,
  ReviewsResponse,
  RecentReview,
  CheckReviewResponse,
  CreateReviewBody,
  Order,
  CreateOrderBody,
} from './types';

export const coftochkaApi = createApi({
  reducerPath: 'coftochkaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hospitable-manifestation-production-dc1f.up.railway.app',
  }),
  endpoints: (builder) => ({
    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),

    // Products
    getProducts: builder.query<ProductsResponse, ProductsParams | void>({
      query: (params) => ({
        url: '/products',
        params: params ?? undefined,
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),

    // Reviews
    getProductReviews: builder.query<ReviewsResponse, string>({
      query: (productId) => `/products/${productId}/reviews`,
    }),
    checkProductReview: builder.query<CheckReviewResponse, { productId: string; deviceId: string }>({
      query: ({ productId, deviceId }) => ({
        url: `/products/${productId}/reviews/check`,
        params: { deviceId },
      }),
    }),
    createReview: builder.mutation<Review, { productId: string; body: CreateReviewBody }>({
      query: ({ productId, body }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body,
      }),
    }),
    getRecentReviews: builder.query<RecentReview[], number | void>({
      query: (limit) => ({
        url: '/reviews/recent',
        params: limit ? { limit } : undefined,
      }),
    }),

    // Orders
    createOrder: builder.mutation<Order, CreateOrderBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
  useCheckProductReviewQuery,
  useCreateReviewMutation,
  useGetRecentReviewsQuery,
  useCreateOrderMutation,
} = coftochkaApi;
