import type { ReactNode } from "react";

interface HeaderFrameProps {
  children: ReactNode;
  className?: string;
}

export default function HeaderFrame({children, className = ""}: HeaderFrameProps) {
  return (
    <header
      className={`h-[3.75rem] w-full flex items-center justify-between px-6 shrink-0 z-50 ${className}`}
    >
      {children}
    </header>
  );
}