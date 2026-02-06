import { api } from "./axios";
import type { ApiResponse } from "@/types/common";
import type { ChatHistoryResponse } from "@/types/chat";

// 채팅 내역 조회 함수
// sessionId: 여기서 3을 고정하지 말고, 매개변수로 받습니다.
export const getChatHistory = async (sessionId: number, page: number = 0) => {

  // 예: sessionId가 3이면 -> GET /api/chat/3/messages?page=0 요청이 나감
  // 토큰은 axios.ts에서 자동으로 붙여주니까 신경 안 써도 됨!
  const response = await api.get<ApiResponse<ChatHistoryResponse>>(
    `/api/chat/${sessionId}/messages?page=${page}`
  );

  return response.data;
};