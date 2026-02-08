// src/features/viewer/data/parts/suspensionParts.ts

import Base from "@assets/images/suspension/base.png";
import Nit from "@assets/images/suspension/nit.png";
import Nut from "@assets/images/suspension/nut.png";
import Rod from "@assets/images/suspension/rod.png";
import Spring from "@assets/images/suspension/spring.png";

/**
 * Suspension에서 UI에서 선택 가능한 Part ID
 * - 일부는 그룹 키로 사용
 */
export type SuspensionPartId =
  | "Base" // Solid1005 + Solid1005_1 (한 덩어리)
  | "NIT"
  | "NUT"
  | "ROD"
  | "SPRING";

export type SuspensionPart = {
  id: SuspensionPartId;
  label: string;
  imgSrc?: string;
};

export const suspensionParts: SuspensionPart[] = [
  {
    id: "Base",
    label: "Base",
    imgSrc: Base,
  },
  {
    id: "NIT",
    label: "Nit",
    imgSrc: Nit,
  },
  {
    id: "NUT",
    label: "Nut",
    imgSrc: Nut,
  },
  {
    id: "ROD",
    label: "Rod",
    imgSrc: Rod,
  },
  {
    id: "SPRING",
    label: "Spring",
    imgSrc: Spring,
  },
];
