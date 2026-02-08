import Dropdown from "@/components/ui/DropdownBtn";
import ModelThumbnail from "@/features/viewer/components/ModelThumbnail";

export default function AssetPage() {
  // 더미 데이터(API에서 받아올 예정)
  const models = [
    { name: "공작 기계 바이스", edit: "방금 전" },
    { name: "로봇 집게 조립도", edit: "1일 전" },
    { name: "서스펜션 조립도", edit: "1개월 전" },
    { name: "V4 엔진 로집도", edit: "방금 전" },
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
      <section className="flex gap-5 border border-white">
        {models.map((model) => (
          <ModelThumbnail name={model.name} edit={model.edit} />
        ))}
      </section>
    </div>
  );
}
