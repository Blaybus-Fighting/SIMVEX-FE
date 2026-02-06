// src/types/model.ts

// 1. 알맹이 데이터 (모델 1개의 정보)
export interface ModelObject {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  systemPrompt: string;
}

// 2. 서버 응답 껍데기 (isSuccess 포함)
export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
}