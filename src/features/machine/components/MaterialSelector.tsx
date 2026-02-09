import { useState } from "react";
import TextureIcon from "@/assets/icons/texture.svg?react";

const SAMPLE_MATERIALS = [
  {id: "wood", name: "Wood", color: "bg-[#8B5A2B]"},
];

export default function MaterialSelector() {
  const [selectedMaterial, setSelectedMaterial] = useState(SAMPLE_MATERIALS[0]?.id);
  const TOTAL_SLOTS = 4;
  const emptySlotsCount = Math.max(0, TOTAL_SLOTS - SAMPLE_MATERIALS.length);

  return (
    <div className="w-full text-left">
      <div className="flex items-center gap-2 mb-2">

        <TextureIcon
          width={20}
          height={20}
          className="text-blue-400"
        />
        <h3 className="text-gray-100 font-bold text-text-1">재질 변경 해보기</h3>
      </div>

      {/* 설명 텍스트 */}
      <p className="text-gray-100 text-text-3 mb-4">
        해당 재질 사용 시 생기는 상황 및 문제 1줄 노출.
      </p>

      {/* 재질 선택 그리드 */}
      <div className="grid grid-cols-4 gap-3 p-2 bg-background-200 rounded-lg">
        {/* 1. 실제 데이터 렌더링 */}
        {SAMPLE_MATERIALS.map((mat) => (
          <button
            key={mat.id}
            onClick={() => setSelectedMaterial(mat.id)}
            className={`
              aspect-square rounded-lg relative overflow-hidden transition-all
              ${selectedMaterial === mat.id
              ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0f172a]"
              : "opacity-80 hover:opacity-100"}
            `}
          >
            <div className={`w-full h-full ${mat.color}`}>
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-black/20"/>
            </div>
          </button>
        ))}

        {/* 2. 빈 슬롯 */}
        {Array.from({length: emptySlotsCount}).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square rounded-lg border border-white/5 bg-background-400"
          />
        ))}
      </div>
    </div>
  );
}