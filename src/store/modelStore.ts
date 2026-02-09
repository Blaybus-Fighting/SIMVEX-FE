import { create } from "zustand";
import type { ModelObject } from "@/api/modelApi";

type ModelStore = {
  models: ModelObject[];
  setModels: (models: ModelObject[]) => void;
  clear: () => void;
};

export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  setModels: (models) => set({ models }),
  clear: () => set({ models: [] }),
}));
