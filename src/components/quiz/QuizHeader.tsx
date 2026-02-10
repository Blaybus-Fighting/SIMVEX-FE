import { useNavigate, useLocation } from "react-router-dom";

// SVG 아이콘 (피그마 export)
import LogoIcon from "@/assets/icons/logo.svg?react";
import FileListSearchBar from "@/assets/icons/FileListSearchBar.svg?react";

export default function QuizHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isQuiz = location.pathname.startsWith("/quiz");

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background-300">
      <div className="mx-auto flex h-28 max-w-[1440px] items-center px-12">
        {/* ================= LEFT : LOGO ================= */}
        <div className="flex w-[320px] items-center gap-4">
          {/* 로고 아이콘 */}
          <div className="h-12 w-12">
            <LogoIcon className="h-full w-full" />
          </div>

          {/* 로고 텍스트 */}
          <span className="text-white text-[22px] font-semibold tracking-wide">
            SIMVEX
          </span>
        </div>

        {/* ================= CENTER : MENU ================= */}
        <div className="flex flex-1 justify-center gap-20">
          <button
            onClick={() => navigate("/study")}
            className={`text-[22px] font-semibold transition ${
              !isQuiz
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            학습자료
          </button>

          <button
            onClick={() => navigate("/quiz")}
            className={`relative text-[22px] font-semibold transition ${
              isQuiz
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            퀴즈

            {/* 활성 표시 바 */}
            {isQuiz && (
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-primary-200" />
            )}
          </button>
        </div>

        {/* ================= RIGHT : SEARCH + PROFILE ================= */}
        <div className="flex w-[320px] items-center justify-end gap-4">
          {/* 검색바 (피그마 SVG 그대로 사용) */}
          <div className="cursor-pointer">
            <FileListSearchBar className="h-10 w-[288px]" />
          </div>

          {/* 프로필 */}
          <div className="h-11 w-11 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
