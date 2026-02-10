import * as Tooltip from "@radix-ui/react-tooltip";
import ZoomMouse from "@assets/icons/zoomMouse.svg?react";
import RotationMouse from "@assets/icons/rotationMouse.svg?react";
import MoveMouse from "@assets/icons/moveMouse.svg?react";

export function HelpTooltip() {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        {/* 동그란 ? 버튼 */}
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              bg-background-100 hover:bg-slate-700/65
              ring-1 ring-white/10
              backdrop-blur-md
              shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
            "
            aria-label="도움말"
          >
            <span className="text-lg font-semibold text-primary-100">?</span>
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="start"
            sideOffset={10}
            className="
              rounded-lg
              bg-background-100
              backdrop-blur-xl
              py-2
              shadow-2xl shadow-black/30
              ring-1 ring-white/10
              animate-in fade-in zoom-in-95
            "
          >
            <ul className="flex flex-col gap-1">
              <li className="flex items-center gap-3 px-2">
                <ZoomMouse />
                <span className="text-caption text-gray-200 font-normal">
                  화면 확대/축소
                </span>
              </li>

              <li className="flex items-center gap-3 px-2">
                <RotationMouse />
                <span className="text-caption text-gray-200 font-normal">
                  화면 회전
                </span>
              </li>

              <li className="flex items-center gap-3 px-2">
                <MoveMouse />
                <span className="text-caption text-gray-200 font-normal">
                  화면 이동
                </span>
              </li>
            </ul>

            {/* 화살표 (선택) */}
            <Tooltip.Arrow className="fill-slate-800/80" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
