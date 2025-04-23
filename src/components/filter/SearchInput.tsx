"use client";

import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import debounce from "lodash.debounce";
import { useMemo, useEffect } from "react";

interface ISearchInputProps {
  placeholder?: string;
  onDebouncedSearch: (val: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ placeholder, onDebouncedSearch }) => {
  const debouncedSearch = useMemo(() => debounce(onDebouncedSearch, 500), [onDebouncedSearch]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2" size={16} />
      <Input
        className="pl-8"
        type="search"
        placeholder={placeholder}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
