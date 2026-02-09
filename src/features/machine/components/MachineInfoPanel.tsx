// src/features/machine/components/MachineInfoPanel.tsx

import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

interface Props {
  activeTab: "machine" | "part";
  selectedPart: string | null;
  onPartSelect: (id: string | null) => void;  // onPartSelect로 수정
}

export default function MachineInfoPanel({
  activeTab,
  selectedPart,
  onPartSelect, // 수정된 부분
}: Props) {
  return (
    <>
      <AiSummaryCard selectedPart={selectedPart} />

      {activeTab === "machine" && <MachineContent />}

      {activeTab === "part" && (
        <PartContent
          selectedPart={selectedPart}
          onSelectPart={onPartSelect} // onSelectPart는 onPartSelect로 전달됨
        />
      )}
    </>
  );
}
