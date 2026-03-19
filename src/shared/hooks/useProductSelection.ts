import { useState } from "react";
import type { Product } from "../types/product";

export const useProductSelection = (products: Product[]) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (id: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(products.map((p) => p.id)) : new Set());
  };

  return {
    selectedIds: Array.from(selected),
    selectedSet: selected,
    toggle,
    toggleAll,
  };
};
