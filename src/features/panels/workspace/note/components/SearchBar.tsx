// src/features/panels/workspace/note/components/SearchBar.tsx
import SearchIcon from "@/assets/icons/search.svg?react";
import {cn} from "@/utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchBar({value, onChange, placeholder = "검색", disabled}: SearchBarProps) {
  return (
      <div
          className={cn(
              "flex items-center bg-background-300 rounded-lg px-3 py-2 w-full transition-colors focus-within:ring-1 focus-within:ring-primary-100",
              disabled && "opacity-50 cursor-not-allowed"
          )}
      >
        <SearchIcon className="w-4 h-4 text-gray-400 mr-2 shrink-0"/>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-500"
        />
      </div>
  );
}