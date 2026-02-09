interface ThreeDObjectCardProps {
  modelName: string;
  updateTime: string;
  onSelectPart: () => void;
}

export default function ThreeDObjectCard({
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
        bg-background-400
        text-left
        transition
        hover:bg-background-200
      "
    >
      {/* ================= 이미지 영역 ================= */}
      <div className="aspect-[5/3] w-full overflow-hidden bg-background-100">
        {/* ✅ TODO: API 연동 후 사용 */}
        {/* <img
          src={imageSrc}
          alt={modelName}
          className="
            h-full
            w-full
            object-contain
            transition
            group-hover:scale-105
          "
        /> */}
      </div>

      {/* ================= 텍스트 영역 ================= */}
      <div className="px-4 py-3">
        {/* 모델명 */}
        <p className="text-text-2 font-medium text-gray-100">{modelName}</p>

        {/* 업데이트 시간 */}
        <p className="text-caption font-normal text-gray-200">{updateTime}</p>
      </div>
    </button>
  );
}
