import { useEffect, useRef, useState } from "react";
import SearchIcon from "@/assets/icons/search.svg?react";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchBar({value, onChange, placeholder = "노트 이름, 내용 검색", disabled}: SearchBarProps) {
  // 닫힘/열림 상태 관리 (처음엔 닫혀있음)
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. 열리면 자동으로 입력창에 포커스!
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // 2. 바깥을 클릭하면 닫기 (단, 내용이 비어있을 때만)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // 내용이 없으면 다시 아이콘으로 돌아가기
        if (value === "") {
          setIsExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // X 버튼 클릭 핸들러
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onClick(열림) 이벤트 전파 방지
    onChange(""); // 검색어 초기화
    inputRef.current?.focus(); // 지우고 나서도 포커스 유지
  };

  return (
    <div
      ref={containerRef}
      // 아이콘을 클릭하거나 바를 클릭하면 열림
      onClick={() => {
        if (!disabled) setIsExpanded(true);
      }}
      className={cn(
        "flex items-center h-12 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden",        // 열렸을 때: 꽉 찬 너비 + 파란 밑줄
        // 닫혔을 때
        isExpanded
          ? "w-full border-b-2 border-primary-200"
          : "w-8 border-b-2 border-transparent"
      )}
    >
      <SearchIcon
        className={cn(
          "w-5 h-5 shrink-0 transition-colors duration-300",
          // 열리면 파란색, 닫히면 회색
          isExpanded ? "text-primary-100" : "text-gray-400 hover:text-gray-200"
        )}
      />

      {/* 입력창 */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        // 열리면 보이고(w-full), 닫히면 숨김(w-0)
        className={cn(
          "bg-transparent outline-none text-text-1 placeholder:text-gray-500 text-lg transition-all duration-300 ease-in-out",
          "flex-1 ml-3",
          isExpanded ? "opacity-100" : "opacity-0 w-0 pointer-events-none"
        )}
      />
      {/* X 버튼 (검색어가 있고, 확장된 상태일 때만 보임) */}
      {isExpanded && value.length > 0 && (
        <button
          onClick={handleClear}
          className="p-1 text-gray-400 hover:text-white transition-colors shrink-0 animate-in fade-in zoom-in duration-200"
          type="button"
        >
          <div className="bg-gray-400/20 rounded-full p-0.5">
            <CancelIcon className="w-5 h-5"/>
          </div>
        </button>
      )}
    </div>
  );
}