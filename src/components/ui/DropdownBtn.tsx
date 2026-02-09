// 드롭다운 버튼
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import ChevronForward from "@assets/icons/chevron_forward.svg?react";
import clsx from "clsx";

type Item = {
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  buttonLabel?: string;
  left: boolean;
  items: Item[];
};

export default function Dropdown({
  buttonLabel = "메뉴",
  left,
  items,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          {/* 라벨과 드롭다운 아이콘 */}
          <MenuButton className="inline-flex items-center gap-4 rounded-lg bg-background-100 px-2 py-1 text-text-3 font-medium text-gray-100">
            {buttonLabel}
            {/* chevron: 열리면 위로(회전) */}
            <ChevronForward
              className={[
                "transition-transform duration-150",
                open ? "-rotate-180" : "rotate-270",
              ].join(" ")}
            />
          </MenuButton>

          {/* 드롭다운 생성 애니메이션 효과 설정 */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {/* 드롭다운 메뉴들(인자로 받은 item 개수에 따라 생성) */}
            <MenuItems
              className={clsx(
                "absolute z-50 mt-1 origin-top-right rounded-lg bg-background-100 shadow-lg focus:outline-none",
                left ? "left-0" : "right-0",
              )}
            >
              <div className="py-1">
                {items.map((item) => (
                  <MenuItem
                    key={item.label}
                    as="button"
                    onClick={item.onClick}
                    className="w-full px-4 py-2 text-text-3 text-gray-100"
                  >
                    {item.label}
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
