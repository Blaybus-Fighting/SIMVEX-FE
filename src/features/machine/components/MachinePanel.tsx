import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

interface Props {
  selectedPart: string | null;
}

export default function MachinePanel({ selectedPart }: Props) {
  const [activeTab, setActiveTab] = useState<"LEFT" | "RIGHT">("LEFT");

  return (
    <PanelLayout
      header={
        <TabSwitcher
          leftLabel="기계"
          rightLabel="부품"
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      }
    >
      <div className="machine-panel">
        {/* 🔥 AI 요약 항상 상단 */}
        <AiSummaryCard selectedPart={selectedPart} />

        {activeTab === "LEFT" ? (
          <MachineContent />
        ) : (
          <PartContent
            selectedPart={selectedPart}
            onPartSelect={() => {}}
          />
        )}
      </div>
    </PanelLayout>
  );
}
