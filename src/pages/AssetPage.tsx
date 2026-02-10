import Dropdown from "@/components/ui/DropdownBtn";
import ThreeDObjectCard from "@components/ui/3DObjectCard";
import { useEffect, useState } from "react";
import { getModelObjects } from "@/api/modelApi";
import { useModelStore } from "@store/modelStore";
import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";
import Logo from "@assets/icons/logo.svg?react";
import { Link } from "react-router-dom";

export default function AssetPage() {
  const {models, setModels} = useModelStore();
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col w-full h-screen">

      {/* 1. 헤더 조립 */}
      <HeaderFrame>
        {/* 왼쪽: 로고 */}
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-30 h-30"/>
          <span className="text-xl font-bold text-gray-800">MY ASSETS</span>
        </Link>

        {/* 가운데: 검색창 (간단 예시) */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <input
            type="text"
            placeholder="모델 검색..."
            className="w-full px-4 py-2 bg-background-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* 오른쪽: 유저 메뉴 */}
        <UserMenu/>
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
