import type { Product } from "@/shared/types/product";

interface ProductNameCellProps {
  product: Product;
}

export const ProductNameCell = ({ product }: ProductNameCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-10 h-10 object-cover text-[10px] rounded-[8px] bg-[#C4C4C4] border border-[#ECECEB]"
        loading="lazy"
        decoding="async"
      />
      <div className="min-w-0">
        <div className="text-[#202020] text-sm font-medium truncate max-w-55">{product.title}</div>
        <div className="text-[#999] text-xs mt-0.5">
          {product.category || "Без категории"}
        </div>
      </div>
    </div>
  );
};
