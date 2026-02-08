import MachineSection from "./MachineSection";
import PartImageStrip from "./PartImageStrip";

interface Props {
  selectedPart: string | null;
  onPartSelect: (id: string) => void;
}

export default function PartContent({ selectedPart, onPartSelect }: Props) {
  return (
    <>
      <MachineSection title="부품명">
        spindlesocket (스핀들 지지대)
      </MachineSection>

      <MachineSection title="재질">
        탄소강 (S45C / Carbon Steel)
      </MachineSection>

      <MachineSection title="역할">
        • 회전 하중을 안정적으로 지지한다.<br />
        • 축방향 이동을 제한하여 구조적 안정성을 확보한다.<br />
        • 클램핑 힘을 균일하게 전달한다.
      </MachineSection>

      <MachineSection title="재질 변경해보기">
        해당 재질 사용 시 생기는 상황 및 문제 1줄 노출
      </MachineSection>

      <PartImageStrip
        selectedPart={selectedPart}
        onSelect={onPartSelect}
      />
    </>
  );
}
