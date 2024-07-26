import { create } from "zustand";

/* Used to override hovered keyword to display nested keywords in same tooltip */

type KeywordOverrideState = {
  keywordOverride: string | null;
  setKeywordOverride: (keywordOverride: string | null) => void;
};

const useKeywordOverrideStore = create<KeywordOverrideState>()((set) => ({
  keywordOverride: null,
  setKeywordOverride: (keywordOverride) => set({ keywordOverride }),
}));

export const useKeywordOverride = () =>
  useKeywordOverrideStore((store) => store);
