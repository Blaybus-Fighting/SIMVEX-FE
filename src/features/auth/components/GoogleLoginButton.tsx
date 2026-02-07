// src/features/auth/components/GoogleLoginButton.tsx
import GoogleIcon from "@/assets/icons/google.svg?react";

export function GoogleLoginButton() {
    const handleLogin = () => {
        const apiUrl = import.meta.env.VITE_API_URL || "https://knowwhohow.site";

        // 2. '/api' 라는 글자를 제거해서 '서버 루트 주소' 만들기
        const serverRoot = apiUrl.replace(/\/api$/, "");

        // 명세서에 적힌 엔드포인트: /oauth2/authorization/google
        window.location.href = `${serverRoot}/oauth2/authorization/google`;
    };

    return (
        <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 text-gray-100 py-3 rounded-lg border border-gray-200transition-colors"
        >
            <GoogleIcon className="w-5 h-5" />
            <span className="font-medium text-sm">Google 계정으로 계속하기</span>
        </button>
    );
}