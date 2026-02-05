import { useState } from "react";
import { NoteCard } from "@/components/ui/NoteCard";
import { FloatingButton } from "@/components/ui/FloatingButton";
import SearchIcon from "@/assets/icons/search.svg?react";

export function NoteTab() {
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태 (여기서만 씀)

  // 1. 글쓰기 화면
  if (isWriting) {
    return (
      <div className="flex flex-col h-full relative text-white animate-in fade-in duration-200">
        <button
          onClick={() => setIsWriting(false)}
          className="absolute -top-1 right-0 text-gray-400 hover:text-white p-2"
        >
          ✕
        </button>

        <h3 className="text-text-2 font-bold mb-2 mt-1">제목</h3>
        <input
          className="bg-background-300 p-3 rounded-md text-white mb-6 outline-none focus:ring-1 focus:ring-primary-100"
          placeholder="제목을 입력하세요"/>

        <h3 className="text-text-2 font-bold mb-2">내용</h3>
        <textarea
          className="bg-background-300 p-3 rounded-md text-white flex-1 resize-none outline-none focus:ring-1 focus:ring-primary-100"
          placeholder="내용을 입력하세요"/>

        <button
          className="mt-4 bg-primary-100 text-white py-3 rounded-lg font-bold hover:bg-primary-200 transition-colors">
          저장하기
        </button>
      </div>
    );
  }

  // 2. 리스트 화면 (기본)
  return (
    <>
      <div className="flex justify-between items-center mb-3 shrink-0">
        <button className="text-gray-400 hover:text-white transition-colors">
          <SearchIcon className="w-4 h-4"/>
        </button>
        <button className="text-primary-100 font-medium text-text-3 hover:text-primary-200">편집</button>
      </div>

      <div className="overflow-y-auto h-full pb-10 scrollbar-hide w-full mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <NoteCard title="전공 수업" date="1일 전" preview="탄소강의 열처리 과정에 대해..."/>
          <NoteCard title="캡스톤 회의" date="2일 전" preview="다음 주 발표 자료 준비..."/>
          <NoteCard title="아이디어" date="3일 전" preview="기계 팔 관절 설계 변경안..."/>
          <NoteCard title="할일" date="4일 전" preview="도서관 책 반납하기..."/>
        </div>
      </div>

      <FloatingButton onClick={() => setIsWriting(true)}/>
    </>
  );
}