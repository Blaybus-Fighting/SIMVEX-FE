import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import ChevronForward from "@assets/icons/chevron_forward.svg?react";

type Part = {
  id: string;
  label: string;
  imgSrc?: string; // 슬롯에 이미지가 있으면 표시
  onClick: () => void;
};

type PartsDropdownProps = {
  title?: string; // 버튼 라벨(기본: 구성 부품)
  parts: Part[]; // 슬롯 데이터
  columns?: number; // 기본 5열
};

export default function PartsDropdown({
  title = "구성 부품",
  parts,
  columns = 5,
}: PartsDropdownProps) {
  // 그리드에 보여줄 slot 수
  const minSlots = 15; // 필요 시 조절
  const slots: (Part | null)[] = [...parts];
  while (slots.length < minSlots) slots.push(null);

  // tailwind grid-cols 는 동적 문자열이 빌드에서 누락될 수 있어 안전하게 매핑
  const gridColsClass =
    columns === 3
      ? "grid-cols-3"
      : columns === 4
        ? "grid-cols-4"
        : columns === 6
          ? "grid-cols-6"
          : "grid-cols-5";

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          {/* 버튼 */}
          <MenuButton className="inline-flex items-center gap-4 rounded-lg bg-[#2B3041] px-2 py-1 text-sm font-semibold text-[#F7F8F9]">
            <span>{title}</span>

            {/* chevron: 열리면 위로(회전) */}
            <ChevronForward
              className={[
                "transition-transform duration-150",
                open ? "-rotate-180" : "rotate-270",
              ].join(" ")}
            />
          </MenuButton>

          {/* 드롭다운 패널 */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1 scale-[0.98]"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-1 scale-[0.98]"
          >
            <MenuItems
              className="
                absolute right-0 z-50 mt-1 w-[22rem]
                rounded-lg bg-[#2B3041] p-[0.75rem]
                shadow-[-3px_4px_5px_0px_rgba(14,14,15,0.5)]
                ring-1 ring-white/10 focus:outline-none
              "
            >
              {/* 내부 그리드 */}
              <div className={["grid gap-2", gridColsClass].join(" ")}>
                {parts.map((part) => (
                  <MenuItem
                    key={part.id}
                    as="button"
                    onClick={part.onClick}
                    className="
                        relative flex h-[3.813rem] w-[3.813rem] items-center justify-center
                        rounded-sm bg-[#586167]
                        outline-none
                        transition
                        hover:brightness-110
                        data-[active]:ring-4 data-[active]:ring-[#009DFF]
                        data-[active]:ring-offset-0
                      "
                    title={part.label}
                  >
                    {/* 부품 썸네일 이미지 */}
                    {/* {part.imgSrc ? (
                        <img
                          src={part.imgSrc}
                          alt={part.label}
                          className="h-[86px] w-[86px] object-contain"
                          draggable={false}
                        />
                      ) : (
                        <span className="text-sm text-white/80">
                          {part.label}
                        </span>
                      )} */}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
