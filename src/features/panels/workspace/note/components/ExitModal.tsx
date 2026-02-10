import {useEffect, useRef} from "react";

// import CloseIcon from "@/assets/icons/close.svg?react";

interface ExitModalProps {
  onConfirm: () => void; // 나가기 (저장 안 함)
  onCancel: () => void;  // 취소 (계속 작성)
}

export function ExitModal({onConfirm, onCancel}: ExitModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기
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
      <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">
        <div
            ref={modalRef}
            className="relative bg-background-300 border border-gray-700 w-[280px] p-5 rounded-xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        >
          {/* 우상단 닫기(X) 버튼 */}
          <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          >
            ✕ {/* <CloseIcon className="w-4 h-4" /> */}
          </button>

          {/* 텍스트 내용 */}
          <div className="mt-2 mb-6">
            <p className="text-text-1 text-lg font-bold leading-relaxed">
              변경된 내용이 저장되지 않았습니다.<br/>
              노트를 나가시겠습니까?
            </p>
          </div>

          {/* 나가기 버튼 (붉은색) */}
          <button
              onClick={onConfirm}
              className="w-full bg-[#DB3847] hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors mb-2"
          >
            나가기
          </button>
        </div>
      </div>
  );
}