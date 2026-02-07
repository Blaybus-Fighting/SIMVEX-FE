// src/features/auth/components/GoogleLoginButton.tsx
import GoogleIcon from "@/assets/icons/google.svg?react";

export function GoogleLoginButton() {
    const handleLogin = () => {
        const loginBaseUrl = import.meta.env.VITE_LOGIN_URL;
        window.location.href = `${loginBaseUrl}/oauth2/authorization/google`;
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