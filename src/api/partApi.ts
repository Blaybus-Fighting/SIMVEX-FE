import type { PartListResponse, partResponse } from "@/types/part";
import { api } from "./axios";

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

// 부품 조회
export const getPartList = async (
  modelId: number,
): Promise<PartListResponse> => {
  const { data } = await api.get<PartListResponse>("/parts", {
    // 요청값
    params: {
      modelId,
    },
  });
  return data;
};

// 모델 객체 상세 조회
export const getPart = async (partId: number): Promise<partResponse> => {
  const { data } = await api.get<partResponse>(`/model-objects/${partId}`);
  return data;
};

export default {
  getPartList,
  getPart,
};
