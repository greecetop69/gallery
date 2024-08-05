"use client";

import { Input } from "~/components/ui/input";
import { SearchIcon } from "../../icons/SearchIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ClearIcon } from "~/app/icons/ClearIcon";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("MainPage");
  const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");

  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("page", '1');
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearch = (term: string) => {
    setQuery(term);
    debouncedSearch(term);
  };

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex w-full max-w-md items-center">
        <Input
          placeholder={t("search")}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pr-16"
        />
        {query && (
          <button
            type="button"
            className="absolute right-11 top-1/2 -translate-y-1/2 transform"
            onClick={clearSearch}
          >
            <ClearIcon className="h-[12px] w-[12px] text-gray-500 hover:text-gray-700" />
          </button>
        )}
        <SearchIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-700" />
      </div>
    </div>
  );
}
