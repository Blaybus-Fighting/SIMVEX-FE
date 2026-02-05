import { cn } from "@/utils/cn";

interface TabSwitcherProps {
  leftLabel: string;
  rightLabel: string;
  activeTab: "LEFT" | "RIGHT";
  onChange: (tab: "LEFT" | "RIGHT") => void;
}

export function TabSwitcher({leftLabel, rightLabel, activeTab, onChange}: TabSwitcherProps) {
  return (
    // 1. 배경
    <div className="bg-background-100 p-1 rounded-xl flex w-full relative">

      {/* 2. 클릭 가능한 투명 버튼들 (기능 담당) */}
      <button
        type="button"
        onClick={() => onChange("LEFT")}
        className={cn(
          "flex-1 py-3 text-center rounded-lg relative z-10 transition-colors font-medium",
          activeTab === "LEFT" ? "text-white" : "text-gray-400 hover:text-gray-200"
        )}
      >
        {leftLabel}
      </button>

      <button
        type="button"
        onClick={() => onChange("RIGHT")}
        className={cn(
          "flex-1 py-3 text-center rounded-lg relative z-10 transition-colors font-medium",
          activeTab === "RIGHT" ? "text-white" : "text-gray-400 hover:text-gray-200"
        )}
      >
        {rightLabel}
      </button>

      {/* 3. 움직이는 파란색 배경 */}
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary-200 rounded-lg transition-all duration-300 ease-in-out",
          // activeTab이 오른쪽이면 왼쪽 여백(left)을 50%로 밀어버림 -> 슬라이딩 효과!
          activeTab === "RIGHT" ? "left-[50%]" : "left-1"
        )}
      />
    </div>
  );
}