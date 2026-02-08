// src/features/panels/workspace/note/NoteList.tsx
import {useState} from "react";
import type {Note} from "@/types/note";
import {NoteCard} from "./NoteCard";
import {FloatingButton} from "@/components/ui/FloatingButton";

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
        {/* 상단 헤더 (검색 & 편집 버튼) */}
        <div className="flex justify-between items-center mb-3 shrink-0 px-1">
          {/* 검색창 컴포넌트로 분리 가능 */}
          <div className="relative flex-1 mr-4">
            {/* 검색 UI 구현 (SearchIcon input 등) */}
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEditMode ? "" : "노트 검색"}
                className="bg-transparent text-white w-full outline-none"
                disabled={isEditMode} // 편집 중엔 검색 막기 (선택사항)
            />
          </div>

          <button
              onClick={toggleEditMode}
              className="text-primary-100 font-medium hover:text-primary-200"
          >
            {isEditMode ? "완료" : "편집"}
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
              // 검색 결과 없음 UI
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <p>검색 결과가 없어요.</p>
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