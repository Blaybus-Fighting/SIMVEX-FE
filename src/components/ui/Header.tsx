import Logo from "@assets/icons/logo.svg?react";
import ArrowBack from "@assets/icons/arrow_back.svg?react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  type: "asset" | "study";
  title: string; // ✅ title 대신 학습자료 / 퀴즈 버튼(?) 넣으시면 됩니다.
}

export default function Header({ type, title }: HeaderProps) {
  return (
    <header className="relative w-full">
      <div className="flex h-[3.75rem] items-center justify-between">
        {/* LEFT */}
        <div className="z-10">
          {type === "asset" && <Logo />}
          {type === "study" && (
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-200">
              <ArrowBack className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="z-10 flex items-center gap-4">
          {type === "asset" && <SearchBar />}
          <div className="h-9 w-9 rounded-full bg-background-100" />
        </div>
      </div>

      {/* 화면 기준 중앙 */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="font-pretendard text-[24px] font-semibold text-white">
          {title}
        </span>
      </div>
    </header>
  );
}
