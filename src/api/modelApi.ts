import { api } from "./axios";
import { ApiResponse } from "@/types/common"; // 공통 타입
import { ModelObject } from "@/types/model"; // 모델 데이터 타입

// GET: 모델 리스트 조회
export const getModelList = async () => {
  // 결과: ApiResponse<ModelObject[]>
  const response = await api.get<ApiResponse<ModelObject[]>>("/model-objects");
  return response.data;
};

// GET: 모델 상세 조회
export const getModelDetail = async (id: number) => {
  // 결과: ApiResponse<ModelObject>
  const response = await api.get<ApiResponse<ModelObject>>(`/model-objects/${id}`);
  return response.data;
};