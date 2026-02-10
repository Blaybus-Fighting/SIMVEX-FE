import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "@/features/auth/components/LoginModal";

export default function UserMenu() {
  const {user, isLoggedIn, logout} = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center" ref={menuRef}>
        {isLoggedIn && user ? (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            >
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* 드롭다운 메뉴 */}
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-200 hover:bg-primary-100 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            로그인
          </button>
        )}
      </div>

      {/* 로그인 모달 (여기서 관리) */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
}