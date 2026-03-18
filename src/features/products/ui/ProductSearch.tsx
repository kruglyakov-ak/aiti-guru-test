import { useProductParams } from "@/shared/hooks/useProductParams";
import { useState, useEffect } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import SearchIcon from "@/shared/assets/images/search.svg?react";
import { InputField } from "@/shared/ui/inputField";

export const ProductSearch = () => {
  const { search, setParams } = useProductParams();
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setParams({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, setParams, search]);

  return (
    <InputField
      placeholder="Найти"
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="bg-[#F3F3F3] flex-1 text-sm text-[#202020] placeholder-[#999] outline-none  max-w-255.75 h-12"
      leftIcon={<SearchIcon color={"#999999"} />}
      clearable
    />
  );
};
