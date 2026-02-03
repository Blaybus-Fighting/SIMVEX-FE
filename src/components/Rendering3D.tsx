import Dropdown from "./DropdownBtn";
import PartsDropdown from "./PartsDropdownBtn";
import { ResolutionSlider } from "./ResolutionSlider";

export default function Rendering3D() {
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
        <PartsDropdown
          parts={[
            {
              id: "p1",
              label: "부품 1",
              imgSrc: "/images/part1.png", // 부품 썸네일 자리
              onClick: () => console.log("부품 1 클릭"),
            },
            {
              id: "p2",
              label: "부품 2",
              onClick: () => console.log("부품 2 클릭"),
            },
            {
              id: "p3",
              label: "부품 3",
              imgSrc: "/images/part1.png",
              onClick: () => console.log("부품 3 클릭"),
            },
            {
              id: "p4",
              label: "부품 4",
              onClick: () => console.log("부품 4 클릭"),
            },
            {
              id: "p5",
              label: "부품 5",
              imgSrc: "/images/part1.png",
              onClick: () => console.log("부품 5 클릭"),
            },
            {
              id: "p2",
              label: "부품 2",
              onClick: () => console.log("부품 2 클릭"),
            },
            {
              id: "p1",
              label: "부품 1",
              imgSrc: "/images/part1.png",
              onClick: () => console.log("부품 1 클릭"),
            },
            {
              id: "p2",
              label: "부품 2",
              onClick: () => console.log("부품 2 클릭"),
            },
            {
              id: "p1",
              label: "부품 1",
              imgSrc: "/images/part1.png",
              onClick: () => console.log("부품 1 클릭"),
            },
            {
              id: "p2",
              label: "부품 2",
              onClick: () => console.log("부품 2 클릭"),
            },
          ]}
        />
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
