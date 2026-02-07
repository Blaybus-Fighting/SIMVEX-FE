import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

import AiSummaryCard from "@/features/machine/components/AiSummaryCard";
import MachineContent from "@/features/machine/components/MachineContent";
import PartContent from "@/features/machine/components/PartContent";

export default function MachinePanel() {
  const [activeTab, setActiveTab] = useState<"LEFT" | "RIGHT">("LEFT");

  // ✅ 추가 1: 선택된 부품 상태 (일단 string | null)
  const [selectedPart] = useState<string | null>(null);

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
        {/* ✅ 변경 2: null → selectedPart */}
        <AiSummaryCard selectedPart={selectedPart} />

        {/* 🔥 탭에 따라 내용만 변경 */}
        {activeTab === "LEFT" ? (
          <MachineContent />
        ) : (
          // ✅ 변경 3: null → selectedPart
          <PartContent selectedPart={selectedPart} />
        )}
      </div>
    </PanelLayout>
  );
}
