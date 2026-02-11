import type { ApiResponse } from "@/api/sessionApi";

export interface ViewData {
  camera: {
    position: { x: number; y: number; z: number }; // 카메라의 좌표 위치
    target: { x: number; y: number; z: number }; // 카메라가 바라보는 시점
    up: { x: number; y: number; z: number }; // 카메라의 위쪽 방향 벡터
    fov: number; // 시야각
  };

  viewport: {
    zoom: number; // 줌 배율
    pan: { x: number; y: number }; // 화면 평행 이동 값(OrbitControls의 pan 상태를 저장)
    rotation: { x: number; y: number; z: number }; // 모델 회전 상태
  };
  explode: number; // 분해 정도

  selection: {
    selectedObjectIds: number[]; // 현재 선택된 오브젝트 ID 목록
  };

  meta: {
    savedAt: string; // 뷰 데이터가 저장된 시각(예: 2026-02-04T06:00:00Z)
    clientVersion: "web-1.3.2"; // ViewData를 생성한 클라이언트 버전
  };
}

export interface SessionData {
  modelId: number;
  viewData: string;
}

export type sessionResponse = ApiResponse<SessionData>;
