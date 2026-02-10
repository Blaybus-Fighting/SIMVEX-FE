import { Combobox } from "@headlessui/react";
import Search from "@assets/icons/search.svg?react";

// 헤더에 있는 검색바
export default function SearchBar() {
  const Input = Combobox.Input;

  return (
    <div className="relative w-72">
      <Combobox value={null} onChange={() => {}}>
        <div className="relative">
          {/* 검색 Input */}
          <Input
            className="w-full rounded-lg bg-background-100 py-2 pl-3 pr-4 text-caption font-normal text-gray-200 outline-none focus:ring-2 focus:ring-primary"
            placeholder="검색어를 입력해주세요"
          />
          {/* 돋보기 SVG */}
          <Search className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </Combobox>
    </div>
  );
}
