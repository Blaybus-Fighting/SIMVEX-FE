import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingBanner from "@/components/ui/LandingBanner";
import ArrowDownWard from "@assets/icons/arrow_downward.svg?react";

import { LoginModal } from "@/features/auth/components/LoginModal";
import api from "@/api/axios";

export default function LandingPage() {
  const navigate = useNavigate();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 티켓으로 accessToken 가져오기
  useEffect(() => {
    const ticket = sessionStorage.getItem("oauth_ticket");
    if (!ticket) return;

    // dev StrictMode 2번 실행 방지
    const lockKey = `exchange_lock_${ticket}`;
    if (sessionStorage.getItem(lockKey)) return;
    sessionStorage.setItem(lockKey, "1");

    (async () => {
      try {
        const res = await api.post<{ accessToken: string }>("/auth/exchange", {
          ticket,
        });
        console.log("응닶값: ", res);
        sessionStorage.setItem("accessToken", res.data.accessToken);

        // ticket은 accessToken 받으면 무조건 지워야 함
        sessionStorage.removeItem("oauth_ticket");
        // lock도 정리
        sessionStorage.removeItem(lockKey);

        navigate("/home", { replace: true });
      } catch (e) {
        console.error("exchange 실패:", e);
        sessionStorage.removeItem("oauth_ticket");
        sessionStorage.removeItem(lockKey);
      }
    })();
  }, [navigate]);

  const handleStartClick = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      console.log("로그인 상태임 -> 학습 페이지로 이동");
      navigate("/study");
    } else {
      console.log("비로그인 상태임 -> 모달 열기");
      setIsModalOpen(true);
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

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
