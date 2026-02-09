import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

export default function QuizHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isQuiz = location.pathname.startsWith("/quiz");

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background-300">
      <div className="mx-auto flex h-28 max-w-[1440px] items-center px-12">
        {/* ================= LEFT ================= */}
        <div className="flex w-[320px] items-center gap-4">
          {/* 로고: 파란 원 + 톱니 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-200">
            <FaCog className="text-white text-[22px]" />
          </div>

          <span className="text-white text-[22px] font-semibold tracking-wide">
            SIMVEX
          </span>
        </div>

        {/* ================= CENTER ================= */}
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
            {isQuiz && (
              <span className="absolute -bottom-2 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-primary-200" />
            )}
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex w-[320px] items-center justify-end gap-4">
          {/* 검색창 */}
          <div className="flex items-center rounded-md bg-background-200 px-5 py-3">
            <input
              placeholder="Search"
              className="w-44 bg-transparent text-[16px] text-white placeholder-gray-300 outline-none"
            />
            <FiSearch className="ml-2 text-gray-300" />
          </div>

          {/* 프로필 */}
          <div className="h-11 w-11 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}