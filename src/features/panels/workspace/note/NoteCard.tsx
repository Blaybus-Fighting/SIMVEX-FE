// src/features/panels/workspace/note/NoteCard.tsx
import {cn} from "@/utils/cn";
import type {Note} from "@/types/note";

interface NoteCardProps {
  note: Note;
  isEditMode: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function NoteCard({note, isEditMode, isSelected, onClick}: NoteCardProps) {
  return (
      <div
          onClick={onClick}
          className={cn(
              "bg-background-300 rounded-lg p-5 cursor-pointer border transition-all text-left w-full relative overflow-hidden",
              // 선택되었을 때 스타일
              isSelected
                  ? "border-primary-100 bg-primary-100/10"
                  : "border-transparent hover:border-gray-600",
              isEditMode && "select-none"
              // 편집 모드일 때 흔들리거나 하는 효과를 줄 수도 있음
          )}
      >
        {/* 편집 모드 & 선택됨 -> 체크 아이콘 등 표시 가능 */}

        <p className="text-text-4 text-gray-400 mb-4 line-clamp-3 h-[4.5em]">
          {note.content}
        </p>
        <h3 className={cn(
            "font-pb mb-1 truncate",
            isSelected ? "text-primary-100" : "text-gray-100" // 선택시 제목 색상 변경 등
        )}>
          {note.title}
        </h3>
        <span className="text-caption text-gray-400">
        {note.date}
      </span>
      </div>
  );
}