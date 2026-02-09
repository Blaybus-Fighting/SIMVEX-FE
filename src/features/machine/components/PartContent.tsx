import "./machine.css";
import PartImageStrip from "./PartImageStrip";
import MachineSection from "./MachineSection";

interface Props {
  selectedPart: string | null;
}

export default function PartContent({ selectedPart }: Props) {
  if (!selectedPart) {
    return <div className="section-body">부품을 선택해주세요.</div>;
  }

  return (
    <>
      <MachineSection title="부품명">
        {selectedPart}
      </MachineSection>

      <MachineSection title="재질">
        탄소강 (S45C)
      </MachineSection>

      <MachineSection title="역할">
        • 회전 하중을 안정적으로 지지<br />
        • 축방향 이동 제한<br />
        • 클램핑 힘 전달
      </MachineSection>

      <PartImageStrip selectedPart={selectedPart} onSelectPart={function (_id: string): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
}
