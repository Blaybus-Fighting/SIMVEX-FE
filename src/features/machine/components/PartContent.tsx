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
        {selectedPart ?? "부품을 선택해주세요"}
      </MachineSection>

      <MachineSection title="역할">
        선택된 부품의 역할 설명이 여기에 표시됩니다.
      </MachineSection>

      <MachineSection title="재질 변경해보기">
        재질 변경 시 발생하는 특성 설명
      </MachineSection>

      <PartImageStrip
        selectedPart={selectedPart}
        onSelect={onPartSelect}
      />
    </>
  );
}
