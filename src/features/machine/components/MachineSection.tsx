import { useState } from "react";
import "./machine.css";

export default function MachineSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="section">
      <div className="section-title">{title}</div>
      <div className="section-divider" />

      <div className={`section-body ${expanded ? "expanded" : ""}`}>
        {children}
      </div>

      <button
        className="section-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        펼치기 {expanded ? "▲" : "▼"}
      </button>
    </div>
  );
}
