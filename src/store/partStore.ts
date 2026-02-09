import type { PartObject } from "@/types/part";
import { create } from "zustand";

type PartListStore = {
  parts: PartObject[];
  setParts: (parts: PartObject[]) => void;
  clear: () => void;
};

// 부품 리스트
export const usePartListStore = create<PartListStore>((set) => ({
  parts: [],
  setParts: (parts) => set({ parts }),
  clear: () => set({ parts: [] }),
}));
