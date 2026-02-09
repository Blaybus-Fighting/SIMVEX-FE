// 로그인용 axios.ts
import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.AUTH_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
