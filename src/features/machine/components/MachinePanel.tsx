import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

import AiSummaryCard from "./AiSummaryCard";
import MachineContent from "./MachineContent";
import PartContent from "./PartContent";

export default function MachinePanel() {
  const [activeTab, setActiveTab] = useState<"LEFT" | "RIGHT">("LEFT");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

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
        {/* AI 요약 (항상 표시) */}
        <AiSummaryCard selectedPart={selectedPart} />

        {/* 탭에 따른 콘텐츠 */}
        {activeTab === "LEFT" ? (
          <MachineContent />
        ) : (
          <PartContent
            selectedPart={selectedPart}
            onPartSelect={setSelectedPart}
          />
        )}
      </div>
    </PanelLayout>
  );
}
