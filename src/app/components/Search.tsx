"use client";

import { Input } from "~/components/ui/input";
import { SearchIcon } from "../icons/SearchIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("HomePage");
  const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center">
        <Input
          placeholder={t("search")}
          defaultValue={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="!w-[300px] pr-10"
        />
        <SearchIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    </div>
  );
}
