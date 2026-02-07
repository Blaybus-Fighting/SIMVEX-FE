import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

import AiSummaryCard from "@/features/machine/components/AiSummaryCard";
import MachineContent from "@/features/machine/components/MachineContent";
import PartContent from "@/features/machine/components/PartContent";

export default function MachinePanel() {
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
        {/* 🔥 AI 요약은 항상 맨 위 */}
        <AiSummaryCard selectedPart={null} />

        {/* 🔥 탭에 따라 내용만 변경 */}
        {activeTab === "LEFT" ? (
          <MachineContent />
        ) : (
          <PartContent selectedPart={null} />
        )}
      </div>
    </PanelLayout>
  );
}
