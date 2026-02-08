import "./machine.css";
import PartImageStrip from "./PartImageStrip";
import MachineSection from "./MachineSection";

interface Props {
  selectedPart: string | null;
  onPartSelect: (id: string) => void;
}

export default function PartContent({ selectedPart, onPartSelect }: Props) {
  return (
    <>
      {/* ================= 부품명 ================= */}
      <div className="part-section">
        <div className="section-title">부품명</div>
        <div className="section-body">
          spindlesocket (스핀들 지지대)
        </div>
      </div>

      {/* ================= 재질 ================= */}
      <div className="part-section">
        <div className="section-title">재질</div>
        <div className="section-body">
          탄소강 (S45C / Carbon Steel)
        </div>
      </div>

      {/* ================= 역할 (공통 접기/펼치기 사용) ================= */}
      <MachineSection title="역할">
        • 회전 하중을 안정적으로 지지한다.<br />
        • 축방향 이동을 제한하여 구조적 안정성을 확보한다.<br />
        • 클램핑 힘을 균일하게 전달한다.
      </MachineSection>

      {/* ================= 재질 변경해보기 ================= */}
      <div className="part-section">
        <div className="section-title">재질 변경해보기</div>
        <div className="section-body subtle">
          해당 재질 사용 시 생기는 상황 및 문제 1줄 노출
        </div>
      </div>

      {/* ================= 부품 이미지 ================= */}
      <PartImageStrip
        selectedPart={selectedPart}
        onSelect={onPartSelect}
      />
    </>
  );
}
