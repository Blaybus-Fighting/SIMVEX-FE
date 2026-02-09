import api from "./axios";

// 공통 API 응답 형태
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

// 모델 객체
export interface ModelObject {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  mainTheory: string;
  usage: string;
}

// 모델 객체 목록
export const getModelObjects = async (): Promise<
  ApiResponse<ModelObject[]>
> => {
  const { data } = await api.get<ApiResponse<ModelObject[]>>("/model-objects");
  return data;
};

export default {
  getModelObjects,
};
