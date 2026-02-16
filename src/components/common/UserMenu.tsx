import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "@/features/auth/components/LoginModal";
import LogoutIcon from "@assets/icons/logout.svg?react";

export default function UserMenu() {
  const { user, isLoggedIn, logout } = useAuthStore();
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
    setIsMenuOpen(false); // 메뉴 닫기
    navigate("/");
  };

  // 프로필 이미지가 없을 때 보여줄 이니셜 (예: 홍길동 -> 홍)
  const initial = user?.name ? user.name.charAt(0) : "U";

  return (
    <>
      <div className="flex items-center relative" ref={menuRef}>
        {isLoggedIn && user ? (
          <div>
            {/* 프로필 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              {user.profileImage ? (
                // 이미지 있을 때: 테두리 없이 깔끔하게
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                // 이미지 없을 때 (기본 프사): 회색 배경 + 글자
                <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center text-white font-medium">
                  {initial}
                </div>
              )}
            </button>

            {/* 드롭다운 메뉴 */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-black border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {/* 1. 유저 정보 영역 */}
                <div className="px-4 py-4 border-b border-gray-700">
                  <p className="text-base font-bold text-white mb-0.5">
                    {user.name}
                  </p>
                  {/* 필요하다면 이메일 등 추가 정보 표시 */}
                </div>

                {/* 2. 로그아웃 버튼 */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-100 hover:bg-gray-900 transition-colors flex items-center gap-2"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-200 hover:bg-primary-100 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary-200/20"
          >
            로그인
          </button>
        )}
      </div>

      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
