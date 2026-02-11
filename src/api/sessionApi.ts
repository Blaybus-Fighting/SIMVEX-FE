import type { sessionResponse, ViewData } from "@/types/session";
import api from "./axios";

// 세션 업데이트
export const putSession = async (
  modelId: number,
  sessionId: number,
  viewData: ViewData,
): Promise<sessionResponse> => {
  const { data } = await api.put(`/api/models/${modelId}/session`, {
    sessionId: sessionId,
    viewData: JSON.stringify(viewData), // JSON 문자열로 직렬화해서 전달
  });
  return data;
};

// 세션 조회
export const getSession = async (modelId: number): Promise<sessionResponse> => {
  const { data } = await api.get(`/api/models/${modelId}/session`);
  return data;
};
