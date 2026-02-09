// src/features/panels/workspace/note/NoteList.tsx
import { useState } from "react";
import type { Note } from "@/types/note";
import { NoteCard } from "./NoteCard";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { SearchBar } from "@/features/panels/workspace/note/components/SearchBar.tsx";

interface NoteListProps {
  notes: Note[];
  onDelete: (ids: number[]) => void;
  onWriteClick: () => void;
  onNoteClick: (note: Note) => void;
}

export function NoteList({notes, onDelete, onWriteClick}: NoteListProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 검색 필터링
  const filteredNotes = notes.filter((n) =>
    n.title.includes(searchQuery) || n.content.includes(searchQuery)
  );

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds([]); // 모드 끌 때 선택 초기화
  };

  // 카드 선택 핸들러
  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <>
      {/* 1. 상단 헤더 영역 (검색창 + 편집 버튼) */}
      <div className="flex items-end justify-between px-1 mb-4 gap-4">

        {/* 검색창 영역 (남은 공간 다 차지) */}
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="노트 이름, 내용 검색"
            disabled={isEditMode}
          />
        </div>

        {/* 편집 버튼 (검색창 높이에 맞춰서 살짝 띄움) */}
        <button
          onClick={toggleEditMode}
          className="text-primary-100 font-bold text-text-2 hover:text-primary-200 shrink-0 pb-3" // pb-3로 검색창 텍스트 라인과 높이 맞춤
        >
          {isEditMode ? "취소" : "편집"}
        </button>
      </div>

      {/* 상단 액션 바 (편집 모드일 때만 등장) */}
      {isEditMode && (
        <div className="flex justify-between items-center mb-4 px-1 animate-in slide-in-from-top-2">
          <span className="text-white text-sm">{selectedIds.length}개의 노트 선택됨</span>
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-white">내보내기</button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-400 hover:text-red-300"
              disabled={selectedIds.length === 0}
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 노트 그리드 */}
      <div className="overflow-y-auto h-full pb-20 scrollbar-hide">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center mt-20">
            <p className="text-text-1 text-white font-medium mb-1">
              검색 결과가 없어요.
            </p>
            <p className="text-text-3 text-gray-400">
              입력한 내용을 다시 확인해 주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isEditMode={isEditMode}
                isSelected={selectedIds.includes(note.id)}
                onClick={() => {
                  if (isEditMode) handleSelect(note.id);
                  else { /* 상세보기 로직 */
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 글쓰기 버튼 (편집 모드 아닐 때만 노출) */}
      {!isEditMode && <FloatingButton onClick={onWriteClick}/>}

      {/* 삭제 모달 (조건부 렌더링) */}
      {showDeleteModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          {/* 모달 UI 구현 */}
          <div className="bg-background-300 p-6 rounded-lg text-center">
            <p className="text-white mb-4">{selectedIds.length}개의 노트를 삭제하시겠습니까?</p>
            <button onClick={() => {
              onDelete(selectedIds);
              setShowDeleteModal(false);
              setIsEditMode(false);
            }} className="bg-red-500 text-white px-4 py-2 rounded">삭제
            </button>
            {/* 취소 버튼... */}
          </div>
        </div>
      )}
    </>
  );
}