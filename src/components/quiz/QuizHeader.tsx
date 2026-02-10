import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "@/assets/icons/search.svg?react";
import LogoIcon from "@/assets/icons/logo.svg?react";

export default function QuizHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isQuiz = location.pathname.startsWith("/quiz");

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("검색어:", query);
      // TODO: 실제 검색 로직 연결
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background-300">
      <div className="mx-auto flex h-28 max-w-[1440px] items-center px-12">
        {/* ================= LEFT ================= */}
        <div className="flex w-[320px] items-center gap-4">
          <LogoIcon className="h-10 w-auto" />
          <span className="text-white text-[22px] font-semibold tracking-wide">
            SIMVEX
          </span>
        </div>

        {/* ================= CENTER ================= */}
        <div className="flex flex-1 justify-center gap-20">
          <button
            onClick={() => navigate("/study")}
            className={`text-[22px] font-semibold transition ${
              !isQuiz ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            학습자료
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className={`relative text-[22px] font-semibold transition ${
              isQuiz ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            퀴즈
            {isQuiz && (
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-primary-200" />
            )}
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex w-[320px] items-center justify-end gap-4">
          {/* 검색창 (기능 O) */}
          <div className="flex h-10 w-[288px] items-center rounded-lg border border-primary-100 bg-background-200 px-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search"
              className="flex-1 bg-transparent text-[16px] text-white placeholder-gray-300 outline-none"
            />
            <SearchIcon className="h-5 w-5 text-primary-100" />
          </div>

          {/* 프로필 */}
          <div className="h-11 w-11 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
