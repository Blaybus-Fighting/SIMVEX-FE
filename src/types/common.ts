// 프로젝트 전반에서 쓰이는 공통 타입 정의 파일 (API 응답 규격, 유저 타입 등)
// 특정 도메인(Feature)에만 종속된 타입은 해당 features 폴더 내에 정의해주세요.

// 백엔드 공통 응답 규격
// 1. 에러가 났을 때만 오는 데이터 모양
export interface ApiError {
  code: string;
  message: string;
}

// 2. 공통 응답 껍데기
export interface ApiResponse<T> {
  isSuccess: boolean;

  // 성공하면 데이터가 있고, 실패하면 null일 수 있음
  data: T | null;

  // 물음표(?)를 붙이면 "이 필드는 있을 수도 있고 없을 수도 있다"는 뜻
  error?: ApiError;
}

// 유저 타입 예시
export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
}