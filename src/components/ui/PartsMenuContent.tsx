import type { PartObject } from "@/types/part";
import PartThumb3D from "@features/viewer/components/PartThumb3D";
import { MenuItem, MenuItems, Transition } from "@headlessui/react";
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

  return (
    <Transition as={Fragment}>
      <MenuItems className="absolute right-0 z-50 mt-1 w-[22rem] rounded-lg bg-background-400 p-[0.75rem]">
        {loading ? (
          <div className="p-2 text-sm text-gray-300">불러오는 중...</div>
        ) : (
          <div className={["grid gap-2", gridColsClass].join(" ")}>
            {parts.map((part) => (
              <MenuItem
                key={part.id}
                as="button"
                className="
                relative flex h-[3.813rem] w-[3.813rem] 
                items-center justify-center rounded-sm 
                bg-background-100 
                border border-transparent
                overflow-hidden
                transition
                hover:border-primary-100"
                title={part.name}
              >
                {open && part.modelUrl ? (
                  <PartThumb3D url={part.modelUrl} />
                ) : (
                  <span className="text-xs text-white/70">{part.name}</span>
                )}
              </MenuItem>
            ))}
          </div>
        )}
      </MenuItems>
    </Transition>
  );
}
