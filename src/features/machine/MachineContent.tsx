import MachineSection from "./components/MachineSection.tsx";
import AiSummaryCard from "./components/AiSummaryCard.tsx";
import type { ModelObject } from "@/types/model.ts";
import { useMemo } from "react";

interface Props {
  selectedModel: ModelObject | null;
}

// 이론 한 덩어리
type theoryItem = {
  num: string;
  title: string;
  body: string;
};

function parseTheory(text: string | null): theoryItem[] {
  if (!text) return [];

  const normalized = text.replace(/\r\n/g, "\n").trim();

  // "1. 제목: 내용" 패턴을 전부 잡아서 배열로 만들기
  const items: theoryItem[] = [];
  const re = /(\d+)\.\s*([^:]+?)\s*:\s*([\s\S]*?)(?=\n?\s*\d+\.\s*|$)/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(normalized)) !== null) {
    const num = m[1].trim(); // 숫자
    const title = m[2].trim(); // 제목
    const body = m[3].trim(); // 내용
    items.push({ num, title, body });
  }

  return items;
}

export default function MachineContent({ selectedModel }: Props) {
  const theories = useMemo(
    // 결과를 메모이제이션하기 위해 사용
    () => parseTheory(selectedModel?.mainTheory ?? ""),
    [selectedModel?.mainTheory],
  );
  return (
    // 전체 스크롤 적용 (h-full 필수)
    <div className="h-full overflow-y-auto custom-scrollbar p-1 pr-2 pb-10">
      {/* AI 요약 (기계 전체) */}
      <AiSummaryCard type="machine" />

      <div className="flex flex-col gap-8 mt-8">
        <MachineSection title="용도">
          {selectedModel?.usage}
          <br />
          {selectedModel?.description}
        </MachineSection>

        <MachineSection title="주요 이론">
          <div className="space-y-6">
            {theories.length === 0 ? (
              <p className="text-gray-200 text-text-4 leading-relaxed">
                해당 모델의 이론이 없습니다.
              </p>
            ) : (
              theories.map((t, index) => (
                <div key={`${t.num}-${index}`}>
                  <p className="font-bold text-gray-100 text-text-3 mb-1">
                    {t.num}. {t.title}
                  </p>
                  <p className="text-gray-200 text-text-4 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </MachineSection>
      </div>
    </div>
  );
}
