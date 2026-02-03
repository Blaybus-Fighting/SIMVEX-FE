// 프로젝트 전반에서 쓰이는 공통 타입 정의 파일 (API 응답 규격, 유저 타입 등)
// 특정 도메인(Feature)에만 종속된 타입은 해당 features 폴더 내에 정의해주세요.

// 백엔드 공통 응답 규격 (예시)
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// 유저 타입 예시
export interface User {
    id: number;
    email: string;
    name: string;
    profileImage?: string;
}