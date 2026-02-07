// src/types/chat.ts
import type { ApiResponse } from "./common";

// 1. 채팅 역할 (백엔드: USER, ASSISTANT)
export type ChatRole = "USER" | "ASSISTANT";

// 2. 메시지 객체 (채팅 내역 조회 시 오는 데이터)
export interface ChatMessageDto {
  chatRole: ChatRole;
  message: string;
  timestamp: string;
}

// 3. 채팅 내역 페이징 응답 (Pageable)
export interface ChatHistoryResponse {
  content: ChatMessageDto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    last: boolean;
    // 필요한 다른 필드들이 있다면 추가
  };
  last: boolean; // 마지막 페이지 여부
}

// 4. 스트리밍(SSE) 청크 데이터
export interface StreamChunk {
  type: "connect" | "chunk" | "done"; // 백엔드가 주는 type
  message: string;
  sequence?: number;
  // done일 때는 아래 필드들이 추가로 옴
  chatRole?: ChatRole;
  timestamp?: string;
}

export type ChatListResponse = ApiResponse<ChatHistoryResponse>;