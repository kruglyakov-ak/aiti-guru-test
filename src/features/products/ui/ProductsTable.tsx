import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui/table";
import type { Product, SortDirection, SortField } from "@/shared/types/product";

interface ProductsTableProps {
  products: Product[];
  sortBy: SortField;
  sortDir: SortDirection;
  onSort: (field: SortField) => void;
}

export const ProductsTable = ({
  products,
  sortBy,
  sortDir,
  onSort,
}: ProductsTableProps) => {
  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) return "↕️";
    return sortDir === "asc" ? "↑" : "↓";
  };

  const columns: { field: SortField; label: string }[] = [
    { field: "title", label: "Наименование" },
    { field: "brand", label: "Вендор" },
    { field: "sku", label: "Артикул" },
    { field: "rating", label: "Оценка" },
    { field: "price", label: "Цена" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.field}
              className="cursor-pointer select-none"
              onClick={() => onSort(col.field)}
            >
              <div className="flex items-center gap-1">
                {col.label}
                <span className="text-xs">{getSortIcon(col.field)}</span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell className={product.rating < 3 ? "text-red-500" : ""}>
              {product.rating}
            </TableCell>
            <TableCell>{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
