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
    <div className="workspace-layout">
      <div className="viewer-area" />
      <div className="machine-area">
        <MachineInfoPanel
          activeTab={activeTab}
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
        />
      </div>
      <div className="ai-area">
        <WorkspacePanel />
      </div>
    </div>
  );
}
