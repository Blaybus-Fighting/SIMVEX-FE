// 굳이 외부 파일로 뺄 필요 없이 내부에서 관리
import AiSummaryIcon from "@/assets/icons/ai_summary.svg?react";

const AI_SUMMARY_DATA: Record<string, string> = {
  "": "리드 스크류의 회전 운동을 가동 죠의 직선 운동으로 변환하여 강력한 압착력을 발생시키는 기계적 메커니즘이 적용됩니다.",
  "spindle-socket": "스핀들 소켓은 회전축을 안정적으로 지지하며 정밀한 회전을 가능하게 합니다. 내마모성이 강한 합금강 재질이 주로 사용됩니다.",
  "jaw": "바이스의 죠는 공작물을 단단히 고정하여 가공 중 흔들림을 방지합니다. 반복적인 클램핑에도 변형이 적은 탄소강 재질이 특징입니다.",
  "base": "베이스는 전체 기계 구조를 지지하며 안정성을 확보하는 핵심 부품입니다. 진동 흡수력이 뛰어난 주물 재질로 제작됩니다.",
};

interface Props {
  selectedPart: string | null;
}

export default function AiSummaryCard({selectedPart}: Props) {
  // 선택된 값이 없으면 기본값("") 사용
  const summaryText = AI_SUMMARY_DATA[selectedPart ?? ""] || AI_SUMMARY_DATA[""];

  return (
    <div className="mb-8">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        <AiSummaryIcon width={24} height={24}/>
        <h3 className="text-gray-100 font-bold text-text-1 tracking-tight">AI 요약</h3>
      </div>

      {/* 요약 텍스트 박스 */}
      <div className="bg-background-200 border border-white/5 rounded-xl p-4 shadow-inner">
        <p className="text-gray-100 text-text-4 leading-relaxed break-keep">
          {summaryText}
        </p>
      </div>
    </div>
  );
}