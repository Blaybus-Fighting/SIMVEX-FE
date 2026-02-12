import MachineSection from "./components/MachineSection.tsx";
import AiSummaryCard from "./components/AiSummaryCard.tsx";

export default function MachineContent() {
  return (
    // 전체 스크롤 적용 (h-full 필수)
    <div className="h-full overflow-y-auto custom-scrollbar p-1 pr-2 pb-10">
      {/* AI 요약 (기계 전체) */}
      <AiSummaryCard />

      <div className="flex flex-col gap-8 mt-8">
        <MachineSection title="용도">
          공작 기계 바이스는 절삭 및 가공 중 공작물을 정확한 위치에 고정하기
          위한 장치입니다.
          <br />
          다양한 가공 환경에서 필수적인 역할을 수행하며, 안정적인 클램핑 성능을
          제공합니다.
        </MachineSection>

        <MachineSection title="주요 이론">
          <div className="space-y-6">
            <div>
              <p className="font-bold text-gray-100 text-text-3 mb-1">
                1. 나사의 원리
              </p>
              <p className="text-gray-200 text-text-4 leading-relaxed">
                리드 스크류의 회전 운동을 가동 죠의 직선 운동으로 변환하여
                강력한 압착력을 발생시키는 기계적 메커니즘이 적용됩니다.
              </p>
            </div>
            <div>
              <p className="font-bold text-gray-100 text-text-3 mb-1">
                2. 마찰력과 고정
              </p>
              <p className="text-gray-200 text-text-4 leading-relaxed">
                죠(Jaw)와 공작물 사이의 마찰력을 극대화하여 슬립 현상을
                방지합니다.
              </p>
            </div>
          </div>
        </MachineSection>
      </div>
    </div>
  );
}
