import { useEffect, useRef, useState } from "react";
import ArrowUpIcon from "@/assets/icons/arrow_upward.svg?react";
import AiLogo from "@/assets/icons/ai_logo.svg?react";

// API & Type
import { getChatHistory } from "@/api/chatApi";
import type { ChatMessageDto, StreamChunk } from "@/types/chat";

import { useAuthStore } from "@/store/authStore";

interface DisplayMessage extends ChatMessageDto {
  id: number;
}

interface AiChatTabProps {
  sessionId: number;
}

export function AiChatTab({sessionId}: AiChatTabProps) {
  const accessToken = useAuthStore((state) => state.accessToken);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const streamBufferRef = useRef("");
  const streamingIdRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [userIsViewingHistory, setUserIsViewingHistory] = useState(false);

  // 1. 초기 채팅 내역 불러오기
  useEffect(() => {
    // 세션 ID가 없으면 로딩 안 함
    if (!sessionId) return;

    const loadAllChatHistory = async () => {
      try {
        let currentPage = 0;
        let isLastPage = false;
        let allMessages: ChatMessageDto[] = [];

        while (!isLastPage) {
          const response = await getChatHistory(sessionId, currentPage);
          if (response.isSuccess && response.data) {
            allMessages = [...allMessages, ...response.data.content];
            isLastPage = response.data.last;
            currentPage++;
          } else {
            break;
          }
        }

        const history = allMessages.map((msg, index) => ({
          ...msg,
          id: index,
        }));
        setMessages(history);
      } catch (error) {
        console.error("채팅 내역 로딩 실패:", error);
      }
    };

    loadAllChatHistory();
  }, [sessionId]);

  // 2. 타자기 효과
  useEffect(() => {
    const interval = setInterval(() => {
      if (streamingIdRef.current === null) return;
      const targetText = streamBufferRef.current;

      setMessages((prev) => prev.map((msg) => {
        if (msg.id !== streamingIdRef.current) return msg;
        const currentLen = msg.message.length;
        const targetLen = targetText.length;
        if (currentLen >= targetLen) return msg;
        const charsToAdd = targetLen - currentLen > 10 ? 3 : 1;
        return {...msg, message: targetText.slice(0, currentLen + charsToAdd)};
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // 중지 핸들러
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      streamingIdRef.current = null;
    }
  };

  // 스크롤 핸들러
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight > 2) {
      setUserIsViewingHistory(true);
    } else {
      setUserIsViewingHistory(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current && !userIsViewingHistory) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, userIsViewingHistory]);

  // 3. 전송 핸들러 (API 호출)
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: DisplayMessage = {
      id: Date.now(),
      chatRole: "USER",
      message: input,
      timestamp: new Date().toISOString(),
    };

    const aiMsgId = Date.now() + 1;
    const aiPlaceholder: DisplayMessage = {
      id: aiMsgId,
      chatRole: "ASSISTANT",
      message: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, aiPlaceholder]);
    setUserIsViewingHistory(false);

    streamBufferRef.current = "";
    streamingIdRef.current = aiMsgId;

    const currentInput = input;
    setInput("");

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);

    try {
      const streamUrl = `${import.meta.env.VITE_API_URL}/api/chat/stream`;

      const response = await fetch(streamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        credentials: "include", // 쿠키 포함 여부 (JWT 헤더 방식이면 필수 아닐 수 있으나 유지)
        body: JSON.stringify({
          question: currentInput,
          sessionId: sessionId,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        // 403, 500 에러 처리
        throw new Error(`Server Error: ${response.status}`);
      }

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
                  streamBufferRef.current += data.message;
                } else if (data.type === "done") {
                  setIsLoading(false);
                }
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("중단됨");
      } else {
        console.error("스트리밍 에러:", error);
        streamBufferRef.current += "\n[오류가 발생했습니다. 다시 로그인 해보세요.]";
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col relative h-full overflow-hidden">
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center pb-20 gap-6 select-none">
            <div className="relative">
              <AiLogo className="w-20 h-20 text-primary-200"/>
              <div className="absolute inset-0 bg-primary-200 blur-2xl opacity-20"/>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray/100 text-lg font-medium">안녕하세요!</p>
              <p className="text-gray/100 text-lg font-medium">무엇을 도와드릴까요?</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-4 pt-4 pb-[200px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.chatRole === "USER" ? "justify-end" : "justify-start"}`}>
                <div className="flex max-w-[90%] gap-2">
                  {msg.chatRole === "ASSISTANT" && (
                    <div className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center mt-1">
                      <AiLogo className="w-8 h-8 text-white"/>
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.chatRole === "USER" ? "bg-background-100 text-gray-100 rounded-tr-sm" : "bg-background-200 text-gray-100 rounded-tl-sm"
                  }`}>
                    {msg.chatRole === "ASSISTANT" && msg.message === "" && isLoading ?
                      <span className="animate-pulse">...</span> : msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-1 pb-5 pt-6">
        <div
          className="relative w-full min-h-[80px] max-h-[200px] bg-background-100 border border-white/10 rounded-lg overflow-hidden transition-colors flex focus-within:border-primary-200">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading) handleSend();
              }
            }}
            className="w-full h-auto max-h-[200px] bg-transparent py-4 pl-4 pr-12 text-white text-sm resize-none outline-none placeholder:text-gray-500 overflow-y-auto custom-scrollbar leading-relaxed"
            placeholder="무엇이 궁금한가요?"
            rows={3}
          />
          {isLoading ? (
            <button onClick={handleStop}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10">
              <div className="w-3 h-3 bg-white rounded-sm"/>
            </button>
          ) : (
            <button onClick={handleSend} disabled={!input.trim()}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors z-10">
              <ArrowUpIcon className="w-4 h-4 text-white"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}