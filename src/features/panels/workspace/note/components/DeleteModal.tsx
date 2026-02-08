// src/features/panels/workspace/note/components/DeleteModal.tsx
import {useEffect, useRef} from "react";

interface DeleteModalProps {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({count, onConfirm, onCancel}: DeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
      // 1. 배경
      <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">

        {/* 2. 모달 컨텐츠 박스 */}
        <div
            ref={modalRef}
            className="bg-background-300 border border-gray-700 w-[280px] p-5 rounded-xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        >
          <h3 className="text-text-1 font-bold text-lg mb-1">
            {count}개의 노트를
          </h3>
          <p className="text-text-1 font-bold text-lg mb-6">
            삭제하시겠습니까?
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-2 w-full">
            {/* 삭제 버튼 */}
            <button
                onClick={onConfirm}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              노트 삭제
            </button>

            {/* 취소 버튼 */}
            <button
                onClick={onCancel}
                className="w-full bg-transparent hover:bg-white/5 text-gray-400 py-3 rounded-lg transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
  );
}