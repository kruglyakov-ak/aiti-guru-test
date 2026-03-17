import { usePagination } from "@/shared/hooks/usePagination";
import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const { pages, hasPrev, hasNext } = usePagination({
    currentPage,
    totalPages,
  });

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={!hasPrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages().map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        size="icon"
        variant="outline"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};