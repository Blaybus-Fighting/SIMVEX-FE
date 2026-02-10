import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizModal from "@/components/quiz/QuizModal";
import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";
import LogoIcon from "@/assets/icons/logo.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";

// 스토어 및 API
import { useModelStore } from "@/store/modelStore";
import { getModelObjects } from "@/api/modelApi";

import type { ModelObject } from "@/types/model";

export default function QuizPage() {
  const location = useLocation();
  const isQuiz = location.pathname.startsWith("/quiz");

  const {models, setModels} = useModelStore();

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

  return (
    <div className="flex flex-col w-full h-screen bg-background-400 overflow-hidden">

      {/* 헤더 */}
      <HeaderFrame className="bg-background-300 border-b border-white/10 text-white z-50">
        <Link to="/" className="flex items-center gap-3 min-w-[200px]">
          <LogoIcon className="h-8 w-auto"/>
        </Link>

        <div className="flex items-center gap-12 h-full">
          <Link to="/asset"
                className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${!isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
            학습자료
            {!isQuiz && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full"/>}
          </Link>
          <Link to="/quiz"
                className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
            퀴즈
            {isQuiz && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full"/>}
          </Link>
        </div>

        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          <div
            className="flex items-center bg-background-200 border border-white/10 rounded-full px-4 py-1.5 w-64 focus-within:border-primary-100 transition-colors">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"
                   className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"/>
            <SearchIcon className="w-4 h-4 text-gray-400"/>
          </div>
          <UserMenu/>
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
            {models.map((machine) => (
              <button
                key={machine.id}
                onClick={() => {
                  setSelectedMachine(machine);
                  setOpen(true);
                }}
                className="group relative flex flex-col rounded-2xl bg-background-300 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/5 hover:border-primary-100/50"
              >
                <div
                  className="flex h-[200px] w-full items-center justify-center rounded-xl bg-background-200 mb-5 overflow-hidden relative">
                  {/* ★ [해결 2] referrerPolicy 추가: 외부 이미지가 차단되는 것을 막아줍니다! */}
                  {machine.thumbnailUrl ? (
                    <img
                      src={machine.thumbnailUrl}
                      alt={machine.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // 이미지 로드 실패시 박스로 대체
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                      }}
                    />
                  ) : null}

                  {/* 이미지가 없을 때 보여줄 대체 박스 */}
                  <div
                    className={`fallback ${machine.thumbnailUrl ? 'hidden' : 'flex'} absolute inset-0 w-full h-full flex items-center justify-center bg-gray-700 text-gray-400`}>
                    <span className="text-sm">No Image</span>
                  </div>
                </div>

                <p
                  className="text-center text-white text-[18px] font-semibold group-hover:text-primary-100 transition-colors">
                  {machine.name}
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