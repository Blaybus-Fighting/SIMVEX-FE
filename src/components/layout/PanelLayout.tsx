import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PanelLayoutProps {
  // 1. 헤더 (탭 스위처나, 페이지 제목 등이 들어올 곳) -> 없으면 null
  header?: ReactNode;
  // 2. 본문 (회색 박스 안에 들어갈 내용)
  children: ReactNode;
  className?: string;
}

export function PanelLayout({header, children, className}: PanelLayoutProps) {
  return (
    <div className={cn(
      "flex flex-col h-full w-full", "bg-background-400", "border border-background-100", "rounded-xl", "p-4", className)}>

      {/* 1. 헤더 영역 (탭 스위처 자리) */}
      {/* mb-4: 본문 박스와의 간격 */}
      {header && (
        <div className="mb-4 shrink-0">
          {header}
        </div>
      )}

      {/* 2. 본문 영역 (회색 박스) */}
      {/* overflow-hidden: 내용이 많아도 박스 밖으로 안 튀어나오게 */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </div>

    </div>
  );
}