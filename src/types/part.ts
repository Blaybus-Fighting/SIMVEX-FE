import type { ApiResponse } from "@/api/partApi";

// 부품 객체 응답
export interface PartObject {
  id: number;
  name: string;
  material: string;
  roleDescription: string;
  modelUrl: string;
  localCoordinates: string;
}

// 부품 리스트와 상세 부품 응답 객체 타입
export type PartListResponse = ApiResponse<PartObject[]>;
export type partResponse = ApiResponse<PartObject>;
