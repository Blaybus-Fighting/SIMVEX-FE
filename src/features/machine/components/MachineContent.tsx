import { useState } from "react";
import "./machine.css";

export default function MachineContent() {
  const [openUsage, setOpenUsage] = useState(false);
  const [openTheory, setOpenTheory] = useState(false);

  return (
    <>
      {/* ================= 용도 ================= */}
      <div className="usage-section">
        <div className="section-title">용도</div>

        <div className={`usage-text ${openUsage ? "open" : ""}`}>
          공작 기계 바이스는 절삭 및 가공 중 공작물을
          정확한 위치에 고정하기 위한 장치이다.
        </div>

        <button
          className="section-toggle"
          onClick={() => setOpenUsage(v => !v)}
        >
          {openUsage ? "접기 ▲" : "펼치기 ▼"}
        </button>

        <div className="section-divider" />
      </div>

      {/* ================= 주요 이론 ================= */}
      <div className="theory-section">
        <div className="section-title">주요 이론</div>

        <div className={`section-body ${openTheory ? "open" : ""}`}>
          <strong>1. 나사의 원리</strong><br />
          리드 스크류의 회전 운동을 직선 운동으로 변환하여
          강한 압착력을 발생시키는 메커니즘이다.
        </div>

        <button
          className="section-toggle"
          onClick={() => setOpenTheory(v => !v)}
        >
          {openTheory ? "접기 ▲" : "펼치기 ▼"}
        </button>

        <div className="section-divider" />
      </div>
    </>
  );
}
