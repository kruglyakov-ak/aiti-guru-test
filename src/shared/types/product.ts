export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  sku: string;
  rating: number;
}

export type SortField = keyof Product;
export type SortDirection = "asc" | "desc";
