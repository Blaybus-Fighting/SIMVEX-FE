import PlusIcon from "@/assets/icons/plus.svg?react";

export function FloatingButton({onClick}: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-6 right-6 w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
    >
      <PlusIcon className="w-4 h-4 text-white"/>
    </button>
  );
}