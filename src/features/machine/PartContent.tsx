import MachineSection from "./components/MachineSection.tsx";
import AiSummaryCard from "./components/AiSummaryCard.tsx";
import MaterialSelector from "./components/MaterialSelector.tsx";

interface Props {
  selectedPart: string | null;
  onPartSelect: (id: string | null) => void;
}

export default function PartContent({selectedPart}: Props) {
  // 부품 미선택 시 화면
  if (!selectedPart) {
    return (
      <div className="flex items-center justify-center h-full text-gray-100 text-text-2">
        학습하고 싶은 부품을 클릭해 주세요.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full text-left">

      <div className="flex-1 overflow-y-auto custom-scrollbar p-1 pr-2 space-y-8 pb-4">

        {/* 1. AI 요약 */}
        <AiSummaryCard selectedPart={selectedPart}/>

        {/* 2. 부품명 */}
        <div>
          <h3 className="text-gray-100 font-bold text-text-1 mb-2">부품명</h3>
          <p className="text-gray-200 text-text-4">
            {selectedPart} (스핀들 지지대)
          </p>
        </div>

        {/* 3. 재질 설명 (펼치기 기능) */}
        <MachineSection title="재질">
          <span className="text-gray-100 font-medium text-text-3 block mb-1">탄소강 (S45C / Carbon Steel)</span>
          강도가 높고 열처리가 용이하여 스핀들의 회전 하중을 견디기에 최적화된 재질입니다.
          <br/>
          내마모성이 우수하여 장시간 사용에도 변형이 적습니다.
        </MachineSection>

        {/* 4. 역할 설명 (펼치기 기능) */}
        <MachineSection title="역할">
          <span className="block mb-2">
            부품이 기계 전체에서 수행하는 핵심적인 기능에 대한 설명입니다.
          </span>
          <ul className="list-disc list-inside space-y-1 text-gray-200">
            <li>회전 허용 / 축방향 이동 제한</li>
            <li>스핀들 하중을 본체로 전달</li>
            <li>클램핑 힘의 안정적 전달에 기여</li>
          </ul>
        </MachineSection>
      </div>

      {/* [하단 고정 영역] shrink-0
        - 스크롤과 상관없이 항상 바닥에 붙어있습니다.
      */}
      <div className="shrink-0 pt-4 mt-2 border-t border-white/5 bg-background-300 z-10">
        <MaterialSelector/>
      </div>

    </div>
  );
}