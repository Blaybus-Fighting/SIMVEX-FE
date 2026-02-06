import LandingBanner from "@/components/ui/LandingBanner";
import ArrowDownWard from "@assets/icons/arrow_downward.svg?react";

export default function LandingPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* 제목과 부제목 */}
      <div className="flex flex-1 flex-col items-center gap-6 pt-20">
        <h1 className="text-gray-100 text-title-1">
          학습을 새롭게, <br /> 기계 구조부터 AI 학습 보조까지
        </h1>
        <h3 className="text-gray-200 text-title-3">
          3D 시뮬레이션 학습 솔루션
        </h3>
        {/* 바로 학습하기 버튼 */}
        <button className="flex items-center justify-center w-[11.875rem] bg-primary-200 gap-1 py-[0.813rem] rounded-lg mt-11">
          <a className="text-gray-100 text-text-1 font-semibold">
            바로 학습하기
          </a>
          <ArrowDownWard />
        </button>
      </div>
      <LandingBanner />
    </div>
  );
}
