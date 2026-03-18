import { baseApi } from "@/shared/api/baseApi";
import type { Product } from "@/shared/types/product";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { search: string; page: number; limit: number }
    >({
      query: ({ search, page, limit }) => {
        const skip = (page - 1) * limit;

        if (search) {
          return `products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        }

        return `products?limit=${limit}&skip=${skip}`;
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
