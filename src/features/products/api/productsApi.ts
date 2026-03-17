import { baseApi } from '@/shared/api/baseApi';
import type { Product } from '@/shared/types/product';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { search: string; page: number; limit: number }>({
      query: ({ search, page, limit }) => {
        const skip = (page - 1) * limit;
        if (search) {
          return `products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const { search, limit } = queryArgs;
        return `products-${search}-${limit}`;
      },
      merge: (currentCache, newItems) => newItems, 
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page || currentArg?.search !== previousArg?.search,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApi;