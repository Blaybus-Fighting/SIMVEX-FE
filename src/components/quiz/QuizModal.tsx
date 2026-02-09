import { useState } from "react";
import { FiX } from "react-icons/fi";
import GearCharacter from "@/components/quiz/GearCharacter";

interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "고정 죠(Feste Backe)의 주요 역할은?",
    options: [
      "이동 죠를 안내한다",
      "스핀들을 회전시킨다",
      "공작물의 기준면을 형성한다",
      "진동을 흡수한다",
      "마찰을 감소시킨다",
    ],
    answer: 2,
    explanation:
      "고정 죠는 이동하지 않으며, 공작물 위치 결정을 위한 기준면 역할을 합니다.",
  },
  {
    question: "자기 잠김(Self-locking)의 의미는?",
    options: [
      "회전 저항이 매우 작다",
      "고속 회전에 적합하다",
      "외력 없이도 고정 상태가 유지된다",
      "마찰이 제거된다",
      "축 방향 이동이 자유롭다",
    ],
    answer: 2,
    explanation:
      "나사의 마찰로 인해 외력이 없어도 클램핑 상태가 유지되는 특성입니다.",
  },
  {
    question: "바이스의 핵심 목적은?",
    options: ["절삭", "고정", "회전", "냉각", "윤활"],
    answer: 1,
    explanation:
      "바이스는 공작물을 정확하고 안전하게 고정하기 위한 장치입니다.",
  },
  {
    question: "이동 죠의 역할은?",
    options: ["고정", "이동하여 압착", "회전", "절삭", "분해"],
    answer: 1,
    explanation:
      "이동 죠는 공작물을 압착하기 위해 앞뒤로 이동합니다.",
  },
  {
    question: "바이스에서 Spanbacke의 역할은?",
    options: [
      "회전 속도 제어",
      "공작물 마모 방지",
      "가이드 자동 조절",
      "테이블 체결",
      "자기 잠김 강화",
    ],
    answer: 1,
    explanation:
      "Spanbacke는 공작물과 직접 접촉해 손상을 방지합니다.",
  },
];

export default function QuizModal({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const finished = index === QUESTIONS.length;
  const q = QUESTIONS[index];
  const isCorrect = selected === q?.answer;

  const selectOption = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowAnswer(true);
    if (i === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    setSelected(null);
    setShowAnswer(false);
    setIndex((v) => v + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* ===== 헤더 ===== */}
      <div className="relative flex h-20 items-center justify-center border-b border-white/10">
        <span className="text-white text-[20px] font-semibold">
          {title}
        </span>
        <button
          onClick={onClose}
          className="absolute right-8 text-white"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* ===== 진행 바 ===== */}
      {!finished && (
        <div className="mx-auto mt-8 flex max-w-4xl gap-3 px-10">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= index ? "bg-primary-200" : "bg-background-200"
              }`}
            />
          ))}
        </div>
      )}

      {/* ===== 본문 ===== */}
      <div className="mx-auto max-w-4xl px-10 pt-16">
        {finished ? (
          /* ===== 결과 화면 ===== */
          <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
            {/* ✅ GearCharacter 사용 */}
            <div className="mb-10">
              <GearCharacter size={180} />
            </div>

            <p className="text-white text-[30px] font-semibold">
              {QUESTIONS.length}문제 중 {correctCount}문제를 맞혔어요.
            </p>
            <p className="mt-3 text-gray-300 text-[18px]">
              다시 한 번 도전해볼까요?
            </p>

            <div className="mt-12 flex gap-6">
              <button
                onClick={() => {
                  setIndex(0);
                  setCorrectCount(0);
                  setSelected(null);
                  setShowAnswer(false);
                }}
                className="rounded-lg bg-background-200 px-8 py-4 text-white"
              >
                다시 풀기
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-primary-200 px-8 py-4 text-white"
              >
                다른 기계 퀴즈
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-gray-400 text-[16px]">
              Question {index + 1}
            </span>

            <h2 className="mt-3 mb-8 text-white text-[26px] font-semibold">
              {q.question}
            </h2>

            <div className="space-y-4">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={`w-full rounded-xl px-6 py-5 text-left text-[17px]
                    ${
                      selected === i
                        ? isCorrect
                          ? "bg-primary-200 text-white"
                          : "bg-red-500 text-white"
                        : "bg-background-200 text-white hover:bg-background-300"
                    }
                  `}
                >
                  {i + 1}. {opt}
                </button>
              ))}
            </div>

            {showAnswer && (
              <div className="mt-8 flex gap-5 rounded-xl bg-background-300 p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full
                    ${
                      isCorrect
                        ? "bg-primary-200/20 text-primary-200"
                        : "bg-red-500/20 text-red-500"
                    }
                  `}
                >
                  <span className="text-[22px] font-bold">
                    {isCorrect ? "✓" : "✕"}
                  </span>
                </div>

                <div>
                  <p className="text-white text-[18px] font-semibold mb-1">
                    {isCorrect
                      ? "정답입니다"
                      : `정답은 ${q.answer + 1}번이에요`}
                  </p>
                  <p className="text-gray-300 text-[16px] leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            )}

            {showAnswer && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={next}
                  className="rounded-lg bg-primary-200 px-8 py-4 text-white"
                >
                  다음 문제 →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}