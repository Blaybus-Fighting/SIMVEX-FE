import { useMemo, useState } from "react";
import Dropdown from "@/components/ui/DropdownBtn";
import PartsDropdown from "@/components/ui/PartsDropdownBtn";
import { ResolutionSlider } from "@/components/ui/ResolutionSlider";
import ExplodeViewer from "@/features/viewer/components/ExplodeViewer";
import { partsByModel } from "@/features/viewer/data";

export type ModelName = keyof typeof partsByModel;

interface Rendering3DProps {
  modelName: ModelName;
  onPartSelect?: (id: string | null) => void;
}

export default function Rendering3D({
  modelName,
  onPartSelect,
}: Rendering3DProps) {
  const [explodePct, setExplodePct] = useState(0);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const explode = explodePct / 100;
  const baseParts = partsByModel[modelName];

  const parts = useMemo(
    () =>
      baseParts.map((p) => ({
        ...p,
        onClick: () => {
          setSelectedPart(p.id);
          onPartSelect?.(p.id);
        },
      })),
    [baseParts, onPartSelect],
  );

  const modelUrlMap: Record<string, string> = {
    "Robot Gripper": "/models/Robot Gripper.glb",
    Suspension: "/models/Suspension.glb",
    "Machine Vice": "/models/MachineVice.glb",
  };

  return (
    <div className="flex flex-col h-full">
      <section className="flex justify-between items-end">
        <div className="flex gap-3">
          <Dropdown buttonLabel="배경색" left={true} items={[]} />
          <Dropdown buttonLabel="조명" left={true} items={[]} />
        </div>
        <PartsDropdown parts={parts} />
      </section>

      <div className="flex flex-1">
        <ExplodeViewer
          explode={explode}
          url={modelUrlMap[modelName]}
          selectedPart={selectedPart}
        />
      </div>

      <section className="flex justify-end">
        <ResolutionSlider value={explodePct} onChange={setExplodePct} />
      </section>
    </div>
  );
}
