import {
  productsApi,
  useGetProductsQuery,
} from "@/features/products/api/productsApi";
import { useProductParams } from "./useProductParams";
import { sortProducts } from "@/features/products/lib/sorting";
import { useEffect } from "react";
import { getErrorMessage } from "../lib/errors/getErrorMessage";
import { toast } from "sonner";
import type { SortField } from "../types/product";

export const useProducts = () => {
  const { search, page, limit, sortBy, sortDir, setParams } =
    useProductParams();

  const prefetch = productsApi.usePrefetch("getProducts");

  const query = useGetProductsQuery({ search, page, limit });

  const products = query.data?.products ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const sortedProducts = () => sortProducts(products, sortBy, sortDir);

  useEffect(() => {
    if (page > totalPages) {
      setParams({ page: totalPages });
    }
  }, [page, totalPages, setParams]);

  useEffect(() => {
    if (page < totalPages) {
      prefetch({ search, page: page + 1, limit }, { force: false });
    }
  }, [page, totalPages, search, limit, prefetch]);

  useEffect(() => {
    if (query.error) {
      toast.error(getErrorMessage(query.error));
    }
  }, [query.error]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setParams({ sortDir: sortDir === "asc" ? "desc" : "asc" });
    } else {
      setParams({ sortBy: field, sortDir: "asc" });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setParams({ page: newPage });
  };

  return {
    ...query,
    products: sortedProducts(),
    total,
    totalPages,
    start,
    end,
    params: { page, limit, sortBy, sortDir, search },
    setParams,
    handleSort,
    handlePageChange,
  };
};
