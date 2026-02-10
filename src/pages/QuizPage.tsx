import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";
import LogoIcon from "@/assets/icons/logo.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import { useModelStore } from "@/store/modelStore";
import type { ModelObject } from "@/types/model";
import QuizModal from "@/components/quiz/QuizModal";
import { getModelObjects } from "@/api/modelApi";

export default function QuizPage() {
  const location = useLocation();
  const { models } = useModelStore();

  // 현재 페이지가 퀴즈인지 확인 (탭 활성화용)
  const isQuiz = location.pathname.startsWith("/quiz");

  const [selectedMachine, setSelectedMachine] = useState<ModelObject | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // 데이터가 이미 있으면 다시 부르지 않음
    if (models.length > 0) return;

    const fetchModelObjects = async () => {
      try {
        const res = await getModelObjects();
        if (res.isSuccess) {
          console.log("✅ 모델 데이터 로드 성공:", res.data);
          setModels(res.data);
        }
      } catch (error) {
        console.error("❌ 모델 로드 실패:", error);
      }
    };
    fetchModelObjects();
  }, [models.length, setModels]);

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
          <LogoIcon className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-12 h-full">
          <Link to="/asset"
                className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${!isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
            학습자료
            {/* 활성화 표시 바 (필요하다면) */}
            {!isQuiz && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full" />
            )}
          </Link>
          <Link to="/quiz"
                className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
            퀴즈
            {isQuiz && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full" />
            )}
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          {/* 검색창 */}
          <div className="flex items-center bg-background-200 border border-white/10 rounded-full px-4 py-1.5 w-64 focus-within:border-primary-100 transition-colors">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <SearchIcon className="w-4 h-4 text-gray-400" />
          </div>

          {/* 유저 메뉴 (로그인 연동) */}
          <UserMenu />
        </div>
      </HeaderFrame>

      {/* 본문 */}
      <main className="flex-1 overflow-y-auto px-10 py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-14 text-left">
            <h1 className="text-white text-[34px] font-bold">Quiz</h1>
            <p className="mt-2 text-gray-200 text-[18px]">
              기계를 선택해서 학습 이해도를 점검해보세요!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMachine(m);
                  setOpen(true);
                }}
                className="group relative flex flex-col rounded-2xl bg-background-300 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/5 hover:border-primary-100/50"
              >
                {/* 이미지 영역 */}
                <div className="flex h-[200px] w-full items-center justify-center rounded-xl bg-background-200 mb-5 group-hover:bg-background-100 transition-colors">
                  <img
                    src={m.thumbnailUrl}
                    alt={m.name}
                    className="
          h-full
          w-full
          object-contain
          scale-150
          "
                  />
                </div>

                {/* 기계명 */}
                <p className="text-center text-white text-[18px] font-semibold group-hover:text-primary-100 transition-colors">
                  {m.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {open && selectedMachine && (
        <QuizModal
          title={selectedMachine.name}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
