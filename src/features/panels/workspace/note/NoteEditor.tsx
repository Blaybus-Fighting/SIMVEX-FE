import {useState} from "react";
import type {Note} from "@/types/note";
import {ExitModal} from "./components/ExitModal";
import CheckIcon from "@/assets/icons/check.svg?react";
import {cn} from "@/utils/cn";

interface NoteEditorProps {
  initialData: Note | null;
  onSave: (title: string, body: string) => void;
  onCancel: () => void;
}

export function NoteEditor({initialData, onSave, onCancel}: NoteEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [saveViewInfo, setSaveViewInfo] = useState(false); // 뷰 정보 저장 체크박스

  const [showExitModal, setShowExitModal] = useState(false);

  // 닫기 버튼 눌렀을 때 처리
  const handleClose = () => {
    // 내용이 변경되었으면 모달 띄우기
    const isChanged =
        title !== (initialData?.title || "") ||
        content !== (initialData?.content || "");

    if (isChanged) {
      setShowExitModal(true);
    } else {
      onCancel();
    }
  };

  return (
      <>
        <div className="flex flex-col h-full relative px-1 animate-in fade-in duration-200">

          {/* 상단 닫기 버튼 */}
          <button
              type="button"
              onClick={handleClose}
              className="absolute -top-1 right-0 text-gray-400 hover:text-white p-2 z-10"
          >
            ✕
          </button>

          {/* 제목 입력 */}
          <label className="text-text-2 text-gray-200 font-bold mb-2 mt-1 block">
            제목
          </label>
          <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background-300 border border-transparent focus:border-primary-100 p-3 rounded-lg text-white mb-6 outline-none transition-all placeholder:text-gray-500"
              placeholder="제목을 입력하세요"
          />

          {/* 내용 입력 */}
          <label className="text-text-2 text-gray-200 font-bold mb-2 block">
            내용
          </label>
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full flex-1 bg-background-300 border border-transparent focus:border-primary-100 p-3 rounded-lg text-white resize-none outline-none transition-all custom-scrollbar placeholder:text-gray-500 leading-relaxed"
              placeholder="내용을 입력하세요"
          />

          {/* 하단 옵션 및 저장 버튼 */}
          <div className="mt-4 pb-2">
            {/* 체크박스 커스텀 디자인 */}
            <button
                onClick={() => setSaveViewInfo(!saveViewInfo)}
                className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
              <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                  saveViewInfo
                      ? "bg-primary-200 border-primary-200"
                      : "bg-transparent border-gray-500 group-hover:border-gray-400"
              )}>
                {saveViewInfo && <CheckIcon className="w-3.5 h-3.5 text-white"/>}
              </div>
              <span className="text-sm text-gray-300 group-hover:text-gray-200">
              현재 뷰 정보(시점, 분해도 등)를 함께 저장합니다.
            </span>
            </button>

            <button
                onClick={() => onSave(title, content)}
                // 제목이나 내용이 없으면 비활성화할지 여부는 선택사항
                className="w-full bg-primary-200 hover:bg-primary-100 text-white font-bold py-3 rounded-lg transition-colors"
            >
              저장하기
            </button>
          </div>
        </div>

        {/* 나가기 확인 모달 */}
        {showExitModal && (
            <ExitModal
                onConfirm={onCancel} // 진짜 나가기 (저장 안 하고 닫기)
                onCancel={() => setShowExitModal(false)} // 모달만 닫기 (계속 작성)
            />
        )}
      </>
  );
}