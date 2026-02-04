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

type Item = {
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  buttonLabel?: string;
  items: Item[];
};

export default function Dropdown({
  buttonLabel = "메뉴",
  items,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* 라벨과 드롭다운 아이콘 */}
      <MenuButton className="inline-flex items-center gap-4 rounded-lg bg-[#2B3041] px-2 py-1 text-sm font-semibold text-[#F7F8F9]">
        {buttonLabel}
        <ChevronForward />
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
        {/* ✅ 추후에 변경 예정 */}
        <MenuItems className="absolute left-0 z-50 mt-1 w-48 origin-top-right rounded-md border border-slate-200 bg-white shadow-lg focus:outline-none">
          <div className="py-1">
            {items.map((item) => (
              <MenuItem
                key={item.label}
                as="button"
                onClick={item.onClick}
                className="
          w-full px-4 py-2 text-left text-sm text-slate-700
          data-[active]:bg-slate-100
          data-[active]:text-slate-900
        "
              >
                {item.label}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
