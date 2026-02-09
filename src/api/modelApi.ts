import { api } from "./axios";
import type { ModelListResponse, ModelDetailResponse } from "@/types/model";

export interface ApiError {
  code: string;
  message: string;
}

// 공통 API 응답값 형태
export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  error?: ApiError | null;
}

// 모델 객체 목록
export const getModelObjects = async (): Promise<ModelListResponse> => {
  const { data } = await api.get<ModelListResponse>("/model-objects");
  return data;
};

// 모델 객체 상세 조회
export const getDetailModel = async (
  id: number,
): Promise<ModelDetailResponse> => {
  const { data } = await api.get<ModelDetailResponse>(`/model-objects/${id}`);
  return data;
};

export default {
  getModelObjects,
  getDetailModel,
};
