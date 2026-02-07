import Rendering3D from "@/Rendering3D";
import MachinePanel from "@/features/machine/components/MachinePanel";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";

export default function TestPage() {
  return (
    <div className="flex h-full">
      {/* ===== ① 3D 영역 ===== */}
      <div className="flex-1">
        <Rendering3D modelName="Machine Vice" />
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
