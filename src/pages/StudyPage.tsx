// src/pages/StudyPage.tsx
import { useState } from "react";
import MachinePanel from "@/features/machine/MachinePanel.tsx";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";

export default function StudyPage() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="flex w-full h-full bg-[#0f172a] p-2 gap-4 overflow-hidden">

      {/* 3D 영역: flex-[1.8]으로 더 넓게 차지 */}
      <div className="flex-[1.8] min-w-0 bg-slate-900/50 rounded-xl border border-white/5"/>

      {/* 기계/부품 영역: flex-1 */}
      <div className="flex-1 min-w-0">
        <MachinePanel
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
        />
      </div>

      {/* 워크스페이스 영역: flex-1 */}
      <div className="flex-1 min-w-0">
        <WorkspacePanel/>
      </div>

    </div>
  );
}
