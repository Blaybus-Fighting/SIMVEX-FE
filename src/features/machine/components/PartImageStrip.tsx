interface Props {
  selectedPart: string | null;
  onSelectPart: (id: string) => void;
}

const PART_IMAGES = [
  { id: "part-1", label: "부품 1" },
  { id: "part-2", label: "부품 2" },
  { id: "part-3", label: "부품 3" },
];

export default function PartImageStrip({
  selectedPart,
  onSelectPart,
}: Props) {
  return (
    <div className="part-image-strip">
      {PART_IMAGES.map((p) => (
        <div
          key={p.id}
          className={`part-image-item ${
            selectedPart === p.id ? "active" : ""
          }`}
          onClick={() => onSelectPart(p.id)}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
}
