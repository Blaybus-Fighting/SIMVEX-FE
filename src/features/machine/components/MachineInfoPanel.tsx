// src/features/machine/components/MachineInfoPanel.tsx
import "./machine.css";
import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

export interface Props {
  activeTab: "machine" | "part";
  selectedPart: string | null;
  onPartSelect: (id: string | null) => void;
}

export default function MachineInfoPanel({
  activeTab,
  selectedPart,
}: Props) {
  return (
    <>
      <AiSummaryCard selectedPart={selectedPart} />

      {activeTab === "machine" && <MachineContent />}

      {activeTab === "part" && (
        <PartContent
          selectedPart={selectedPart}

        />
      )}
    </>
  );
}


