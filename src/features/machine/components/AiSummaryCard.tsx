import { AI_SUMMARY_MAP } from "./aiSummaryMap";

interface Props {
  selectedPart: string | null;
}

export default function AiSummaryCard({ selectedPart }: Props) {
  const summaryText =
    AI_SUMMARY_MAP[selectedPart ?? ""] ??
    "이론 및 용도 등을 4줄 이내로 요약합니다.";

  return (
    <div className="ai-card">
      <div className="ai-header">AI 요약</div>
      <div className="ai-inner-card">{summaryText}</div>
    </div>
  );
}
