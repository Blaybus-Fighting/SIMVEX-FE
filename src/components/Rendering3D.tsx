import { useCallback, useMemo, useState } from "react";
import Dropdown from "./ui/DropdownBtn";
import PartsDropdown from "./ui/PartsDropdownBtn";
import { ResolutionSlider } from "./ui/ResolutionSlider";
import ExplodeViewer from "@/features/viewer/components/ExplodeViewer";

export type Part = {
  id: string;
  label: string;
  imgSrc?: string;
};

// 페이지별 parts 데이터를 한 군데에 모여 생성
const PARTS_BY_PAGE = {
  pageA: [
    { id: "a-1", label: "부품 1" },
    { id: "a-2", label: "부품 2" },
    { id: "a-3", label: "부품 3" },
    { id: "a-4", label: "부품 4" },
    { id: "a-5", label: "부품 5" },
  ],
  pageB: [{ id: "b-1", label: "커버", imgSrc: "/images/b/cover.png" }],
  pageC: [
    { id: "c-1", label: "모듈 A" },
    { id: "c-2", label: "모듈 B", imgSrc: "/images/c/module-b.png" },
  ],
} as const;

export type PageKey = keyof typeof PARTS_BY_PAGE;

type Rendering3DProps = {
  pageKey: PageKey;
  onPartClick?: (part: Part) => void;
};

export default function Rendering3D({
  pageKey,
  onPartClick,
}: Rendering3DProps) {
  const parts = PARTS_BY_PAGE[pageKey]; // pageKey로 parts 선택

  // 분해도 0~100
  const [explodePct, setExplodePct] = useState(0);

  // 내부에서만 0~1로 변환
  const explode = explodePct / 100;

  // 부품 클릭 로직
  const handlePartClick = useCallback(
    (part: Part) => {
      onPartClick?.(part);
      if (!onPartClick) console.log("부품 클릭: ", part.id);
    },
    [onPartClick],
  );

  // PartsDropdown이 onClick을 요구한다면 여기서 만들어서 넘김
  const partsForDropDown = useMemo(
    () =>
      parts.map((p) => ({
        ...p,
        onClick: () => handlePartClick(p),
      })),
    [parts, handlePartClick],
  );

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

        <PartsDropdown parts={partsForDropDown} />
      </section>

      {/* 3D 부품 */}
      <div className=" w-[900px] h-full">
        <ExplodeViewer explode={explode} url="/models/Robot Glipper.glb" />
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
