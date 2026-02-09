import { api } from "./axios";
import type { ChatListResponse } from "@/types/chat";

// 채팅 내역 조회 함수
export const getChatHistory = async (sessionId: number, page: number = 0) => {

  const response = await api.get<ChatListResponse>(
    `/api/chat/${sessionId}/messages?page=${page}`
  );

  return response.data;
};