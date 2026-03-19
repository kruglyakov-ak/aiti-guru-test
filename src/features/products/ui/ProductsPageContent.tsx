import { useState } from "react";
import { ProductsTable } from "./ProductsTable";
import { ProductSearch } from "./ProductSearch";
import { Pagination } from "./Pagination";
import { AddProductForm } from "./AddProductForm";
import { Button } from "@/shared/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { useProductSelection } from "@/shared/hooks/useProductSelection";
import { useProducts } from "@/shared/hooks/useProducts";
import { Spinner } from "@/shared/ui/spinner";

export const ProductsPageContent = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const {
    products,
    handlePageChange,
    handleSort,
    isLoading,
    refetch,
    params,
    totalPages,
    end,
    start,
    total,
  } = useProducts();

  const { selectedIds, toggle, toggleAll } = useProductSelection(products);

  return (
    <div className="min-h-screen pt-5 bg-[#F6F6F6]">
      <div className="bg-white  px-8 flex items-center justify-center h-26.25 relative">
        <h1 className="text-[24px] font-bold text-[#202020] leading-none justify-self-start absolute left-7.5">
          Товары
        </h1>
        <ProductSearch isLoading={isLoading} />
      </div>

      <div className="bg-white px-7.5 mt-7.5 mb-5">
        <div
          className="overflow-hidden  flex flex-col"
          style={{ height: "calc(100vh - 230px)" }}
        >
          <div className="flex items-center justify-between px-6 py-5 shrink-0">
            <h2 className="text-[18px] font-bold text-[#202020]">
              {isLoading ? (
                <span className="flex gap-1 items-center">
                  {" "}
                  <span>Загрузка данных ... </span> <Spinner />
                </span>
              ) : (
                "Все позиции"
              )}
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="w-9 rounded-sm border border-[#B2B3B9] hover:border-[#BCBCBC] bg-white flex items-center justify-center transition-colors h-10.5"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="flex items-center gap-2 bg-[#3B4FF5] hover:bg-[#2D3FE0] text-white text-sm font-semibold rounded-sm px-5 py-2.5 transition-colors h-10.5"
                >
                  <Plus className="h-4 w-4 mr-2" /> Добавить
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <ProductsTable
              products={products}
              isLoading={isLoading}
              sortBy={params.sortBy}
              sortDir={params.sortDir}
              onSort={handleSort}
              selectedIds={selectedIds}
              onSelectRow={toggle}
              onSelectAll={toggleAll}
            />
          </div>
        </div>

        {!isLoading && total > 20 && (
          <div className="flex items-center justify-between px-6 py-5 border-t border-[#F0F0F0]">
            <div className="text-sm text-[#999]">
              Показано {start}–{end} из {total}
            </div>
            <Pagination
              currentPage={params.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <AddProductForm
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};
