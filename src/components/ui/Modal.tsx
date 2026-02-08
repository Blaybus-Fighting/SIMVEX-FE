// src/components/ui/Modal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    // ESC 키로 닫기
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    // React Portal을 사용해 body 바로 아래에 렌더링 (z-index 문제 해결)
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 1. 검은색 반투명 배경 */}
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 2. 실제 모달 내용 (가운데 정렬) */}
            <div className="relative bg-background-200 rounded-xl shadow-lg p-20 animate-in fade-in zoom-in duration-200">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-300 hover:text-white"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
}