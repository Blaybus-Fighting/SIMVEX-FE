import { create } from 'zustand';

// 1. API 명세서에 맞춘 유저 타입 정의
interface User {
  id: number;
  name: string;
  profileImage: string;
}

// 2. 스토어 타입 정의
interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;

  // 액션 (함수들)
  login: (accessToken: string, user: User) => void;
  logout: () => void;
}

// 안전하게 파싱하는 헬퍼 함수
const safelyParseUser = (str: string | null) => {
  if (!str || str === "undefined" || str === "null") return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("유저 정보 파싱 에러:", e);
    return null;
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: sessionStorage.getItem('accessToken'),

  // [수정] 안전하게 파싱하도록 변경
  user: safelyParseUser(sessionStorage.getItem('user')),

  isLoggedIn: !!sessionStorage.getItem('accessToken'),

  login: (accessToken, user) => {
    sessionStorage.setItem('accessToken', accessToken);
    // 객체를 문자열로 변환해서 저장
    sessionStorage.setItem('user', JSON.stringify(user));

    set({accessToken, user, isLoggedIn: true});
  },

  logout: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    set({accessToken: null, user: null, isLoggedIn: false});
  },
}));