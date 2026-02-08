// src/features/auth/components/LoginModal.tsx
import { Modal } from "@/components/ui/Modal";
import { GoogleLoginButton } from "./GoogleLoginButton"; // 아까 만든 버튼

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center gap-3 py-2">
                <h2 className="text-2xl font-medium text-gray-100">로그인 또는 회원가입</h2>
                <p className="text-gray-200 text-sm text-center">
                    SIMVEX에서 나만의 공학 학습 솔루션을 만나보세요!
                </p>

                {/* 구글 로그인 버튼 컴포넌트 배치 */}
                <div className="w-full mt-12">
                    <GoogleLoginButton />
                </div>
            </div>
        </Modal>
    );
}