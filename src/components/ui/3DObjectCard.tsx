interface ThreeDObjectCardProps {
  imageSrc: string;
  modelName: string;
  updateTime: string;
  onSelectPart: () => void;
}

export default function ThreeDObjectCard({
  imageSrc,
  modelName,
  updateTime,
  onSelectPart,
}: ThreeDObjectCardProps) {
  return (
    <button
      onClick={onSelectPart}
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        bg-background-300
        text-left
        transition
        hover:bg-background-200
      "
    >
      {/* ================= 이미지 영역 ================= */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={imageSrc}
          alt={modelName}
          className="
            h-full
            w-full
            object-contain
            transition
            group-hover:scale-105
          "
        />
      </div>

      {/* ================= 텍스트 영역 ================= */}
      <div className="space-y-1 px-4 py-3">
        {/* 모델명 */}
        <p className="text-text-3 font-medium text-white">
          {modelName}
        </p>

        {/* 업데이트 시간 */}
        <p className="text-caption text-gray-300">
          {updateTime}
        </p>
      </div>
    </button>
  );
}
