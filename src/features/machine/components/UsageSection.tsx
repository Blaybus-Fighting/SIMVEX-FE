import "./machine.css";

export default function UsageSection({
  children,
}: {
  children: string;
}) {
  return (
    <div className="usage-section">
      <div className="section-title">용도</div>

      <div className="usage-text">
        {children}
      </div>

      {/* 섹션 마감선 (1개만) */}
      <div className="section-divider" />
    </div>
  );
}
