"use client";

import { CloseIcon } from "@/components/home/HomeIcons";
import { SearchIcon } from "./MenuIcons";

export default function MenuSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-btn flex flex-1 items-center gap-2 border border-hairline bg-surface px-3 py-2.5">
      <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search drinks, e.g. matcha"
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 text-muted"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
