import { useState } from "react";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizModal from "@/components/quiz/QuizModal";

type Machine = {
  id: string;
  name: string;
};

const MACHINES: Machine[] = [
  { id: "machine-vice", name: "공작 기계 바이스" },
  { id: "suspension", name: "서스펜션 시스템" },
  { id: "v4", name: "V4 엔진" },
  { id: "robot", name: "로봇 집게" },
];

export default function QuizPage() {
  const [open, setOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  return (
    <div className="min-h-screen bg-background-400">
      {/* ✅ 퀴즈 전용 헤더 */}
      <QuizHeader />

      {/* ===== 본문 ===== */}
      <main className="mx-auto max-w-[1440px] px-10 pt-32 pb-24">
        {/* ✅ 상단 문구: 왼쪽 정렬 (요청사항) */}
        <div className="mb-14 text-left">
          <h1 className="text-white text-[34px] font-semibold">
            Quiz
          </h1>
          <p className="mt-3 text-gray-300 text-[18px]">
            기계를 선택해서 학습 이해도를 점검해보세요!
          </p>
        </div>

        {/* ===== 기계 카드 ===== */}
        <div className="grid grid-cols-4 gap-10">
          {MACHINES.map((machine) => (
            <button
              key={machine.id}
              onClick={() => {
                setSelectedMachine(machine);
                setOpen(true);
              }}
              className="
                group
                rounded-2xl
                bg-background-300
                p-6
                transition
                hover:-translate-y-2
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
              "
            >
              {/* ✅ 임시 이미지 영역 (placeholder) */}
              <div className="flex h-[220px] w-full items-center justify-center rounded-xl bg-background-200">
                <span className="text-gray-400 text-[14px]">
                  IMAGE
                </span>
              </div>

              {/* ✅ 기계명: 가운데 정렬 */}
              <p className="mt-5 text-center text-white text-[20px] font-semibold">
                {machine.name}
              </p>
            </button>
          ))}
        </div>
      </main>

      {/* ===== 퀴즈 모달 ===== */}
      {open && selectedMachine && (
        <QuizModal
          title={selectedMachine.name}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
