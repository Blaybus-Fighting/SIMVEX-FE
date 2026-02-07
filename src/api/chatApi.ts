import { api } from "./axios";
import type { ChatListResponse } from "@/types/chat";

// 채팅 내역 조회 함수
export const getChatHistory = async (sessionId: number, page: number = 0) => {

  // 예: sessionId가 3이면 -> GET /api/chat/3/messages?page=0 요청이 나감
  const response = await api.get<ChatListResponse>(
    `/chat/${sessionId}/messages?page=${page}`
  );

  return response.data;
};