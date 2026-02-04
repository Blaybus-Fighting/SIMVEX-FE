import { useCallback, useMemo } from "react";
import Dropdown from "./DropdownBtn";
import PartsDropdown from "./PartsDropdownBtn";
import { ResolutionSlider } from "./ResolutionSlider";

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
    <div className="flex flex-col gap-[4.063rem] w-full text-left">
      {/* 배경색, 조명, 구성 부품 버튼 섹션 */}
      <section className="flex justify-between">
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

      {/* 3D 부품(✅ TODO: 3D 부품 구현할 때 진행) */}
      <div className="border border-white w-[663px] h-[554px] ml-[6.188rem]">
        3D 렌더링 자리
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
          <ResolutionSlider />
        </div>
      </section>
    </div>
  );
}
