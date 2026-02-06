import { useEffect, useState } from "react";
import "./machine.css";

interface Props {
  selectedPart: string | null;
}

const PART_IMAGES = [
  { id: "a-1", label: "부품 1" },
  { id: "a-2", label: "부품 2" },
  { id: "a-3", label: "부품 3" },
  { id: "a-4", label: "부품 4" },
];

export default function PartImageStrip({ selectedPart }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  /* 🔥 3D 클릭 → 자동 선택 */
  useEffect(() => {
    if (selectedPart) {
      setActiveId(selectedPart);
    }
  }, [selectedPart]);

  return (
    <div className="part-image-strip">
      {PART_IMAGES.map((p) => (
        <div
          key={p.id}
          className={`part-image-item ${
            activeId === p.id ? "active" : ""
          }`}
          onClick={() => setActiveId(p.id)}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
}
