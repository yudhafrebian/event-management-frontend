"use client";

import SearchInput from "@/components/filter/SearchInput";
import { useSearchParams, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDebouncedSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/events?${params.toString()}`);
  };

  return (
    <SearchInput
      placeholder="Search Events ..."
      onDebouncedSearch={handleDebouncedSearch}
    />
  );
};

export default SearchBar;
