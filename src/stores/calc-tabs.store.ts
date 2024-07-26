import { create } from "zustand";

export type CalcTabsType = "class" | "background" | "attributes" | "feats";

export const CALC_TABS: { id: CalcTabsType; label: string }[] = [
  { id: "class", label: "Class" },
  { id: "background", label: "Background" },
  { id: "attributes", label: "Attributes" },
  { id: "feats", label: "Feats" },
];

type CalcTabsState = {
  selectedTab: CalcTabsType;
  setSelectedTab: (tab: CalcTabsType) => void;
  resetSelectedTab: () => void;
  getNextTab: () => CalcTabsType | null;
  getPreviousTab: () => CalcTabsType | null;
  onNextTab: () => void;
  onPreviousTab: () => void;
};

const useCalcTabsStore = create<CalcTabsState>()((set, get) => ({
  selectedTab: "class",
  setSelectedTab: (selectedAttributeId) =>
    set({ selectedTab: selectedAttributeId }),
  resetSelectedTab: () => set({ selectedTab: "class" }),
  getNextTab: () => {
    const { selectedTab } = get();

    const nextTabIndex =
      CALC_TABS.findIndex((item) => item.id === selectedTab) + 1;

    return CALC_TABS[nextTabIndex]?.id ?? null;
  },
  getPreviousTab: () => {
    const { selectedTab } = get();

    const prevTabIndex =
      CALC_TABS.findIndex((item) => item.id === selectedTab) - 1;

    return CALC_TABS[prevTabIndex]?.id ?? null;
  },
  onNextTab: () => {
    const { getNextTab } = get();
    console.log("next", getNextTab());

    set({
      selectedTab: getNextTab() ?? CALC_TABS[0].id,
    });
  },
  onPreviousTab: () => {
    const { getPreviousTab } = get();

    set({
      selectedTab: getPreviousTab() ?? CALC_TABS[CALC_TABS.length - 1].id,
    });
  },
}));

export const useCalcTabs = () => useCalcTabsStore((store) => store);
