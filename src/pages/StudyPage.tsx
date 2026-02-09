// src/pages/StudyPage.tsx
import { useState } from "react";
import MachineInfoPanel from "@/features/machine/components/MachineInfoPanel";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";

export default function StudyPage() {
  const [activeTab] = useState<"machine" | "part">("machine");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="workspace-layout">
      <div className="viewer-area" />

      <div className="machine-area">
        <MachineInfoPanel
          activeTab={activeTab}
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
        />
      </div>

      <div className="ai-area">
        <WorkspacePanel />
      </div>
    </div>
  );
}
