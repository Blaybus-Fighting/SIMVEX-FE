// 백엔드 통신을 위한 axios 인스턴스 설정 파일 (토큰 자동 첨부 & 에러 인터셉터 포함)
// 각 도메인 APi 호출 시 해당 'api' 변수 import 해서 사용해야 합니다.

import axios from "axios";
import { triggerAuthErrorEvent } from '@/utils/authEvent';

// 1. Axios 인스턴스 생성
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. 요청 인터셉터 (API 요청을 보내기 전에 가로채서 토큰을 포함시킴)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (API 응답을 받고 나서 에러가 있으면 처리)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // 401 에러(인증 실패)가 뜨면 토큰 삭제
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");

            triggerAuthErrorEvent();
        }
        return Promise.reject(error);
    }
);

export default api;