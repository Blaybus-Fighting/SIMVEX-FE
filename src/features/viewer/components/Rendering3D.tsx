import { useCallback, useEffect, useState } from "react";
import Dropdown from "@/components/ui/DropdownBtn";
import PartsDropdown from "@/components/ui/PartsDropdownBtn";
import { ResolutionSlider } from "@/components/ui/ResolutionSlider";
import ExplodeViewer from "@/features/viewer/components/ExplodeViewer";
import type { ModelType } from "@/types/model";
import { HelpTooltip } from "./HelpToolTip";
import { useViewDataStore } from "@/store/sessionStore";
import { useDetailModelStore } from "@/store/modelStore";

type Rendering3DProps = {
  modelName: ModelType; // 허용된 모델 이름만 받아야 함
  onPartSelect?: (id: string | null) => void;
};

export default function Rendering3D({ modelName }: Rendering3DProps) {
  const { viewData, setViewData } = useViewDataStore();
  const { model } = useDetailModelStore();

  const [explodePct, setExplodePct] = useState(0);

  // 화면 진입/세션 로드 등으로 viewData.explode가 들어오면 슬라이더 값 동기화
  useEffect(() => {
    if (viewData?.explode == null) return;

    const nextPct = viewData.explode * 100;
    setExplodePct((prev) => (prev !== nextPct ? nextPct : prev));
  }, [viewData?.explode]);

  // 슬라이더 조절 → UI 즉시 반영 + 3D용 explode(0~1) 업데이트
  const handleExplodeUpdate = useCallback(
    (pct: number) => {
      setExplodePct(pct);

      const explode = Math.min(1, Math.max(0, pct / 100));

      if (!viewData) return;

      // 슬라이더에서 바뀐 분해 정도를 3D에 반영하려면
      // ExplodeViewer에 내려주는 explode 값(= viewData.explode)이 바뀌어야 함
      setViewData({
        ...viewData,
        explode,
      });
    },
    [viewData, setViewData],
  );

  const modelUrlMap: Record<string, string> = {
    "Robot-Gripper": "/models/Robot_Gripper.glb",
    Suspension: "/models/Suspension.glb",
    "Machine-Vice": "/models/Machine_Vice.glb",
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
        {model && (
          <ExplodeViewer
            explode={viewData?.explode ?? 0}
            url={modelUrlMap[modelName]}
            viewData={viewData ?? undefined}
            modelId={model.id}
            sessionId={model.sessionId}
          />
        )}
      </div>

      <section className="flex justify-between items-end">
        <HelpTooltip />
        <ResolutionSlider value={explodePct} onChange={handleExplodeUpdate} />
      </section>
    </div>
  );
}
