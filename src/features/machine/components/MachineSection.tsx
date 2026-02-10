import { type ReactNode, useState } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export default function MachineSection({title, children}: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-10 group w-full">
      {/* 제목 + 얇은 라인 */}
      <div className="mb-4 text-left">
        <h3 className="text-gray-100 font-bold text-text-1 mb-3">{title}</h3>
        <div className="h-[1px] bg-white/5 w-full"/>
      </div>

      {/* 본문: 펼치기 전에는 max-height로 2~3줄 정도만 노출 */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-[3.8em] opacity-60"
        }`}
      >
        <div className="text-gray-200 leading-[1.8] text-text-4 whitespace-pre-wrap text-left">
          {children}
        </div>
      </div>

      {/* 펼치기/접기 버튼 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 w-full py-2 flex items-center justify-center gap-2 text-gray-300 hover:text-gray-300 transition-colors text-[13px]"
      >
        <span>{isExpanded ? "접기" : "펼치기"}</span>
        <span className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
    </div>
  );
}