import { useCallback, useEffect, useState } from "react";
import { NoteList } from "./NoteList";
import { NoteEditor } from "./NoteEditor";
import type { MemoDto, Note } from "@/types/note";
import { createNote, deleteNote, getNotes, updateNote } from "@/api/noteApi";

interface NoteTabProps {
  sessionId: number;
}

export function NoteTab({sessionId}: NoteTabProps) {
  const [view, setView] = useState<"LIST" | "EDITOR">("LIST");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // 1. 노트 목록 불러오기 함수
  // useCallback을 써서, sessionId가 바뀔 때만 함수가 새로 만들어지도록 최적화
  const fetchNotes = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await getNotes(sessionId);
      if (res.isSuccess && res.data) {
        const parsedNotes: Note[] = res.data.map((memo: MemoDto) => {
          let title = "제목 없음";
          let content = "";

          try {
            const parsed = JSON.parse(memo.content);
            title = parsed.title || "제목 없음";
            content = parsed.content || "";
          } catch {
            // JSON 파싱 실패 시 예외 처리 (e 변수 생략)
            content = memo.content;
          }

          return {
            id: memo.id,
            title: title,
            content: content,
            date: new Date(memo.createdAt).toLocaleDateString(),
          };
        });

        // 최신순 정렬
        setNotes(parsedNotes.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("노트 목록 로드 실패:", error);
    }
  }, [sessionId]);

  // 세션 ID가 바뀌면 목록 다시 불러오기
  useEffect(() => {
    const loadData = async () => {
      await fetchNotes();
    };

    loadData();
  }, [fetchNotes]);

  // 2. 노트 저장 핸들러
  const handleSave = async (title: string, content: string) => {
    const payload = JSON.stringify({title, content});

    try {
      if (editingNote) {
        // 수정
        const res = await updateNote(editingNote.id, payload);
        if (res.isSuccess) await fetchNotes(); // 목록 갱신
      } else {
        // 생성
        const res = await createNote(sessionId, payload);
        if (res.isSuccess) await fetchNotes(); // 목록 갱신
      }

      // 목록 화면으로 복귀
      setView("LIST");
      setEditingNote(null);
    } catch (error) {
      console.error("노트 저장 실패:", error);
      alert("오류가 발생했습니다.");
    }
  };

  // 3. 노트 삭제 핸들러
  const handleDelete = async (ids: number[]) => {
    try {
      // 여러 개 삭제를 위해 Promise.all 사용
      await Promise.all(ids.map((id) => deleteNote(id)));
      // 삭제 후 목록 갱신
      await fetchNotes();
    } catch (error) {
      console.error("노트 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 4. 노트 클릭 핸들러
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
            setEditingNote(null); // 새 글 쓰기 초기화
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