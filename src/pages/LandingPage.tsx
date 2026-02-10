import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LandingBanner from "@/components/ui/LandingBanner";
import ArrowDownWard from "@assets/icons/arrow_downward.svg?react";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { useAuthStore } from "@/store/authStore";
import Logo from "@assets/icons/logo.svg?react";
import api from "@/api/axios";
import HeaderFrame from "@/components/layout/HeaderFrame";
import UserMenu from "@/components/common/UserMenu";

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // URL 파라미터 훅
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태 구독

  const [isModalOpen, setIsModalOpen] = useState(false);

// 1. 로그인 프로세스 (티켓 교환)
  useEffect(() => {
    // URL에서 ticket 값을 찾습니다.
    const ticket = searchParams.get("ticket");

    // 티켓이 없으면 아무것도 안 함 (그냥 랜딩페이지 접속한 경우)
    if (!ticket) return;

    // 중복 호출 방지 (잠금)
    const lockKey = `exchange_lock_${ticket}`;
    if (sessionStorage.getItem(lockKey)) return;
    sessionStorage.setItem(lockKey, "1");

    (async () => {
      try {
        console.log("🎟️ 티켓 발견! 교환 시작:", ticket);

        // 티켓으로 진짜 토큰 받아오기
        const res = await api.post("/auth/exchange", {ticket});

        if (res.status === 200 && res.data.data) {
          const {accessToken, user} = res.data.data;

          console.log("✅ 로그인 성공! 유저 정보:", user);

          // 스토어에 저장 (이제 헤더에 프로필 뜸)
          login(accessToken, user);

          // URL에 남은 티켓 파라미터 지우기 (깔끔하게)
          navigate("/", {replace: true});
        }
      } catch (e) {
        console.error("🚨 토큰 교환 실패:", e);
        // 실패하면 그냥 조용히 실패 처리 (재로그인 유도)
      } finally {
        sessionStorage.removeItem(lockKey);
      }
    })();
  }, [searchParams, navigate, login]); // 의존성 배열 수정

  // 2. 학습하기 버튼 클릭 핸들러
  const handleStartClick = () => {
    // 스토어 상태를 보고 판단
    if (isLoggedIn) {
      navigate("/asset");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    // 전체 배경색 설정
    <div className="flex flex-col w-full h-screen bg-[#0f172a] overflow-hidden relative">

      {/* 1. 헤더 조립 */}
      <HeaderFrame className="bg-transparent border-none text-white z-50">
        {/* 왼쪽: 로고 + 서비스명 */}
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-30 h-30"/>
          <span className="text-xl font-bold text-gray-800">MY ASSETS</span>
        </Link>

        {/* 오른쪽: 유저 메뉴 (로그인/프로필) */}
        <UserMenu/>
      </HeaderFrame>

      {/* 2. 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col items-center w-full relative z-10">
        <div className="flex flex-1 flex-col items-center gap-6 pt-20">
          <h1 className="text-gray-100 text-title-1 font-medium">
            학습을 새롭게, <br/> 기계 구조부터 AI 학습 보조까지
          </h1>
          <h3 className="text-gray-200 text-title-3">
            3D 시뮬레이션 학습 솔루션
          </h3>

          <button
            onClick={handleStartClick}
            className="flex items-center justify-center w-[11.875rem] bg-primary-200 gap-1 py-[0.813rem] rounded-lg mt-11 hover:bg-primary-100 transition-colors"
          >
            <span className="text-gray-100 text-text-1 font-semibold">바로 학습하기</span>
            <ArrowDownWard className="w-5 h-5 animate-bounce"/>
          </button>
        </div>

        {/* 배너/배경 요소 */}
        <div className="w-full flex-1 mt-10">
          <LandingBanner/>
        </div>
      </main>

      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}