import { FiChevronLeft, FiSettings } from "react-icons/fi";

interface HeaderProps {
  type: "study" | "machine";
  title: string; // Study 또는 기계명
}

export default function Header({ type, title }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background-300">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center px-6">
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-4">
          {type === "study" && (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-200">
                <FiSettings className="h-6 w-6 text-white" />
              </div>
              <span className="font-pretendard text-[20px] font-semibold text-white">
                SIMVEX
              </span>
            </>
          )}

          {type === "machine" && (
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-200">
              <FiChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}
        </div>

        {/* ================= CENTER ================= */}
        <div className="flex flex-1 justify-center">
          <span className="font-pretendard text-[24px] font-semibold text-white">
            {title}
          </span>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-4">
          {type === "study" && (
            <div className="flex items-center rounded-full bg-background-200 px-5 py-2.5">
              <input
                type="text"
                placeholder="Search"
                className="w-40 bg-transparent text-[15px] text-white placeholder-gray-300 outline-none"
              />
            </div>
          )}

          <div className="h-9 w-9 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
