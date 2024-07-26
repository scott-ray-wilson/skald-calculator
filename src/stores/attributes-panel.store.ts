import { create } from "zustand";

type AttributesPanelState = {
  selectedAttributeId: string | null;
  setSelectedAttributeId: (attributeId: string | null) => void;
  resetSelectedAttributeId: () => void;
};

const useAttributesPanelStore = create<AttributesPanelState>()((set) => ({
  selectedAttributeId: null,
  setSelectedAttributeId: (selectedAttributeId) => set({ selectedAttributeId }),
  resetSelectedAttributeId: () => set({ selectedAttributeId: null }),
}));

export const useAttributesPanel = () =>
  useAttributesPanelStore((store) => store);
