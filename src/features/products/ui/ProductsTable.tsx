import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import type { Product, SortDirection, SortField } from "@/shared/types/product";
import { ProductNameCell } from "./ProductNameCell";
import { Plus, MoreHorizontal } from "lucide-react";
import { formatPriceParts } from "@/shared/lib/formatPriceParts";

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
    if (sortBy !== field) return "";
    return sortDir === "asc" ? "↑" : "↓";
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
    { key: "select", label: "", sortable: false },
    { key: "title", field: "title", label: "Наименование", sortable: true },
    { key: "brand", field: "brand", label: "Вендор", sortable: true },
    { key: "sku", field: "sku", label: "Артикул", sortable: true },
    { key: "rating", field: "rating", label: "Оценка", sortable: true },
    { key: "price", field: "price", label: "Цена", sortable: true },
    { key: "actions", label: "", sortable: false },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={col.sortable ? "cursor-pointer select-none" : ""}
              onClick={col.sortable ? () => onSort(col.field!) : undefined}
            >
              {/* ✅ Checkbox в header */}
              {col.key === "select" ? (
                <Checkbox
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={(checked) => onSelectAll(checked === true)}
                  className="
                   w-5 h-5 rounded border-2 transition-colors shrink-0
                   data-[state=checked]:bg-[#3C538E]
                    data-[state=checked]:border-[#3C538E]
                   data-[state=unchecked]:bg-white
                    data-[state=unchecked]:border-[#D0D0D0]
                   hover:data-[state=unchecked]:border-[#3C538E]
                   [&>span]:hidden
                 "
                  aria-label="Select all"
                />
              ) : col.sortable ? (
                <div className="flex items-center gap-1">
                  {col.label}
                  <span className="text-xs">{getSortIcon(col.field!)}</span>
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
              <TableRow
                key={product.id}
                className={`border-b border-[#F0F0F0] hover:bg-[#FAFAFA]`}
              >
                {/* Checkbox */}
                <TableCell
                  className="py-4 pl-4.5 w-10"
                  style={{
                    boxShadow: isSelected ? "inset 4px 0 0 #3C538E" : "none",
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onSelectRow(product.id, checked === true)
                    }
                    className="
                   w-5 h-5 rounded border-2 transition-colors shrink-0
                   data-[state=checked]:bg-[#3C538E]
                    data-[state=checked]:border-[#3C538E]
                   data-[state=unchecked]:bg-white
                    data-[state=unchecked]:border-[#D0D0D0]
                   hover:data-[state=unchecked]:border-[#3C538E]
                   [&>span]:hidden
                 "
                    aria-label="Select row"
                  />
                </TableCell>

                {/* Name */}
                <TableCell className="py-4 px-4.5">
                  <ProductNameCell product={product} />
                </TableCell>

                {/* Brand */}
                <TableCell className="py-4 pr-6 text-black text-sm font-bold">
                  {product.brand}
                </TableCell>

                {/* SKU */}
                <TableCell className="py-4 pr-6 text-black text-sm">
                  {product.sku}
                </TableCell>

                {/* Rating */}
                <TableCell className={"py-4 pr-6 text-sm font-500"}>
                  <span
                    className={
                      product.rating < 3 ? "text-[#F11010]" : "text-black"
                    }
                  >
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-black">/</span>
                  <span className="text-black">5</span>
                </TableCell>

                {/* Price */}
                <TableCell className="py-4 pr-6">
                  {(() => {
                    const { integer, fraction } = formatPriceParts(
                      product.price,
                    );

                    return (
                      <span className="text-[#202020] text-sm font-medium">
                        {integer}
                        <span className="text-[#999] text-sm">,{fraction}</span>
                      </span>
                    );
                  })()}
                </TableCell>

                {/* Actions */}
                <TableCell className="py-4 pr-6">
                  <div className="flex items-center gap-2 justify-end">
                    <Button  className="w-13 h-6.75 rounded-full bg-[#3B4FF5] hover:bg-[#2D3FE0] transition-colors flex items-center justify-center shrink-0" >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button className="w-9 h-9 rounded-full border border-[#B2B3B9] hover:border-[#BCBCBC] bg-white transition-colors flex items-center justify-center flex-shrink-0">
                      <MoreHorizontal color="#B2B3B9" className="h-4 w-4" />
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
