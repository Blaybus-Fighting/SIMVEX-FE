import { robotGripperParts } from "./parts/robotGripperParts";
import { suspensionParts } from "./parts/suspensionParts";

export const partsByModel = {
  "Robot Gripper": robotGripperParts,
  Suspension: suspensionParts,
} as const;

export type ModelName = keyof typeof partsByModel;
