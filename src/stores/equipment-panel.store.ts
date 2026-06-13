import { create } from "zustand";
import { EquipmentSlotId } from "@/resources";
import { WieldedWeaponSlotId } from "@/stores/types";

type EquipmentPanelState = {
  // Which equipped weapon the character is currently holding. Both weapons
  // stay equipped (the game swaps between them in combat) but shield benefits
  // are suppressed while the wielded one is two-handed — every bow is.
  wieldedSlotId: WieldedWeaponSlotId;
  setWieldedSlotId: (wieldedSlotId: WieldedWeaponSlotId) => void;

  // slot being configured in the equipment tab
  selectedSlotId: EquipmentSlotId;
  setSelectedSlotId: (slotId: EquipmentSlotId) => void;

  // item previewed in the slot picker (null shows the equipped item)
  pickerItemId: string | null;
  setPickerItemId: (itemId: string | null) => void;

  pickerFilter: string;
  setPickerFilter: (pickerFilter: string) => void;
};

const useEquipmentPanelStore = create<EquipmentPanelState>()((set) => ({
  wieldedSlotId: "meleeWeapon",
  setWieldedSlotId: (wieldedSlotId) => set({ wieldedSlotId }),
  selectedSlotId: "meleeWeapon",
  // selecting a weapon slot also wields it
  setSelectedSlotId: (selectedSlotId) =>
    set((state) => ({
      selectedSlotId,
      pickerItemId: null,
      wieldedSlotId:
        selectedSlotId === "meleeWeapon" || selectedSlotId === "rangedWeapon"
          ? selectedSlotId
          : state.wieldedSlotId,
    })),
  pickerItemId: null,
  setPickerItemId: (pickerItemId) => set({ pickerItemId }),
  pickerFilter: "",
  setPickerFilter: (pickerFilter) => set({ pickerFilter }),
}));

export const useEquipmentPanel = () =>
  useEquipmentPanelStore((store) => store);
