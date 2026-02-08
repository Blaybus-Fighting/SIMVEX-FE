import "./machine.css";

interface Props {
  selectedPart: string | null;
}

const AI_SUMMARY_MAP: Record<string, string> = {
  "a-1": "부품 1은 회전 하중을 안정적으로 지지하며 구조적 안정성을 제공합니다.",
  "a-2": "부품 2는 축방향 이동을 제한하여 정밀도를 향상시킵니다.",
  "a-3": "부품 3은 클램핑 힘을 균일하게 분산시키는 역할을 합니다.",
  "a-4": "부품 4는 진동을 감소시켜 가공 품질을 개선합니다.",
};

export default function AiSummaryCard({ selectedPart }: Props) {
  const summaryText =
  AI_SUMMARY_MAP[selectedPart ?? ""] ??
  "이론 및 용도 등을 4줄 이내로 요약합니다. 선택된 기계 또는 부품의 핵심 정보만 제공합니다.";


  return (
    <div className="ai-card">
      <div className="ai-header">■ AI 요약</div>

      <div className="ai-inner-card">
        {summaryText}
      </div>
    </div>
  );
}
