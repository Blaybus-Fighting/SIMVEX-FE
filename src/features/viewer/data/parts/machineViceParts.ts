// machineViceParts : 부품별 정보(id, label, category)

// 부품 별 아이디
export type MachineVicePartId =
  | "Part8-grundplatte"
  | "Part2_Feste_Backe"
  | "Part4_spindelsockel"
  | "Part5-Spannbacke"
  | "Part1_Fuhrung"
  | "Part3-lose_backe"
  | "Part7-TrapezSpindel"
  | "Part6-fuhrungschiene"
  | "Part5-Spannbacke001"
  | "Part6-fuhrungschiene001";

// 부품별 공통 필드명
export type MachineVicePart = {
  id: MachineVicePartId;
  label: string;
  imgSrc?: string;
  /**
   * (선택) UI에서 그룹핑/필터링 하고 싶으면 쓰기 좋음
   * ex) "base" | "jaw" | "rail" | "spindle"
   */
  category?: "base" | "jaw" | "rail" | "spindle" | "guide" | "housing";
};

export const machineViceParts: MachineVicePart[] = [
  {
    id: "Part8-grundplatte",
    label: "Part8",
    category: "base",
    // imgSrc: Part8GrundplatteImg,
  },
  {
    id: "Part2_Feste_Backe",
    label: "Part2",
    category: "jaw",
    // imgSrc: Part2FesteBackeImg,
  },
  {
    id: "Part3-lose_backe",
    label: "Part3",
    category: "jaw",
    // imgSrc: Part3LoseBackeImg,
  },
  {
    id: "Part5-Spannbacke",
    label: "Part5",
    category: "jaw",
    // imgSrc: Part5SpannbackeImg,
  },
  {
    id: "Part5-Spannbacke001",
    label: "Part5",
    category: "jaw",
    // imgSrc: Part5Spannbacke001Img,
  },
  {
    id: "Part1_Fuhrung",
    label: "Part1",
    category: "guide",
    // imgSrc: Part1FuhrungImg,
  },
  {
    id: "Part6-fuhrungschiene",
    label: "Part6",
    category: "rail",
    // imgSrc: Part6FuhrungschieneImg,
  },
  {
    id: "Part6-fuhrungschiene001",
    label: "Part6",
    category: "rail",
    // imgSrc: Part6Fuhrungschiene001Img,
  },
  {
    id: "Part4_spindelsockel",
    label: "Part4",
    category: "housing",
    // imgSrc: Part4SpindelsockelImg,
  },
  {
    id: "Part7-TrapezSpindel",
    label: "Part7",
    category: "spindle",
    // imgSrc: Part7TrapezSpindelImg,
  },
];
