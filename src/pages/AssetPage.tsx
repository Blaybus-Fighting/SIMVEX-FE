import Dropdown from "@/components/ui/DropdownBtn";
import ThreeDObjectCard from "@components/ui/3DObjectCard";
import { useEffect, useState } from "react";
import { getModelObjects } from "@/api/modelApi";
import { useModelStore } from "@store/modelStore";
import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";
import LogoIcon from "@/assets/icons/logo.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import { Link, useLocation } from "react-router-dom";


export default function AssetPage() {
  const {models, setModels} = useModelStore();
  const [loading, setLoading] = useState(false);

  // 헤더용 상태 (퀴즈 페이지와 통일)
  const location = useLocation();
  const isQuiz = location.pathname.startsWith("/quiz");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchModelObjects = async () => {
      try {
        setLoading(true); // 로딩 중
        const res = await getModelObjects();

        if (res.isSuccess) {
          console.log("응답 데이터: ", res.data);
          setModels(res.data);
        } else {
          console.log("에러 데이터: ", res.error);
        }
      } catch (error) {
        console.error("모델 객체 API 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelObjects();
  }, [setModels]);

  return (
    // 전체 레이아웃을 flex-col로 잡아서 헤더는 고정, 메인은 스크롤되게 설정
    <div className="flex flex-col w-full h-screen overflow-hidden">

      {/* 1. 헤더 조립 (퀴즈 페이지와 동일한 디자인으로 변경) */}
      <HeaderFrame className="bg-background-300 border-b border-white/10 text-white z-50">

        {/* LEFT: 로고 */}
        <Link to="/" className="flex items-center gap-3 min-w-[200px]">
          <LogoIcon className="h-8 w-auto"/>
        </Link>

        {/* CENTER: 네비게이션 탭 */}
        <div className="flex items-center gap-12 h-full">
          {/* 학습자료 탭 (현재 활성화됨) */}
          <Link
            to="/asset"
            className={`relative h-full flex items-center px-2 text-[18px] font-semibold transition-colors ${
              !isQuiz ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            학습자료
            {/* 활성화 표시 바 */}
            {!isQuiz && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-200 rounded-t-full"/>}
          </Link>

          {/* 퀴즈 탭 */}
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
              placeholder="모델 검색..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <SearchIcon className="w-4 h-4 text-gray-400"/>
          </div>

          {/* 유저 메뉴 */}
          <UserMenu/>
        </div>
      </HeaderFrame>

      {/* 내용 영역 */}
      <main className="pt-10">
        {/* 페이지 제목과 필터 버튼 */}
        <section className="flex justify-between mb-6">
          <h2 className="text-subtitle font-semibold">전체 3D Object</h2>
          <Dropdown
            buttonLabel="최신 편집 순"
            left={false}
            items={[
              {label: "최신 편집 순", onClick: () => alert("배경색1 선택")},
              {label: "가나다순", onClick: () => alert("배경색2 선택")},
            ]}
          />
        </section>

        {/* 로딩 */}
        {loading && <p className="text-center">로딩 중...</p>}

        {/* grid: 카드 개수 바뀌면 grid-cols-3, 5로 바로 대응 가능 */}
        {/* 부모 너비가 커지든 줄어들든 자동 분배 */}
        <section className="grid grid-cols-4 gap-5 w-full">
          {models.map((m) => (
            <ThreeDObjectCard
              key={m.id}
              id={m.id}
              name={m.name}
              thumbnailUrl={m.thumbnailUrl}
              // updateTime={obj.updateTime}
              // onSelectPart={() => {
              //   console.log("선택한 3D 오브젝트:", obj.modelName);
              //   // TODO: navigate(`/study/${id}`)
              // }}
            />
          ))}
        </section>
      </main>
    </div>
  );
}