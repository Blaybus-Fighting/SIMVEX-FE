import { useMemo, useState } from "react";
import Dropdown from "./ui/DropdownBtn";
import PartsDropdown from "./ui/PartsDropdownBtn";
import { ResolutionSlider } from "./ui/ResolutionSlider";
import ExplodeViewer from "@/features/viewer/components/ExplodeViewer";
// import { robotGripperParts } from "@/features/viewer/data/parts/robotGripperParts";
import { partsByModel } from "@/features/viewer/data";

export type Part = {
  id: string;
  label: string;
  imgSrc?: string;
};

type Rendering3DProps = {
  modelName: ModelName; // "Robot Gripper" | "Suspension"
};

export type ModelName = keyof typeof partsByModel;

export default function Rendering3D({ modelName }: Rendering3DProps) {
  // 분해도 0~100
  const [explodePct, setExplodePct] = useState(0);
  const [selectedPart, setSelectedPart] = useState<string | null>(null); // 선택 부품(✅ 나중에 전역상태 저장)

  // 내부에서만 0~1로 변환
  const explode = explodePct / 100;

  // 모델 이름으로 parts 선택
  const baseParts = partsByModel[modelName];

  // 클릭 로직 주입 (모델 바뀌면 선택 초기화도 추천)
  const parts = useMemo(
    () =>
      baseParts.map((p) => ({
        ...p,
        onClick: () => setSelectedPart((prev) => (prev === p.id ? null : p.id)),
      })),
    [baseParts],
  );

  // 받아오는 모델명에 따라 받는 glb를 다르게 분기
  const modelUrlMap: Record<string, string> = {
    "Robot Gripper": "/models/Robot Gripper.glb",
    Suspension: "/models/Suspension.glb",
    "Machine Vice": "/models/MachineVice.glb",
  };

  const modelUrl = modelUrlMap[modelName];

  return (
    // 이 컴포넌트에 있는 페이지에도 h-full 적용해야 함
    <div className="flex flex-col h-full">
      {/* 배경색, 조명, 구성 부품 버튼 섹션 */}
      <section className="flex justify-between items-end">
        <div className="flex gap-3">
          <Dropdown
            buttonLabel="배경색"
            items={[
              { label: "배경색1", onClick: () => alert("배경색1 선택") },
              { label: "배경색2", onClick: () => alert("배경색2 선택") },
            ]}
          />
          <Dropdown
            buttonLabel="조명"
            items={[
              { label: "조명1", onClick: () => alert("조명1 선택") },
              { label: "조명2", onClick: () => alert("조명2 선택") },
            ]}
          />
        </div>

        <PartsDropdown parts={parts} />
      </section>

      {/* 3D 부품 */}
      <div className="flex flex-1 w-2/3">
        <ExplodeViewer
          explode={explode}
          url={modelUrl}
          selectedPart={selectedPart} // 선택한 부품을 넘겨줌
        />
      </div>

      {/* Q&A 버튼과 분해도 조절 슬라이드 */}
      <section className="flex justify-between items-end">
        <button className="rounded-full w-8 h-8 bg-[#2B3041] text-[#819EFF] font-semibold">
          ?
        </button>

        <div className="flex gap-[0.813rem]">
          {/* 축 기즈모(✅ TODO: 3D 부품 구현할 때 진행 */}
          <div className="border border-white w-20 h-20" />

          {/* 분해 조립도 슬라이더 */}
          <ResolutionSlider value={explodePct} onChange={setExplodePct} />
        </div>
      </section>
    </div>
  );
}
