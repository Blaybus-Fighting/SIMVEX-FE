import {useState} from "react";
import {NoteList} from "./NoteList";
import {NoteEditor} from "./NoteEditor";
import type {Note} from "@/types/note";

// 임시 더미 데이터
const INITIAL_NOTES: Note[] = [
  {id: 1, title: "전공 수업", content: "탄소강의 열처리...", date: "1일 전"},
  {id: 2, title: "캡스톤 회의", content: "발표 자료 준비...", date: "2일 전"},
];

export function NoteTab() {
  const [view, setView] = useState<"LIST" | "EDITOR">("LIST");
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // 1. 노트 저장 핸들러
  // NoteEditor가 title과 content를 따로 보내주므로, 여기서 합쳐서 객체로 만들어야 함
  const handleSave = (title: string, content: string) => {
    if (editingNote) {
      // 수정 모드: 기존 노트 찾아서 업데이트
      setNotes((prev) => prev.map(n =>
          n.id === editingNote.id
              ? {...n, title, content, date: "방금 수정됨"}
              : n
      ));
    } else {
      // 생성 모드: 새 객체 만들기
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
        date: "방금 전"
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    // 목록으로 돌아가기
    setView("LIST");
    setEditingNote(null);
  };

  // 2. 노트 삭제 핸들러 (다중 삭제)
  const handleDelete = (ids: number[]) => {
    setNotes((prev) => prev.filter((n) => !ids.includes(n.id)));
  };

  // 3. 노트 클릭 핸들러
  const handleNoteClick = (note: Note) => {
    setEditingNote(note); // 수정할 노트 담기
    setView("EDITOR");    // 에디터 화면으로 이동
  };

  return (
      <div className="h-full relative overflow-hidden">
        {view === "LIST" ? (
            <NoteList
                notes={notes}
                onDelete={handleDelete}
                onWriteClick={() => {
                  setEditingNote(null); // 새 글 쓰기니까 초기화
                  setView("EDITOR");
                }}
                onNoteClick={handleNoteClick}
            />
        ) : (
            <NoteEditor
                initialData={editingNote}
                onSave={handleSave} // (title, content) 받는 함수로 교체됨
                onCancel={() => {
                  setView("LIST");
                  setEditingNote(null);
                }}
            />
        )}
      </div>
  );
}