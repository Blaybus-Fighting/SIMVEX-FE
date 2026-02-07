import { useState } from "react";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import Rendering3D, { type Part } from "@/components/Rendering3D";
import MachineInfoPanel from "@/features/machine/components/MachineInfoPanel";
import "@/features/machine/components/machine.css";

export default function StudyPage() {

  // 현재 탭
  const [activeTab, setActiveTab] = useState<"machine" | "part">("machine");

  // 선택된 부품 id
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  /** 🔥 3D 부품 클릭 시 */
  const handlePartClick = (part: Part) => {
    setSelectedPart(part.id);   // 어떤 부품인지 저장
    setActiveTab("part");       // 👉 자동으로 부품 탭 전환
  };

  return (
    <div className="h-screen w-full bg-background-400 p-8 flex justify-center items-center gap-6 overflow-hidden">

      <div className="workspace-layout">
        {/* ===== 3D 영역 ===== */}
        <div className="viewer-area">
          <Rendering3D
            pageKey="pageA"
            onPartClick={handlePartClick}
          />
        </div>

        {/* ===== 기계 / 부품 패널 ===== */}
        <div className="machine-area">
          <MachineInfoPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedPart={selectedPart}
          />
        </div>

        {/* ===== 노트 / AI 패널 ===== */}
        <div className="ai-area">
          <WorkspacePanel/>
        </div>
      </div>
    </div>
  );
}
