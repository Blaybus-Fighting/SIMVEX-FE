import Dropdown from "@/components/ui/DropdownBtn";
import Header from "@components/ui/Header";
import ThreeDObjectCard from "@components/ui/3DObjectCard";

export default function AssetPage() {
  // 더미 데이터(API에서 받아올 예정)
  const objects = [
    {
      id: 1,
      imageSrc: "/models/machine-vice.png",
      modelName: "공작 기계 바이스",
      updateTime: "방금 전",
    },
    {
      id: 2,
      imageSrc: "/models/robot-gripper.png",
      modelName: "로봇 집게 조립도",
      updateTime: "1일 전",
    },
    {
      id: 3,
      imageSrc: "/models/suspension.png",
      modelName: "서스펜션 조립도",
      updateTime: "1개월 전",
    },
    {
      id: 4,
      imageSrc: "/models/v4-engine.png",
      modelName: "V4 실린더 엔진 조립도",
      updateTime: "방금 전",
    },
  ];

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
        {/* grid: 카드 개수 바뀌면 grid-cols-3, 5로 바로 대응 가능 */}
        {/* 부모 너비가 커지든 줄어들든 자동 분배 */}
        <section className="grid grid-cols-4 gap-5 w-full">
          {objects.map((obj) => (
            <ThreeDObjectCard
              key={obj.id}
              modelName={obj.modelName}
              updateTime={obj.updateTime}
              onSelectPart={() => {
                console.log("선택한 3D 오브젝트:", obj.modelName);
                // TODO: navigate(`/study/${id}`)
              }}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
