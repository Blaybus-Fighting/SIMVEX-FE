import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout.tsx"; // 경로에 맞게 수정
import { TabSwitcher } from "@/components/ui/TabSwitcher.tsx";
import MachineContent from "./MachineContent.tsx";
import PartContent from "./PartContent.tsx";

interface MachinePanelProps {
  selectedPart: string | null;
  onPartSelect: (id: string | null) => void;
}

export default function MachinePanel({selectedPart, onPartSelect}: MachinePanelProps) {
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
      
      <div className="w-full h-full overflow-hidden relative">

        {activeTab === "LEFT" ? (
          <MachineContent/>
        ) : (
          <PartContent
            selectedPart={selectedPart}
            onPartSelect={onPartSelect}
          />
        )}
      </div>
    </PanelLayout>
  );
}