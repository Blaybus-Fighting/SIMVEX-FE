import type { ViewData } from "@/types/session";
import { create } from "zustand";

type viewDataStore = {
  viewData: ViewData | null;
  setViewData: (ViewData: ViewData) => void;
  clear: () => void;
};

// 세션
export const useViewDataStore = create<viewDataStore>((set) => ({
  viewData: null,
  setViewData: (viewData) => set({ viewData }),
  clear: () => set({ viewData: null }),
}));
