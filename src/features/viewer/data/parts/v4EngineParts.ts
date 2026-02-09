/**
 * 원활한 API 연동을 위해 미리 만든 파일
 */
export type V4EnginePartId =
  | "Base" // Solid1005 + Solid1005_1 (한 덩어리)
  | "NIT"
  | "NUT"
  | "ROD"
  | "SPRING";

export type V4EnginePart = {
  id: V4EnginePartId;
  label: string;
  imgSrc?: string;
};

export const v4EngineParts: V4EnginePart[] = [];
