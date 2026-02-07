import Rendering3D, { type Part } from "@/components/Rendering3D";
import MachinePanel from "@/features/machine/components/MachinePanel";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";

export default function TestPage() {
  return (
    <div className="flex h-full">
      {/* ===== ① 3D 영역 ===== */}
      <div className="flex-1">
        <Rendering3D
          pageKey="pageA"
          onPartClick={(part: Part) => {
            // 👉 이후 MachinePanel과 상태 연결 가능
            console.log("선택된 부품:", part.id);
          }}
        />
      </div>

      {/* ===== ② 기계 / 부품 패널 ===== */}
      <div className="w-[380px] border-l border-[#2a2f3a]">
        <MachinePanel />
      </div>

      {/* ===== ③ 노트 / AI 패널 ===== */}
      <div className="w-[380px] border-l border-[#2a2f3a]">
        <WorkspacePanel />
      </div>
    </div>
  );
}
