import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";

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
        {/* ⚠️ 실제 콘텐츠는 TestPage / StudyPage에서 */}
      </div>
    </PanelLayout>
  );
}
