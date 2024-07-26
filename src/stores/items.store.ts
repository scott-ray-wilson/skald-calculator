import { create } from "zustand";

type ItemsState = {
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string | null) => void;
  itemFilter: string;
  setItemFilter: (itemFilter: string) => void;
};

const useItemsStore = create<ItemsState>()((set) => ({
  selectedItemId: null,
  itemFilter: "",
  setSelectedItemId: (itemId) => set({ selectedItemId: itemId }),
  setItemFilter: (itemFilter) => set({ itemFilter }),
}));

export const useItems = () => useItemsStore((store) => store);
