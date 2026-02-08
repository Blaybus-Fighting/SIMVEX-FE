// src/types/note.ts

// 백엔드에서 주는 원본 데이터 모양
export interface MemoDto {
    id: number;
    sessionId: number;
    content: string; // 여기에 JSON 문자열이 들어감
    createdAt: string;
    updatedAt: string;
}

// 화면에서 쓸 데이터 모양 (파싱 후)
export interface Note {
    id: number;
    title: string;
    content: string; // 실제 본문
    date: string;
}