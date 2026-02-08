// src/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import { getMyInfo, logout as apiLogout } from "@/api/authApi";
import { useUserStore } from "@/store/useUserStore";

export function useAuth() {
    const navigate = useNavigate();
    const { setUser, clearUser } = useUserStore();

    // 1. 앱 켜질 때 "나 로그인 됐니?" 확인하는 함수
    const initAuth = async () => {
        try {
            const res = await getMyInfo();
            if (res.isSuccess && res.data) {
                console.log("로그인 복구 성공:", res.data);
                setUser(res.data);
            }
        } catch (error) {
            console.error("로그인 체크 중 에러 발생:", error);
            clearUser();
        }
    };

    // 2. 로그아웃 핸들러
    const handleLogout = async () => {
        try {
            await apiLogout(); // 백엔드에 쿠키 삭제 요청
            clearUser();       // 프론트 상태 비우기
            alert("로그아웃 되었습니다.");
            navigate("/home"); // 메인으로 이동
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return { initAuth, handleLogout };
}