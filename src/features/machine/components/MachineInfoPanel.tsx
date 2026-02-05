import "./machine.css";
import MachineHeader from "./MachineHeader";
import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

interface Props {
  activeTab: "machine" | "part";
  onTabChange: (tab: "machine" | "part") => void;
  selectedPart: string | null;
}

export default function MachineInfoPanel({
  activeTab,
  onTabChange,
  selectedPart,
}: Props) {
  return (
    <div className="machine-panel">
      <MachineHeader activeTab={activeTab} onChange={onTabChange} />
      <AiSummaryCard selectedPart={selectedPart} />

      {activeTab === "machine" && <MachineContent />}
      {activeTab === "part" && (
        <PartContent selectedPart={selectedPart} />
      )}
    </div>
  );
}
