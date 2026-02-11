// 구성 부품 버튼
import { Menu, MenuButton } from "@headlessui/react";
import { useState } from "react";
import ChevronForward from "@assets/icons/chevron_forward.svg?react";
import { useDetailModelStore } from "@/store/modelStore";
import { getPartList } from "@/api/partApi";
import { usePartListStore } from "@/store/partStore";
import PartsMenuContent from "./PartsMenuContent";

type PartsDropdownProps = {
  title?: string; // 버튼 라벨(기본: 구성 부품)
  // parts: Part[]; // 슬롯 데이터
  columns?: number; // 기본 5열
};

export default function PartsDropdown({
  title = "구성 부품",
  // parts,
  columns = 5,
}: PartsDropdownProps) {
  // tailwind grid-cols 는 동적 문자열이 빌드에서 누락될 수 있어 안전하게 매핑
  const gridColsClass =
    columns === 3
      ? "grid-cols-3"
      : columns === 4
        ? "grid-cols-4"
        : columns === 6
          ? "grid-cols-6"
          : "grid-cols-5";

  const [loading, setLoading] = useState(false);
  const { parts, setParts } = usePartListStore();

  const { model } = useDetailModelStore();
  const getParts = async () => {
    if (!model) return;
    // 이미 있으면 또 안 가져오게 (캐시)
    if (parts.length > 0) return;

    try {
      setLoading(true);
      const res = await getPartList(model.id);
      if (res.isSuccess) setParts(res.data);
      else console.log(res.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <p>부품 가져오는 중...</p>;
  }

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => {
        return (
          <>
            <MenuButton className="inline-flex items-center gap-4 rounded-lg bg-[#2B3041] px-2 py-1 text-sm font-semibold text-[#F7F8F9]">
              <span>{title}</span>
              <ChevronForward
                className={[
                  "transition-transform duration-150",
                  open ? "-rotate-180" : "rotate-270",
                ].join(" ")}
              />
            </MenuButton>

            {/* 구성 부품들 */}
            <PartsMenuContent
              open={open}
              parts={parts}
              loading={loading}
              gridColsClass={gridColsClass}
              getParts={getParts}
            />
          </>
        );
      }}
    </Menu>
  );
}
