import { create } from "zustand";

type FeatsPanelState = {
  activeFeatId: string | null;
  setActiveFeatId: (id: string | null) => void;
};

const useFeatsPanelStore = create<FeatsPanelState>()((set) => ({
  activeFeatId: null,
  setActiveFeatId: (activeFeatId) => set({ activeFeatId }),
}));

export const useFeatsPanel = () => useFeatsPanelStore((store) => store);
