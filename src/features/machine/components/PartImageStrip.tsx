import "./machine.css";

interface Props {
  selectedPart: string | null;
  onSelect: (id: string) => void;
}

const PART_IMAGES = [
  { id: "a-1", label: "부품 1" },
  { id: "a-2", label: "부품 2" },
  { id: "a-3", label: "부품 3" },
  { id: "a-4", label: "부품 4" },
];

export default function PartImageStrip({ selectedPart, onSelect }: Props) {

  /* 3D 클릭 → 자동 선택 (useEffect 없이 props로 해결) */

  return (
      <div className="part-image-strip">
        {PART_IMAGES.map((p) => (
            <div
                key={p.id}
                // active 확인을 props(selectedPart)로 직접 합니다.
                className={`part-image-item ${
                    selectedPart === p.id ? "active" : ""
                }`}
                // 클릭 시 부모 함수(onSelect)를 실행합니다.
                onClick={() => onSelect(p.id)}
            >
              {p.label}
            </div>
        ))}
      </div>
  );
}