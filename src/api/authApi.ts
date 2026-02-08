// src/api/authApi.ts
import { api } from "./axios";
import type { AuthResponse } from "../types/auth";

// 1. 로그인 됐는지 확인하는 함수 (새로고침 할 때마다 실행)
export const getMyInfo = async () => {
    // 명세서: GET /api/auth/login
    const response = await api.get<AuthResponse>("/auth/login");
    return response.data;
};

// 2. 로그아웃 함수
export const logout = async () => {
    // 명세서: POST /api/auth/logout
    const response = await api.post("/auth/logout");
    return response.data;
};