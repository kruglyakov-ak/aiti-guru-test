interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
}

export const usePagination = ({
  currentPage,
  totalPages,
}: UsePaginationProps) => {
  const pages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (currentPage <= 3) {
      start = 1;
      end = 5;
    }

    if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    pages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
};
