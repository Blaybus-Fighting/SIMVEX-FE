import "./machine.css";
import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

interface Props {
  activeTab: "machine" | "part";
  selectedPart: string | null;
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
        <PartContent selectedPart={selectedPart} />
      )}
    </>
  );
}
