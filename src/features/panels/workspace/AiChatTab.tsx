import { useEffect, useRef, useState } from "react";
import ArrowUpIcon from "@/assets/icons/arrow_upward.svg?react";

// 메시지 타입 정의
type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
};

export function AiChatTab() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 초기 더미 데이터 (이미지와 똑같이 맞춤)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "user",
      text: "탄소강 (S45C / Carbon Steel) 에 대해서 자세히 알려줘. 어디에 쓰여?",
    },
    {
      id: 2,
      role: "ai",
      text: "탄소강 (S45C / Carbon Steel) 은 기계 구조용 탄소강으로, 강도가 높고 열처리가 용이하여 다양한 기계 부품에 사용됩니다.\n\n주로 자동차 부품, 엔진 부품, 볼트, 너트, 그리고 기어와 같은 내구성이 필요한 곳에 쓰입니다.",
    },
    {
      id: 3,
      role: "user",
      text: "만약, 알루미늄으로 한다면?",
    },
  ]);

  // 스크롤 자동 내리기
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;

    // 1. 내 메시지 추가
    const newMessage: Message = {
      id: Date.now(),
      role: "user",
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // 2. (임시) 2초 뒤에 AI 답변 추가 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "알루미늄은 탄소강보다 가볍지만 강도는 낮습니다. 경량화가 중요한 항공기 부품 등에 주로 쓰입니다.",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col relative h-full overflow-hidden">
      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        <div className="space-y-4 pb-[200px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[90%] gap-2">
                {/* AI 아이콘 (AI일 때만 보임) */}
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-md bg-[#4B5563] shrink-0 flex items-center justify-center mt-1">
                  </div>
                )}

                {/* 말풍선 */}
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-background-100 text-gray-100 rounded-tr-sm"
                      : "bg-background-200 text-gray-100 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* 로딩 상태 ("생각중..." 말풍선) */}
          {isLoading && (
            <div className="flex w-full justify-start animate-pulse">
              <div className="flex max-w-[80%] gap-2">
                <div className="w-8 h-8 rounded-md bg-background-100 shrink-0 flex items-center justify-center mt-1">
                </div>
                <div
                  className="p-3 rounded-2xl bg-background-200 text-gray-300 text-sm rounded-tl-sm flex items-center">
                  생각중...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 입력창 - 절대 위치로 하단 고정 */}
      <div
        className="absolute bottom-0 left-0 right-0 px-1 pb-4 bg-gradient-to-t from-background-200 via-background-200 to-transparent pt-6">

        {/* 1. min-h-[80px]: 너무 얇지 않게, 적당한 두께감 확보 */}
        {/* 2. items-end 제거: 텍스트가 위에서부터 자연스럽게 채워짐 */}
        <div
          className="relative w-full min-h-[80px] max-h-[200px] bg-background-100 border border-white/10 rounded-3xl overflow-hidden transition-colors flex">

    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      // 3. rows={3}: 기본적으로 3줄 정도의 높이를 가짐
      // py-4: 위아래 여백을 넉넉하게 줘서 답답하지 않음
      className="w-full h-auto max-h-[200px] bg-transparent py-4 pl-4 pr-12 text-white text-sm resize-none outline-none placeholder:text-gray-500 overflow-y-auto custom-scrollbar leading-relaxed"
      placeholder="무엇이 궁금한가요?"
      rows={3}
    />

          {/* 전송 버튼 (우측 하단 고정) */}
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute bottom-3 right-3 w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <ArrowUpIcon className="w-4 h-4 text-white"/>
          </button>
        </div>
      </div>
    </div>
  );
}