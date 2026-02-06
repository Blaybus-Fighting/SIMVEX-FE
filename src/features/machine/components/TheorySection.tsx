import { useState } from "react";
import "./machine.css";

export default function TheorySection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="theory-section">
      <div className="section-title">주요 이론</div>

      {open && (
        <div className="section-body">
          {children}
        </div>
      )}

      <button
        className="section-toggle"
        onClick={() => setOpen(!open)}
      >
        펼치기 {open ? "▲" : "▼"}
      </button>

      {/* ❗ 항상 여기만 */}
      <div className="section-divider" />
    </div>
  );
}
