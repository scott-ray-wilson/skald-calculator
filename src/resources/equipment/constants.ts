// Mirrors the game's per-character equipment slots (Character.ItemSlots).
// The game also has an "idle" slot; it is omitted here because no idle item
// affects build stats.
export const EQUIPMENT_SLOT_IDS = [
  "meleeWeapon",
  "rangedWeapon",
  "ammo",
  "armor",
  "shield",
  "head",
  "gloves",
  "boots",
  "clothing",
  "necklace",
  "ring",
  "light",
] as const;

export type EquipmentSlotId = (typeof EQUIPMENT_SLOT_IDS)[number];

export const EQUIPMENT_SLOT_LABELS: Record<EquipmentSlotId, string> = {
  meleeWeapon: "Melee Weapon",
  rangedWeapon: "Ranged Weapon",
  ammo: "Ammunition",
  armor: "Armor",
  shield: "Shield",
  head: "Headwear",
  gloves: "Gloves",
  boots: "Footwear",
  clothing: "Outfit",
  necklace: "Necklace",
  ring: "Ring",
  light: "Light",
};

// Weight-category mastery attributes that reduce worn-armor encumbrance
// (Character.getArmorEncumberance).
export const ARMOR_MASTERY_ATTRIBUTE_IDS = {
  Light: "ATT_ArmEncLight",
  Medium: "ATT_ArmEncMedium",
  Heavy: "ATT_ArmEncHeavy",
} as const;

export const SHIELD_DODGE_ATTRIBUTE_ID = "ATT_ArmDodgeShield";
export const UNARMORED_DODGE_ATTRIBUTE_ID = "ATT_ArmDodgeUnarmored";
