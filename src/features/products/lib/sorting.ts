import type { Product, SortDirection, SortField } from "@/shared/types/product";

export const sortProducts = (
  products: Product[],
  field: SortField,
  direction: SortDirection,
): Product[] => {
  return [...products].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });
};
