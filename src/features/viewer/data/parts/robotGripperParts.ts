// src/features/viewer/data/parts/robotGripperParts.ts
import BaseGear from "@assets/images/robot_gripper/base_gear.png";
import BasePlate from "@assets/images/robot_gripper/base_plate.png";
import Gripper from "@assets/images/robot_gripper/gripper.png";
import Link from "@assets/images/robot_gripper/link.png";
import Pin from "@assets/images/robot_gripper/pin.png";
import BaseMountingBracket from "@assets/images/robot_gripper/base_mounting_bracket.png";
import GearLink from "@assets/images/robot_gripper/gear_link.png";

export type RobotGripperPartId =
  | "Base_Gear"
  | "Base_Plate"
  | "Gripper"
  | "Link" // 그룹 키
  | "Pin" // 그룹 키
  | "Base_Mounting_bracket"
  | "Gear_Link"; // 그룹 키

export type RobotGripperPart = {
  id: RobotGripperPartId;
  label: string;
  imgSrc?: string;
};

export const robotGripperParts: RobotGripperPart[] = [
  { id: "Base_Gear", label: "Base Gear", imgSrc: BaseGear },
  { id: "Base_Plate", label: "Base Plate", imgSrc: BasePlate },
  { id: "Gripper", label: "Gripper", imgSrc: Gripper },
  { id: "Link", label: "Link", imgSrc: Link },
  { id: "Pin", label: "Pin", imgSrc: Pin },
  {
    id: "Base_Mounting_bracket",
    label: "Base Mounting Bracket",
    imgSrc: BaseMountingBracket,
  },
  { id: "Gear_Link", label: "Gear Link", imgSrc: GearLink },
];
