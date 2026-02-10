import { useState } from "react";
import Dropdown from "@/components/ui/DropdownBtn";
import PartsDropdown from "@/components/ui/PartsDropdownBtn";
import { ResolutionSlider } from "@/components/ui/ResolutionSlider";
import ExplodeViewer from "@/features/viewer/components/ExplodeViewer";
import type { ModelType } from "@/types/model";

type Rendering3DProps = {
  modelName: ModelType; // 허용된 모델 이름만 받아야 함
  onPartSelect?: (id: string | null) => void;
};

export default function Rendering3D({ modelName }: Rendering3DProps) {
  const [explodePct, setExplodePct] = useState(0);

  const explode = explodePct / 100;

  const modelUrlMap: Record<string, string> = {
    "Robot-Gripper": "/models/Robot Gripper.glb",
    Suspension: "/models/Suspension.glb",
    "Machine-Vice": "/models/MachineVice.glb",
  };

  return (
    <div className="flex flex-col h-full pt-4">
      <section className="flex justify-between items-end">
        <div className="flex gap-3">
          <Dropdown buttonLabel="배경색" left={true} items={[]} />
          <Dropdown buttonLabel="조명" left={true} items={[]} />
        </div>
        <PartsDropdown />
      </section>

      <div className="flex h-full">
        <ExplodeViewer explode={explode} url={modelUrlMap[modelName]} />
      </div>

      <section className="flex justify-end">
        <ResolutionSlider value={explodePct} onChange={setExplodePct} />
      </section>
    </div>
  );
}
