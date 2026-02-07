// 기계별로 부품별 정보가 담아있는 파일들을 모아놓음
import { robotGripperParts } from "./parts/robotGripperParts";
import { suspensionParts } from "./parts/suspensionParts";
import { machineViceParts } from "./parts/machineViceParts";

export const partsByModel = {
  "Robot Gripper": robotGripperParts,
  Suspension: suspensionParts,
  "Machine Vice": machineViceParts,
} as const;

export type ModelName = keyof typeof partsByModel;
