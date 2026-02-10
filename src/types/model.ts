import type { ApiResponse } from "@/api/modelApi";

/**
 * model.ts
 *
 * 모델(3D) 도메인에서 사용하는
 * 모델 타입 및 상수 정의 파일
 *
 * - MODEL_NAMES: 허용되는 모델 이름 목록
 * - ModelType: MODEL_NAMES로부터 나온 모델 타입
 */

export const MODEL_NAMES = [
  "Robot-Gripper",
  "Suspension",
  "Machine-Vice",
  "V4-Engine",
] as const;

export type ModelType = (typeof MODEL_NAMES)[number];

// 모델 객체
export interface ModelObject {
  id: number;
  sessionId: number;
  name: ModelType;
  description: string;
  thumbnailUrl: string;
  mainTheory: string;
  usage: string;
  viewData?: string;
}

// API 응답을 위한 타입 확장
export type ModelListResponse = ApiResponse<ModelObject[]>;
export type ModelDetailResponse = ApiResponse<ModelObject>;
