export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  sku: string;
  rating: number;
  thumbnail?: string;
  category?: string;
}

export type SortField = keyof Product;
export type SortDirection = "asc" | "desc";
