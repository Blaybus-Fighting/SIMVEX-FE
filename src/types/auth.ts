// src/types/auth.ts
import type { ApiResponse } from "./common";

// 백엔드가 주는 유저 정보
export interface AuthUser {
    userName: string;
    userEmail: string;
    userProfileImage: string;
}

// 로그인 여부 확인용 응답 껍데기 (성공 시 이 안에 AuthUser가 들어옴)
export type AuthResponse = ApiResponse<AuthUser>;