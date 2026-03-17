import { useState } from 'react';
import { useGetProductsQuery } from '../api/productsApi';
import { useProductParams } from '@/shared/hooks/useProductParams';
import { useAppSelector } from '@/entities/store/hooks';
import type { RootState } from '@/entities/store';
import { sortProducts } from '../lib/sorting';
import { ProductsTable } from './ProductsTable';
import { ProductSearch } from './ProductSearch';
import { Pagination } from './Pagination';
import { AddProductForm } from './AddProductForm';
import { Button } from '@/shared/ui/button';
import { RefreshCw, Plus } from 'lucide-react';
import type { SortField } from '@/shared/types/product';

export const ProductsPageContent = () => {
  const { search, page, limit, sortBy, sortDir, setParams } = useProductParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ search, page, limit });
  const localProducts = useAppSelector((state: RootState) => state.localProducts.items);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const serverProducts = data?.products ?? [];
  const combinedProducts = [...localProducts, ...serverProducts];
  const sortedProducts = sortProducts(combinedProducts, sortBy, sortDir);

  const total = (data?.total ?? 0) + localProducts.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setParams({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setParams({ sortBy: field, sortDir: 'asc' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage });
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds(prev =>
      checked ? [...prev, id] : prev.filter(selectedId => selectedId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(sortedProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка загрузки</div>;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <ProductSearch />
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Добавить
          </Button>
        </div>
      </div>

      <ProductsTable
        products={sortedProducts}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
        selectedIds={selectedIds}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
      />

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Показано {start}–{end} из {total}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <AddProductForm open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};