import { useEffect, useState } from "react";
import { NoteList } from "./NoteList";
import { NoteEditor } from "./NoteEditor";
import type { MemoDto, Note } from "@/types/note";
import { createNote, deleteNote, getNotes, updateNote } from "@/api/noteApi";

interface NoteTabProps {
  sessionId: number; // 부모 컴포넌트(WorkspacePanel)에서 넘겨줘야 함
}

export function NoteTab({sessionId}: NoteTabProps) {
  const [view, setView] = useState<"LIST" | "EDITOR">("LIST");
  const [notes, setNotes] = useState<Note[]>([]); // 초기값 빈 배열
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // 1. 노트 목록 불러오기 (API)
  const fetchNotes = async () => {
    if (!sessionId) return;
    try {
      const res = await getNotes(sessionId);
      if (res.isSuccess && res.data) {
        // 서버 데이터(MemoDto) -> 프론트 데이터(Note) 변환
        const parsedNotes: Note[] = res.data.map((memo: MemoDto) => {
          let title = "제목 없음";
          let content = "";

          try {
            // content에 JSON 문자열({ title, content })이 들어있다고 가정하고 파싱
            const parsed = JSON.parse(memo.content);
            title = parsed.title || "제목 없음";
            content = parsed.content || "";
          } catch (e) {
            // 파싱 실패시(예전 데이터 등) 그냥 전체를 내용으로
            content = memo.content;
          }

          return {
            id: memo.id,
            title: title,
            content: content,
            // 날짜 포맷팅 (예: 2024. 02. 05.)
            date: new Date(memo.createdAt).toLocaleDateString(),
          };
        });

        // 최신순 정렬
        setNotes(parsedNotes.sort((a, b) => b.id - a.id));
      }
    } catch (error) {
      console.error("노트 목록 로드 실패:", error);
    }
  };

  // 세션 ID가 바뀌면 목록 다시 불러오기
  useEffect(() => {
    fetchNotes();
  }, [sessionId]);

  // 2. 노트 저장 핸들러 (생성 & 수정)
  const handleSave = async (title: string, content: string) => {
    // 백엔드에는 title 필드가 없으므로, content에 JSON으로 묶어서 저장
    const payload = JSON.stringify({title, content});

    try {
      if (editingNote) {
        // [수정 모드] API 호출
        const res = await updateNote(editingNote.id, payload);
        if (res.isSuccess) await fetchNotes(); // 목록 갱신
      } else {
        // [생성 모드] API 호출
        const res = await createNote(sessionId, payload);
        if (res.isSuccess) await fetchNotes(); // 목록 갱신
      }

      // 목록 화면으로 복귀
      setView("LIST");
      setEditingNote(null);
    } catch (error) {
      console.error("노트 저장 실패:", error);
      alert("노트 저장 중 오류가 발생했습니다.");
    }
  };

  // 3. 노트 삭제 핸들러 (다중 삭제)
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