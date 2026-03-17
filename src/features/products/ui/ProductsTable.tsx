import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import type { Product, SortDirection, SortField } from '@/shared/types/product';
import { ProductNameCell } from './ProductNameCell';
import { Plus, MoreHorizontal } from 'lucide-react';

interface ProductsTableProps {
  products: Product[];
  sortBy: SortField;
  sortDir: SortDirection;
  onSort: (field: SortField) => void;
  selectedIds: number[];
  onSelectRow: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const ProductsTable = ({
  products,
  sortBy,
  sortDir,
  onSort,
  selectedIds,
  onSelectRow,
  onSelectAll,
}: ProductsTableProps) => {
  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) return '';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  const allSelected =
    products.length > 0 && selectedIds.length === products.length;

  const someSelected =
    selectedIds.length > 0 && selectedIds.length < products.length;

  const columns: {
    key: string;
    field?: SortField;
    label: string;
    sortable?: boolean;
  }[] = [
    { key: 'select', label: '', sortable: false },
    { key: 'title', field: 'title', label: 'Наименование', sortable: true },
    { key: 'brand', field: 'brand', label: 'Вендор', sortable: true },
    { key: 'sku', field: 'sku', label: 'Артикул', sortable: true },
    { key: 'rating', field: 'rating', label: 'Оценка', sortable: true },
    { key: 'price', field: 'price', label: 'Цена', sortable: true },
    { key: 'actions', label: '', sortable: false },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={col.sortable ? 'cursor-pointer select-none' : ''}
              onClick={col.sortable ? () => onSort(col.field!) : undefined}
            >
              {/* ✅ Checkbox в header */}
              {col.key === 'select' ? (
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? 'indeterminate' : false
                  }
                  onCheckedChange={(checked) =>
                    onSelectAll(checked === true)
                  }
                />
              ) : col.sortable ? (
                <div className="flex items-center gap-1">
                  {col.label}
                  <span className="text-xs">
                    {getSortIcon(col.field!)}
                  </span>
                </div>
              ) : (
                col.label
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center py-8 text-gray-500"
            >
              Товары не найдены
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => {
            const isSelected = selectedIds.includes(product.id);

            return (
              <TableRow key={product.id}>
                {/* Checkbox */}
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onSelectRow(product.id, checked === true)
                    }
                  />
                </TableCell>

                {/* Name */}
                <TableCell>
                  <ProductNameCell product={product} />
                </TableCell>

                {/* Brand */}
                <TableCell>{product.brand}</TableCell>

                {/* SKU */}
                <TableCell>{product.sku}</TableCell>

                {/* Rating */}
                <TableCell
                  className={
                    product.rating < 3 ? 'text-red-500' : ''
                  }
                >
                  {product.rating}
                </TableCell>

                {/* Price */}
                <TableCell>{product.price}</TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};