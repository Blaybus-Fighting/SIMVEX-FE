import { useCallback, useEffect, useState } from "react";
import { NoteList } from "./NoteList";
import { NoteEditor } from "./NoteEditor";
import type { MemoDto, Note } from "@/types/note";
import { createNote, deleteNote, getNotes, updateNote } from "@/api/noteApi";

interface NoteTabProps {
  sessionId: number; // = modelId (기계 ID)
}

export function NoteTab({sessionId}: NoteTabProps) {
  const [view, setView] = useState<"LIST" | "EDITOR">("LIST");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // 1. 노트 목록 불러오기
  // useCallback으로 감싸서 무한 재실행을 막습니다.
  const fetchNotes = useCallback(async () => {
    // 0번(초기값)이거나 ID가 없으면 요청 안 함
    if (!sessionId) return;

    try {
      const res = await getNotes(sessionId);
      if (res.isSuccess && res.data) {
        // 백엔드 데이터(MemoDto) -> 프론트 데이터(Note) 변환
        const parsedNotes: Note[] = res.data.map((memo: MemoDto) => {
          let title = "제목 없음";
          let content = "";

          try {
            // content 안에 { title, content }가 JSON으로 들어있다고 가정
            const parsed = JSON.parse(memo.content);
            title = parsed.title || "제목 없음";
            content = parsed.content || "";
          } catch {
            // JSON 파싱 실패 시(예전 데이터) 내용 전체를 보여줌
            content = memo.content;
          }

          return {
            id: memo.id,
            title: title,
            content: content,
            // 날짜 포맷팅
            date: new Date(memo.createdAt).toLocaleDateString(),
          };
        });

        // 최신순 정렬 (ID 내림차순)
        setNotes(parsedNotes.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("노트 목록 로드 실패:", error);
    }
  }, [sessionId]);

  // 2. 초기 로딩 및 sessionId 변경 시 목록 갱신
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // 3. 노트 저장 (생성/수정)
  const handleSave = async (title: string, content: string) => {
    // 백엔드는 content 필드 하나뿐이므로, title과 묶어서 JSON으로 저장
    const payload = JSON.stringify({title, content});

    try {
      if (editingNote) {
        // 수정
        const res = await updateNote(editingNote.id, payload);
        if (res.isSuccess) await fetchNotes();
      } else {
        // 생성 (sessionId = modelId)
        const res = await createNote(sessionId, payload);
        if (res.isSuccess) await fetchNotes();
      }

      // 저장 후 목록으로 이동
      setView("LIST");
      setEditingNote(null);
    } catch (error) {
      console.error("노트 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 4. 노트 삭제
  const handleDelete = async (ids: number[]) => {
    try {
      await Promise.all(ids.map((id) => deleteNote(id)));
      await fetchNotes(); // 삭제 후 목록 갱신
    } catch (error) {
      console.error("노트 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 5. 노트 클릭 (수정 모드 진입)
  const handleNoteClick = (note: Note) => {
    setEditingNote(note);
    setView("EDITOR");
  };

  return (
    <div className="h-full relative overflow-hidden">
      {view === "LIST" ? (
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onWriteClick={() => {
            setEditingNote(null);
            setView("EDITOR");
          }}
          onNoteClick={handleNoteClick}
        />
      ) : (
        <NoteEditor
          initialData={editingNote}
          onSave={handleSave}
          onCancel={() => {
            setView("LIST");
            setEditingNote(null);
          }}
        />
      )}
    </div>
  );
}