import { Input } from "@/shared/ui/input";
import { useProductParams } from "@/shared/hooks/useProductParams";
import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const ProductSearch = () => {
  const { search, setParams } = useProductParams();
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setParams({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, setParams, search]);

  return (
    <Input
      placeholder="Поиск товаров..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};
