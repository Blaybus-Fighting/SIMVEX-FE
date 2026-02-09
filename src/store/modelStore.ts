import { create } from "zustand";
import type { ModelObject } from "@/api/modelApi";

type ModelStore = {
  models: ModelObject[];
  setModels: (models: ModelObject[]) => void;
  clear: () => void;
};

type DetailModelStore = {
  model: ModelObject | null;
  setModel: (model: ModelObject) => void;
  clear: () => void;
};

// 모델 객체 리스트
export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  setModels: (models) => set({ models }),
  clear: () => set({ models: [] }),
}));

// 모델 상세 객체
export const useDetailModelStore = create<DetailModelStore>((set) => ({
  model: null,
  setModel: (model) => set({ model }),
  clear: () => set({ model: null }),
}));
