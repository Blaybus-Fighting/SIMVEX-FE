import type { ViewData } from "@/types/session";
import { create } from "zustand";

type viewDataStore = {
  viewData: ViewData | null;
  setViewData: (ViewData: ViewData) => void;
  clear: () => void;
};

type explodeStore = {
  explode: number;
  setExplode: (explode: number) => void;
};

// 세션
export const useViewDataStore = create<viewDataStore>((set) => ({
  viewData: null,
  setViewData: (viewData) => set({ viewData }),
  clear: () => set({ viewData: null }),
}));

// 분해도
export const useExplodeStore = create<explodeStore>((set) => ({
  explode: 0,
  setExplode: (explode) => set({ explode }),
}));
