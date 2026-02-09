// src/api/authApi.ts
import { api } from "./axios";

// 로그아웃 함수
export const logout = async () => {
  // 명세서: POST /api/auth/logout
  const response = await api.post("/api/auth/logout");
  return response.data;
};
