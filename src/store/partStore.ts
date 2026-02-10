import type { PartObject } from "@/types/part";
import { create } from "zustand";

type PartListStore = {
  parts: PartObject[];
  setParts: (parts: PartObject[]) => void;
  clear: () => void;
};

type PartStore = {
  part: PartObject | null;
  setPart: (part: PartObject) => void;
  clear: () => void;
};

// 부품 리스트
export const usePartListStore = create<PartListStore>((set) => ({
  parts: [],
  setParts: (parts) => set({ parts }),
  clear: () => set({ parts: [] }),
}));

// 부품 상세
export const usePartStore = create<PartStore>((set) => ({
  part: null,
  setPart: (part) => set({ part }),
  clear: () => set({ part: null }),
}));
