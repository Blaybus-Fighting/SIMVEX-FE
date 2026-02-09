import Header from "@/components/ui/Header";
import ThreeDObjectCard from "@/components/ui/3DObjectCard";

export default function StudyPage() {
  const objects = [
    {
      imageSrc: "/models/machine-vice.png",
      modelName: "공작 기계 바이스",
      updateTime: "방금 전",
    },
    {
      imageSrc: "/models/robot-gripper.png",
      modelName: "로봇 집게 조립도",
      updateTime: "1일 전",
    },
    {
      imageSrc: "/models/suspension.png",
      modelName: "서스펜션 조립도",
      updateTime: "1개월 전",
    },
    {
      imageSrc: "/models/v4-engine.png",
      modelName: "V4 실린더 엔진 조립도",
      updateTime: "방금 전",
    },
    {
      imageSrc: "/models/machine-vice.png",
      modelName: "바이스",
      updateTime: "방금 전",
    },
  ];

  return (
    <>
      {/* ================= 헤더 (Study 타입) ================= */}
      <Header type="study" title="Study" />

      {/* ================= 메인 영역 ================= */}
      <main className="min-h-screen bg-background-400 pt-24">
        <section className="mx-auto max-w-[1440px] px-6 py-12">
          
          {/* ===== 섹션 상단 ===== */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-text-2 font-semibold text-white">
              전체 3D Object
            </h2>

            <button className="rounded-lg bg-background-200 px-4 py-2 text-caption text-gray-200">
              최신 편집순
            </button>
          </div>

          {/* ===== 카드 영역 ===== */}
          <div className="rounded-2xl bg-background-300 p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {objects.map((obj) => (
                <ThreeDObjectCard
                  key={obj.modelName}
                  imageSrc={obj.imageSrc}
                  modelName={obj.modelName}
                  updateTime={obj.updateTime}
                  onSelectPart={() => {
                    console.log("선택한 3D 오브젝트:", obj.modelName);
                    // TODO: navigate(`/study/${id}`)
                  }}
                />
              ))}
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
