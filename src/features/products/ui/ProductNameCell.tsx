import type { Product } from '@/shared/types/product';

interface ProductNameCellProps {
  product: Product;
}

export const ProductNameCell = ({ product }: ProductNameCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={product.thumbnail || 'https://via.placeholder.com/40'}
        alt={product.title}
        className="w-10 h-10 object-cover rounded"
      />
      <div>
        <div className="font-medium">{product.title}</div>
        <div className="text-sm text-gray-500">{product.category || 'Без категории'}</div>
      </div>
    </div>
  );
};