import { Input } from '@/shared/ui/input';
import { useProductParams } from '@/shared/hooks/useProductParams';
import { useState, useEffect } from 'react';

export const ProductSearch = () => {
  const { search, setParams } = useProductParams();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setParams({ search: localSearch, page: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setParams, search]);

  return (
    <Input
      placeholder="Поиск товаров..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};