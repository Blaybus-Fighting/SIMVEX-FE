import { useEffect, useRef, useState } from "react";
import ArrowUpIcon from "@/assets/icons/arrow_upward.svg?react";
import AiLogo from "@/assets/icons/ai_logo.svg?react";

// API & Type
import { getChatHistory } from "@/api/chatApi";
import type { ChatMessageDto, StreamChunk } from "@/types/chat";

// 화면 표시용 메시지 타입
interface DisplayMessage extends ChatMessageDto {
  id: number;
}

// props 정의
interface AiChatTabProps {
  sessionId: number; // 부모에게서 받는 세션 ID
}

export function AiChatTab({sessionId}: AiChatTabProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 메시지 목록
  const [messages, setMessages] = useState<DisplayMessage[]>([]);

  // 부드러운 출력을 위한 '임시 저장소(Buffer)'와 '타겟 ID'
  const streamBufferRef = useRef("");
  const streamingIdRef = useRef<number | null>(null);

  // 강제 종료를 위한 컨트롤러
  const abortControllerRef = useRef<AbortController | null>(null);
  // "사용자가 스크롤을 올리는가?"를 감지하는 상태
  const [userIsViewingHistory, setUserIsViewingHistory] = useState(false);

  // 1. 초기 채팅 내역 불러오기
  useEffect(() => {
    const loadAllChatHistory = async () => {
      try {
        let currentPage = 0;
        let isLastPage = false;
        let allMessages: ChatMessageDto[] = []; // 여기에 모든 메시지를 모음

        // 마지막 페이지(last: true)가 될 때까지 무한 반복
        while (!isLastPage) {
          console.log(`${currentPage}번 페이지 불러오는 중...`);

          const response = await getChatHistory(sessionId, currentPage);

          if (response.isSuccess && response.data) {
            // 가져온 일부 채팅을 allMessages에 담기
            allMessages = [...allMessages, ...response.data.content];

            // last가 true면 반복문 종료
            isLastPage = response.data.last;

            // 다음 페이지 준비
            currentPage++;
          } else {
            // 실패하면 강제 종료 (무한루프 방지)
            break;
          }
        }

        // 다 모은 뒤에 한 번에 화면에 뿌리기!
        const history = allMessages.map((msg, index) => ({
          ...msg,
          id: index, // 전체 리스트 기준으로 ID 재부여
        }));

        setMessages(history);
        console.log(`총 ${history.length}개의 메시지 로딩 완료!`);

      } catch (error) {
        console.error("채팅 내역 로딩 실패:", error);
      }
    };

    loadAllChatHistory();
  }, [sessionId]);

  // 2. 타자기 애니메이션 루프
  // 백엔드에서 데이터가 뭉텅이로 와도, 여기서 0.02초마다 한 글자씩 화면에 옮겨줌
  useEffect(() => {
    const interval = setInterval(() => {
      // 스트리밍 중인 메시지가 없으면 아무것도 안 함
      if (streamingIdRef.current === null) return;

      const targetText = streamBufferRef.current;

      setMessages((prev) => prev.map((msg) => {
        // 지금 작성 중인 AI 메시지가 아니면 건드리지 않음
        if (msg.id !== streamingIdRef.current) return msg;

        // 현재 화면에 표시된 길이 vs 실제 도착한 길이
        const currentLen = msg.message.length;
        const targetLen = targetText.length;

        // 이미 다 그렸으면 패스
        if (currentLen >= targetLen) return msg;

        // 남은 글자가 너무 많으면(10글자 이상 밀림) 조금 더 빨리 출력 (속도 조절)
        // 평소엔 1글자씩, 밀리면 3글자씩 추가
        const charsToAdd = targetLen - currentLen > 10 ? 3 : 1;

        return {
          ...msg,
          message: targetText.slice(0, currentLen + charsToAdd)
        };
      }));

    }, 30); // 0.03초마다 실행 (숫자를 줄이면 더 빨라짐)

    return () => clearInterval(interval);
  }, []);

  // 중지 버튼 눌렀을 때 실행할 함수
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // 1. 네트워크 요청 강제 취소
      abortControllerRef.current = null;
      setIsLoading(false); // 2. 로딩 상태 끄기 (입력창 잠금 해제)
      streamingIdRef.current = null; // 3. 타자기 효과 중단
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;

    // 바닥까지의 남은 거리 계산
    const distFromBottom = scrollHeight - scrollTop - clientHeight;

    // 만약 바닥에서 2px 이상 올라가 있으면 -> "아, 옛날 내역 보는 중이구나!" (자동 스크롤 끔)
    // 바닥에 거의 붙어 있으면 -> "새 메시지 구경 중이구나!" (자동 스크롤 켬)
    if (distFromBottom > 2) {
      setUserIsViewingHistory(true);
    } else {
      setUserIsViewingHistory(false);
    }
  };

  // 2. 스크롤 자동 내리기
  useEffect(() => {
    if (scrollRef.current) {
      // "딴짓 중(userIsViewingHistory)"이 아닐 때만 스크롤을 내립니다!
      if (!userIsViewingHistory) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [messages, isLoading, userIsViewingHistory]); // 의존성 배열 유지

  // 3. 메시지 전송 및 스트리밍 처리
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: DisplayMessage = {
      id: Date.now(),
      chatRole: "USER",
      message: input,
      timestamp: new Date().toISOString(),
    };

    // AI 빈 말풍선 생성
    const aiMsgId = Date.now() + 1;
    const aiPlaceholder: DisplayMessage = {
      id: aiMsgId,
      chatRole: "ASSISTANT",
      message: "", // 빈 상태로 시작
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);

    // 내가 메시지를 보내면 무조건 바닥으로 강제 이동시켜야 함
    setUserIsViewingHistory(false);

    // 스트리밍 시작 준비
    streamBufferRef.current = "";    // 버퍼 비우기
    streamingIdRef.current = aiMsgId; // "이제 이 ID에다가 글자 채워넣어라"고 알림

    const currentInput = input;
    setInput("")

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);

    try {
      const streamUrl = `${import.meta.env.VITE_API_URL}/api/chat/stream`;

      const response = await fetch(streamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          question: currentInput,
          sessionId: sessionId,
        }),
        signal: controller.signal,
      });

      if (!response.body) throw new Error("ReadableStream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, {stream: true});
        buffer += chunk;

        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");
          for (const line of lines) {
            if (line.startsWith("data:")) {
              try {
                const jsonStr = line.replace("data:", "").trim();
                const data: StreamChunk = JSON.parse(jsonStr);

                if (data.type === "chunk") {
                  //화면(setMessages)을 바로 건드리지 않고
                  // 'streamBufferRef'에만 안보이게 쌓아둡니다.
                  // 화면 업데이트는 위의 useEffect가 알아서 해줍니다.
                  streamBufferRef.current += data.message;
                } else if (data.type === "done") {
                  // 완료되어도 로딩만 끄고, 글자는 다 찍힐 때까지 둠
                  setIsLoading(false);
                }
              } catch (e) {
                console.error("JSON 파싱 에러:", e);
              }
            }
          }
        }
      }

    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("사용자가 전송을 중단했습니다.");
      } else {
        console.error("스트리밍 에러:", error);
        // 에러 메시지 표시 로직...
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null; // 청소
    }
  };

  return (
    <div className="flex flex-col relative h-full overflow-hidden">
      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        {/* 메시지가 0개면 '초기 화면', 1개라도 있으면 '채팅 목록' 표시 */}
        {messages.length === 0 ? (
          // 초기 안내 화면 (중앙 정렬)
          <div className="h-full flex flex-col items-center justify-center pb-20 gap-6 select-none">
            {/* 로고 아이콘 (네온 효과나 색상은 SVG 자체에 있거나 여기서 className으로 조절) */}
            <div className="relative">
              <AiLogo className="w-20 h-20 text-primary-200"/>
              {/* 필요하다면 뒤에 은은한 광원 효과 추가 가능 */}
              <div className="absolute inset-0 bg-primary-200 blur-2xl opacity-20"/>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray/100 text-lg font-medium">안녕하세요!</p>
              <p className="text-gray/100 text-lg font-medium">무엇을 도와드릴까요?</p>
            </div>
          </div>
        ) : (
          // 기존 채팅 목록
          <div className="space-y-4 px-4 pt-4 pb-[200px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.chatRole === "USER" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex max-w-[90%] gap-2">
                  {/* AI 아이콘 */}
                  {msg.chatRole === "ASSISTANT" && (
                    <div className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center mt-1">
                      <AiLogo className="w-8 h-8 text-white"/>
                    </div>
                  )}

                  {/* 말풍선 */}
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.chatRole === "USER"
                        ? "bg-background-100 text-gray-100 rounded-tr-sm"
                        : "bg-background-200 text-gray-100 rounded-tl-sm"
                    }`}
                  >
                    {msg.chatRole === "ASSISTANT" && msg.message === "" && isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 입력창 - 절대 위치로 하단 고정 */}
      <div
        className="absolute bottom-0 left-0 right-0 px-1 pb-5 pt-6">

        <div
          className="relative w-full min-h-[80px] max-h-[200px] bg-background-100 border border-white/10 rounded-lg overflow-hidden transition-colors flex focus-within:border-primary-200">
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      // 로딩 중일 때 엔터 막기
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          // 로딩 중이 아닐 때만 전송
          if (!isLoading) handleSend();
        }
      }}

      className="w-full h-auto max-h-[200px] bg-transparent py-4 pl-4 pr-12 text-white text-sm resize-none outline-none placeholder:text-gray-500 overflow-y-auto custom-scrollbar leading-relaxed"
      placeholder="무엇이 궁금한가요?"
      rows={3}
    />
          {/* 전송/중지 버튼 스위칭 로직 */}
          {isLoading ? (
            // [로딩 중일 때] -> 중지 버튼
            <button
              onClick={handleStop}
              className="absolute bottom-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10"
              title="답변 중지"
            >
              {/* 아이콘 없으면 그냥 div 네모로 대체 */}
              <div className="w-3 h-3 bg-white rounded-sm"/>
            </button>
          ) : (
            // [평소] -> 전송 버튼 (화살표)
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute bottom-3 right-3 w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center ..."
            >
              <ArrowUpIcon className="w-4 h-4 text-white"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
