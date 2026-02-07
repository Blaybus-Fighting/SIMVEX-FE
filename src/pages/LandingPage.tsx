import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingBanner from "@/components/ui/LandingBanner";
import ArrowDownWard from "@assets/icons/arrow_downward.svg?react";

import { useUserStore } from "@/store/useUserStore";
import { LoginModal } from "@/features/auth/components/LoginModal";

export default function LandingPage() {
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogin } = useUserStore(); // 로그인 상태 가져오기

  // 버튼 클릭 핸들러
  const handleStartClick = () => {
    if (isLogin) {
      console.log("로그인 상태임 -> 학습 페이지로 이동");
      navigate("/study");
    } else {
      console.log("비로그인 상태임 -> 모달 열기");
      setIsModalOpen(true);
      setTimeout(() => {  // 로그인 완료되면 해당 부분 고치기
        setIsModalOpen(false);

        navigate("/study");
      }, 1500); // 1500 = 1.5초
    }
  };

  return (
      <div className="flex h-full flex-col overflow-hidden relative">
        <div className="flex flex-1 flex-col items-center gap-6 pt-20">
          <h1 className="text-gray-100 text-title-1 font-medium">
            학습을 새롭게, <br /> 기계 구조부터 AI 학습 보조까지
          </h1>
          <h3 className="text-gray-200 text-title-3">
            3D 시뮬레이션 학습 솔루션
          </h3>

          {/* onClick 이벤트 연결 */}
          <button
              onClick={handleStartClick}
              className="flex items-center justify-center w-[11.875rem] bg-primary-200 gap-1 py-[0.813rem] rounded-lg mt-11 hover:bg-primary-100 transition-colors"
          >
            <p className="text-gray-100 text-text-1 font-semibold">
              바로 학습하기
            </p>
            <ArrowDownWard />
          </button>
        </div>
        <LandingBanner />

        {/* 로그인 모달 (조건부 렌더링이 아닌, 상태로 제어) */}
        <LoginModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
      </div>
  );
}
