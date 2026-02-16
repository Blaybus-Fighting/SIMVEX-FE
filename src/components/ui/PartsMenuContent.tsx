import { getPart } from "@/api/partApi";
import PartThumb3D from "@/features/viewer/components/PartThumb3D";
import { usePartStore } from "@/store/partStore";
import type { PartObject } from "@/types/part";
// import PartThumb3D from "@features/viewer/components/PartThumb3D";
import { MenuItem, MenuItems, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect } from "react";

type PartsMenuContentProps = {
  open: boolean;
  parts: PartObject[];
  loading: boolean;
  gridColsClass: string;
  getParts: () => void;
};

export default function PartsMenuContent({
  open,
  parts,
  loading,
  gridColsClass,
  getParts,
}: PartsMenuContentProps) {
  useEffect(() => {
    if (open) getParts();
  }, [open, getParts]);

  const { part, setPart } = usePartStore();

  const handleDetailPart = async (partId: number) => {
    const res = await getPart(partId);
    try {
      if (res.isSuccess) {
        console.log("부품 상세 조회 성공: ", res.data);
        setPart(res.data); // 부품 상세 정보 저장
      } else {
        console.log("에러 데이터: ", res.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Transition as={Fragment}>
      <MenuItems className="absolute right-0 z-50 mt-1 w-[22rem] rounded-lg bg-background-400 p-[0.75rem]">
        {loading ? (
          <div className="p-2 text-sm text-gray-300">불러오는 중...</div>
        ) : (
          <div className={["grid gap-2", gridColsClass].join(" ")}>
            {parts.map((p) => (
              <MenuItem
                key={p.id}
                as="button"
                className={clsx(
                  "relative flex h-[3.813rem] w-[3.813rem]",
                  "items-center justify-center rounded-sm",
                  "bg-background-100",
                  "overflow-hidden transition",
                  "hover:border-primary-100",
                  part?.name == p.name ? "border border-primary-100" : null,
                )}
                title={p.name}
                onClick={() => handleDetailPart(p.id)}
              >
                {open && p.modelUrl ? (
                  <PartThumb3D url={p.modelUrl} />
                ) : (
                  <span className="text-xs text-white/70">{p.name}</span>
                )}

                <span className="text-xs text-gray-400">{p.name}</span>
              </MenuItem>
            ))}
          </div>
        )}
      </MenuItems>
    </Transition>
  );
}
