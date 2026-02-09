// src/pages/TestPage.tsx
import { useState } from "react";
import Rendering3D from "@components/Rendering3D";
import MachineInfoPanel from "@/features/machine/components/MachineInfoPanel";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import "@/features/machine/components/machine.css";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState<"machine" | "part">("machine");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="workspace-layout">
      <div className="viewer-area">
        <Rendering3D
          modelName="Machine Vice"
          onPartSelect={(id) => {
            setSelectedPart(id);
            setActiveTab("part");
          }}
        />
      </div>

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

// import { useState } from "react";
// import Rendering3D, { type Part } from "@/components/Rendering3D";
// import MachineInfoPanel from "@/features/machine/components/MachineInfoPanel";
// import "@/features/machine/components/machine.css";

// export default function TestPage() {
//   // 현재 탭
//   const [activeTab, setActiveTab] = useState<"machine" | "part">("machine");

//   // 선택된 부품 id
//   const [selectedPart, setSelectedPart] = useState<string | null>(null);

//   /** 🔥 3D 부품 클릭 시 */
//   const handlePartClick = (part: Part) => {
//     setSelectedPart(part.id); // 어떤 부품인지 저장
//     setActiveTab("part"); // 👉 자동으로 부품 탭 전환
//   };

//   return (
//     <div className="workspace-layout">
//       {/* ===== ① 3D 영역 ===== */}
//       <div className="viewer-area">
//         <Rendering3D
//           pageKey="pageA"
//           onPartClick={handlePartClick}
//         />
//       </div>

//       {/* ===== ② 기계 / 부품 패널 ===== */}
//       <div className="machine-area">
//         <MachineInfoPanel
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           selectedPart={selectedPart}
//         />
//       </div>

//       {/* ===== ③ AI 영역 (아직 자리만) ===== */}
//       <div className="ai-area" />
//     </div>
//   );
// }
