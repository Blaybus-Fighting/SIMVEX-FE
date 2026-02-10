// src/api/noteApi.ts
import api from "@/api/axios";
import type { ApiResponse } from "@/types/common";
import type { MemoDto } from "@/types/note";

type NoteDto = MemoDto;

// 1. 노트 생성
export const createNote = async (sessionId: number, content: string) => {
  // 백엔드 주소는 명세서대로 /memos 유지 (백엔드도 바꿨다면 /notes로 수정하세요)
  const response = await api.post<ApiResponse<number>>("/memos", {
    sessionId,
    content,
  });
  return response.data;
};

// 2. 노트 조회
export const getNotes = async (sessionId: number) => {
  const response = await api.get<ApiResponse<NoteDto[]>>("/memos", {
    params: {sessionId},
  });
  return response.data;
};

// 3. 노트 수정
export const updateNote = async (noteId: number, content: string) => {
  const response = await api.patch<ApiResponse<null>>(`/memos/${noteId}`, {
    content,
  });
  return response.data;
};

// 4. 노트 삭제
export const deleteNote = async (noteId: number) => {
  const response = await api.delete<ApiResponse<null>>(`/memos/${noteId}`);
  return response.data;
};