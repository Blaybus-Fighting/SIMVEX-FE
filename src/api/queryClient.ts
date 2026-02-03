// React Query 전역 설정 파일 (데이터 캐싱, 재시도 횟수 등)
// 앱 전반의 서버 데이터 동기화 전략을 설정할 때 사용합니다.

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // API 실패시 1번만 재시도
            staleTime: 1000 * 60 * 5, // 5분 동안은 캐시된 데이터 사용 (서버 요청 안 함)
            refetchOnWindowFocus: false, // 윈도우 포커스 될 때마다 재요청 금지
        },
    },
});