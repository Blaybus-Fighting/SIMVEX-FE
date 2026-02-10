interface Props {
  selectedPart: string | null;
  onSelectPart: (id: string) => void;
}

const PART_IMAGES = [
  {id: "part-1", label: "부품 1"},
  {id: "part-2", label: "부품 2"},
  {id: "part-3", label: "부품 3"},
];

export default function PartImageStrip({selectedPart, onSelectPart}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
      {PART_IMAGES.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelectPart(p.id)}
          className={`
            shrink-0 w-24 h-24 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2
            ${selectedPart === p.id
            ? "border-primary-200 bg-primary-200/10 text-white"
            : "border-white/5 bg-white/5 text-gray-400 hover:border-white/20"}
          `}
        >
          <div className="w-10 h-10 bg-white/10 rounded-full"/>
          {/* 임시 아이콘 */}
          <span className="text-xs font-medium">{p.label}</span>
        </button>
      ))}
    </div>
  );
}