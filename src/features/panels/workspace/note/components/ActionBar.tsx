// src/features/panels/workspace/note/components/ActionBar.tsx
import CheckIcon from "@/assets/icons/check.svg?react";

interface ActionBarProps {
  selectedCount: number;
  onExport: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function ActionBar({selectedCount, onExport, onDelete, onClose}: ActionBarProps) {
  return (
      <div className="flex items-center justify-between mb-4 px-1 animate-in slide-in-from-top-2 duration-200">
        {/* 왼쪽: 선택된 개수 */}
        <span className="text-text-1 text-sm font-medium">
        {selectedCount}개의 노트가 선택됨
      </span>

        {/* 오른쪽: 액션 버튼들 */}
        <div className="flex items-center gap-3">
          <button
              onClick={onExport}
              className="text-gray-400 hover:text-text-1 text-sm transition-colors"
          >
            내보내기
          </button>

          <button
              onClick={onDelete}
              disabled={selectedCount === 0}
              className="text-red-400 hover:text-red-300 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            삭제
          </button>

          {/* 완료(체크) 버튼 */}
          <button
              onClick={onClose}
              className="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
          >
            <CheckIcon className="w-3 h-3 text-white"/>
          </button>
        </div>
      </div>
  );
}