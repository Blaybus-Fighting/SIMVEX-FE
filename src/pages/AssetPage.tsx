import Dropdown from "@/components/ui/DropdownBtn";
import Header from "@components/ui/Header";
import ThreeDObjectCard from "@components/ui/3DObjectCard";
import { useEffect, useState } from "react";
import { getModelObjects } from "@/api/modelApi";
import { useModelStore } from "@store/modelStore";

export default function AssetPage() {
  const { models, setModels } = useModelStore();
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
    <div>
      {/* 상단바 */}
      <header className="border-b border-background-100">
        <Header type="asset" title="asset" />
      </header>

      {/* 내용 영역 */}
      <main className="pt-10">
        {/* 페이지 제목과 필터 버튼 */}
        <section className="flex justify-between mb-6">
          <h2 className="text-subtitle font-semibold">전체 3D Object</h2>
          <Dropdown
            buttonLabel="최신 편집 순"
            left={false}
            items={[
              { label: "최신 편집 순", onClick: () => alert("배경색1 선택") },
              { label: "가나다순", onClick: () => alert("배경색2 선택") },
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
