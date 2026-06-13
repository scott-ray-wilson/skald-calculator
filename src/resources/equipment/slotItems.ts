import {
  ACCESSORY_LIST,
  ADVENTURING_ITEM_LIST,
  AMMO_LIST,
  ARMOR_LIST,
  CLOTHING_LIST,
  JEWELRY_LIST,
  MELEE_WEAPON_LIST,
  RANGED_WEAPON_LIST,
  SHIELD_LIST,
} from "@/resources/lists";
import {
  ENCHANTED_ACCESSORY_LIST,
  ENCHANTED_ARMOR_LIST,
  ENCHANTED_JEWELRY_LIST,
  ENCHANTED_MELEE_WEAPON_LIST,
  ENCHANTED_RANGED_WEAPON_LIST,
  ENCHANTED_SHIELD_LIST,
} from "@/resources/equipment/enchantedItems";
import { EquipmentSlotId } from "@/resources/equipment/constants";

// Slot routing mirrors the game's item factory: accessories split by `slot`
// ("Head" | "Hands" | "Feet"), jewelry by `slotJewelry` ("Neck" | "Finger").
// The raw `equipable` field is ignored — the game never reads it (equippable
// is decided by item class), and real gear like chainmail carries `false`.
const ACCESSORIES = [...ACCESSORY_LIST, ...ENCHANTED_ACCESSORY_LIST];
const JEWELRY = [...JEWELRY_LIST, ...ENCHANTED_JEWELRY_LIST];

export const EQUIPPABLE_MELEE_WEAPON_LIST = [
  ...MELEE_WEAPON_LIST,
  ...ENCHANTED_MELEE_WEAPON_LIST,
];
export const EQUIPPABLE_RANGED_WEAPON_LIST = [
  ...RANGED_WEAPON_LIST,
  ...ENCHANTED_RANGED_WEAPON_LIST,
];
export const EQUIPPABLE_AMMO_LIST = [...AMMO_LIST];
export const EQUIPPABLE_ARMOR_LIST = [...ARMOR_LIST, ...ENCHANTED_ARMOR_LIST];
export const EQUIPPABLE_SHIELD_LIST = [
  ...SHIELD_LIST,
  ...ENCHANTED_SHIELD_LIST,
];
export const EQUIPPABLE_HEAD_LIST = ACCESSORIES.filter(
  (item) => item.slot === "Head",
);
export const EQUIPPABLE_GLOVES_LIST = ACCESSORIES.filter(
  (item) => item.slot === "Hands",
);
export const EQUIPPABLE_BOOTS_LIST = ACCESSORIES.filter(
  (item) => item.slot === "Feet",
);
export const EQUIPPABLE_CLOTHING_LIST = [...CLOTHING_LIST];
export const EQUIPPABLE_NECKLACE_LIST = JEWELRY.filter(
  (item) => item.slotJewelry === "Neck",
);
export const EQUIPPABLE_RING_LIST = JEWELRY.filter(
  (item) => item.slotJewelry === "Finger",
);
// adventuring items with a light radius become ItemLight (GameData factory)
export const EQUIPPABLE_LIGHT_LIST = ADVENTURING_ITEM_LIST.filter(
  (item) => item.light > 0,
);

export type EquippableItemType =
  | (typeof EQUIPPABLE_MELEE_WEAPON_LIST)[number]
  | (typeof EQUIPPABLE_RANGED_WEAPON_LIST)[number]
  | (typeof EQUIPPABLE_AMMO_LIST)[number]
  | (typeof EQUIPPABLE_ARMOR_LIST)[number]
  | (typeof EQUIPPABLE_SHIELD_LIST)[number]
  | (typeof EQUIPPABLE_HEAD_LIST)[number]
  | (typeof EQUIPPABLE_CLOTHING_LIST)[number]
  | (typeof EQUIPPABLE_NECKLACE_LIST)[number]
  | (typeof EQUIPPABLE_LIGHT_LIST)[number];

export const EQUIPMENT_SLOT_ITEMS: Record<
  EquipmentSlotId,
  EquippableItemType[]
> = {
  meleeWeapon: EQUIPPABLE_MELEE_WEAPON_LIST,
  rangedWeapon: EQUIPPABLE_RANGED_WEAPON_LIST,
  ammo: EQUIPPABLE_AMMO_LIST,
  armor: EQUIPPABLE_ARMOR_LIST,
  shield: EQUIPPABLE_SHIELD_LIST,
  head: EQUIPPABLE_HEAD_LIST,
  gloves: EQUIPPABLE_GLOVES_LIST,
  boots: EQUIPPABLE_BOOTS_LIST,
  clothing: EQUIPPABLE_CLOTHING_LIST,
  necklace: EQUIPPABLE_NECKLACE_LIST,
  ring: EQUIPPABLE_RING_LIST,
  light: EQUIPPABLE_LIGHT_LIST,
};

export const EQUIPPABLE_ITEM_MAP = new Map(
  Object.entries(EQUIPMENT_SLOT_ITEMS).flatMap(([slotId, items]) =>
    items.map((item) => [
      item.id,
      { slotId: slotId as EquipmentSlotId, item },
    ]),
  ),
);
