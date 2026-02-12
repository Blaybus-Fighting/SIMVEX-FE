// 굳이 외부 파일로 뺄 필요 없이 내부에서 관리
import AiSummaryIcon from "@/assets/icons/ai_summary.svg?react";
import { Input } from "@headlessui/react";

export default function AiSummaryCard() {
  return (
    <div className="mb-8">
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        <AiSummaryIcon width={24} height={24} />
        <h3 className="text-gray-100 font-bold text-text-1 tracking-tight">
          AI 요약
        </h3>
      </div>

      {/* 요약 텍스트 박스 */}
      <Input
        className="w-full bg-background-200 border border-white/5 rounded-xl p-4 shadow-inner placeholder:text-sm"
        placeholder="재질 및 역할, 해당 부품을 사용하는 완제품 사례 4줄 내로 요약"
      />
    </div>
  );
}
