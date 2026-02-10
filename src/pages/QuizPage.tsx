// src/pages/QuizPage.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizModal from "@/components/quiz/QuizModal";

import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";
import LogoIcon from "@/assets/icons/logo.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";

type Machine = {
  id: string;
  name: string;
};

const MACHINES: Machine[] = [
  {id: "machine-vice", name: "공작 기계 바이스"},
  {id: "suspension", name: "서스펜션 시스템"},
  {id: "v4", name: "V4 엔진"},
  {id: "robot", name: "로봇 집게"},
];

export default function QuizPage() {
  const location = useLocation();

  // 현재 페이지가 퀴즈인지 확인 (탭 활성화용)
  const isQuiz = location.pathname.startsWith("/quiz");

  const [open, setOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("검색어:", query);
      // TODO: 검색 로직
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background-400 overflow-hidden">

      {/* 1. 헤더 조립 (HeaderFrame 사용) */}
      <HeaderFrame className="bg-background-300 border-b border-white/10 text-white z-50">

        {/* LEFT: 로고 */}
        <Link to="/" className="flex items-center gap-3 min-w-[200px]">
          <LogoIcon className="h-8 w-auto"/>
        </Link>

        {/* CENTER: 네비게이션 탭 */}
        <div className="flex items-center gap-12 h-full">
          <Link
            to="/asset"
            className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${
              !isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            학습자료
            {/* 활성화 표시 바 (필요하다면) */}
            {!isQuiz && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full"/>}
          </Link>

          <Link
            to="/quiz"
            className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${
              isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            퀴즈
            {isQuiz && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full"/>}
          </Link>
        </div>

        {/* RIGHT: 검색창 + 유저 메뉴 */}
        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          {/* 검색창 */}
          <div
            className="flex items-center bg-background-200 border border-white/10 rounded-full px-4 py-1.5 w-64 focus-within:border-primary-100 transition-colors">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <SearchIcon className="w-4 h-4 text-gray-400"/>
          </div>

          {/* 유저 메뉴 (로그인 연동) */}
          <UserMenu/>
        </div>
      </HeaderFrame>

      {/* 2. 본문 영역 (스크롤 가능하도록 설정) */}
      <main className="flex-1 overflow-y-auto px-10 py-16">
        <div className="mx-auto max-w-[1280px]">
          {/* 상단 문구 */}
          <div className="mb-14 text-left">
            <h1 className="text-white text-[34px] font-bold">Quiz</h1>
            <p className="mt-2 text-gray-200 text-[18px]">
              기계를 선택해서 학습 이해도를 점검해보세요!
            </p>
          </div>

          {/* 기계 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MACHINES.map((machine) => (
              <button
                key={machine.id}
                onClick={() => {
                  setSelectedMachine(machine);
                  setOpen(true);
                }}
                className="
                  group relative flex flex-col
                  rounded-2xl bg-background-300 p-5
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 border border-white/5 hover:border-primary-100/50
                "
              >
                {/* 이미지 영역 */}
                <div
                  className="flex h-[200px] w-full items-center justify-center rounded-xl bg-background-200 mb-5 group-hover:bg-background-100 transition-colors">
                  <span className="text-gray-500 text-sm font-medium">IMAGE</span>
                </div>

                {/* 기계명 */}
                <p
                  className="text-center text-white text-[18px] font-semibold group-hover:text-primary-100 transition-colors">
                  {machine.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* ===== 퀴즈 모달 ===== */}
      {open && selectedMachine && (
        <QuizModal
          title={selectedMachine.name}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}