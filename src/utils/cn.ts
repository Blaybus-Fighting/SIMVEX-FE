// Tailwind CSS 클래스를 조건부로 병합할 때 사용하는 유틸리티
// 사용법: cn("bg-red-500", isActive && "bg-blue-500") -> 스타일 충돌 없이 합쳐집니다.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}