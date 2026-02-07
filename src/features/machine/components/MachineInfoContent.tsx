// MachineInfoPanel.tsx (content-only 버전)
import "./machine.css";
import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

interface Props {
  activeTab: "machine" | "part";
  selectedPart: string | null;
  onPartSelect: (id: string) => void;
}

export default function MachineInfoPanel({
  activeTab,
  selectedPart,
  onPartSelect,
}: Props) {
  return (
    <>
      {/* AI 요약 카드 (공통 콘텐츠) */}
      <AiSummaryCard selectedPart={selectedPart} />

      {/* 탭에 따른 콘텐츠만 렌더링 */}
      {activeTab === "machine" && <MachineContent />}
      {activeTab === "part" && (
        <PartContent selectedPart={selectedPart} onPartSelect={onPartSelect} />
      )}
    </>
  );
}
