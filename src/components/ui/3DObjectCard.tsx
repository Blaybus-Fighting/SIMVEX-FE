import { useNavigate } from "react-router-dom";

interface ThreeDObjectCardProps {
  id: number;
  name: string;
  thumbnailUrl: string;
  // updateTime: string;
  // onSelectPart: () => void;
}

export default function ThreeDObjectCard({
  id,
  name,
  thumbnailUrl,
  // updateTime,
  // onSelectPart,
}: ThreeDObjectCardProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/study?modelId=${id}`)} // 모델 아이디를 전달한 채 페이지 이동
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
      <div className="aspect-[5/3] w-full flex items-center justify-center overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={name}
          className="
          h-full
          w-full
          object-contain
          scale-150
          "
        />
      </div>

      {/* ================= 텍스트 영역 ================= */}
      <div className="px-4 py-3">
        {/* 모델명 */}
        <p className="text-text-2 font-medium text-gray-100">{name}</p>

        {/* 업데이트 시간 */}
        <p className="text-caption font-normal text-gray-200">최근 수정일</p>
      </div>
    </button>
  );
}
