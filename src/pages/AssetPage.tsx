import Dropdown from "@/components/ui/DropdownBtn";
import ModelThumbnail from "@/features/viewer/components/ModelThumbnail";

export default function AssetPage() {
  // 더미 데이터(API에서 받아올 예정)
  const models = [
    { id: 1, name: "공작 기계 바이스", edit: "방금 전" },
    { id: 2, name: "로봇 집게 조립도", edit: "1일 전" },
    { id: 3, name: "서스펜션 조립도", edit: "1개월 전" },
    { id: 4, name: "V4 엔진 로집도", edit: "방금 전" },
  ];

  return (
    <div>
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
        {models.map((model) => (
          <ModelThumbnail key={model.id} name={model.name} edit={model.edit} />
        ))}
      </section>
    </div>
  );
}
