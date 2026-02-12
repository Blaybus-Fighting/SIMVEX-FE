import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout.tsx"; // 경로에 맞게 수정
import { TabSwitcher } from "@/components/ui/TabSwitcher.tsx";
import MachineContent from "./MachineContent.tsx";
import PartContent from "./PartContent.tsx";
import { usePartStore } from "@/store/partStore.ts";

export default function MachinePanel() {
  const [activeTab, setActiveTab] = useState<"LEFT" | "RIGHT">("LEFT");
  const { part } = usePartStore(); // 선택한 부품

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
      <div className="w-full h-full overflow-hidden relative">
        {activeTab === "LEFT" ? (
          <MachineContent />
        ) : (
          <PartContent selectedPart={part} />
        )}
      </div>
    </PanelLayout>
  );
}
