// 백엔드 통신을 위한 axios 인스턴스 설정 파일 (토큰 자동 첨부 & 에러 인터셉터 포함)
// 각 도메인 APi 호출 시 해당 'api' 변수 import 해서 사용해야 합니다.

// 로그인이 된 사용자용 axios
import axios from "axios";
import { triggerAuthErrorEvent } from "@/utils/authEvent";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  // 브라우저가 쿠키를 서버로 보냄
  withCredentials: true,
});

// 응답 인터셉터 (API 응답을 받고 나서 에러가 있으면 처리)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러(인증 실패/쿠키 만료)가 뜨면 로그아웃 처리
    if (error.response?.status === 401) {
      triggerAuthErrorEvent();
    }
    return Promise.reject(error);
  },
);

export default api;
