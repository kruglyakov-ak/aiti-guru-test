import { useSearchParams } from "react-router";
import type { SortField, SortDirection } from "../types/product";

export const useProductParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const sortBy = (searchParams.get("sortBy") ?? "title") as SortField;
  const sortDir = (searchParams.get("sortDir") ?? "asc") as SortDirection;

  const setParams = (updates: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    setSearchParams(newParams);
  };

  return { search, page, limit, sortBy, sortDir, setParams };
};
