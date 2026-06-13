import { EquipmentSlotId } from "@/resources/equipment/constants";

type ClassProficiencySource = {
  allowedArmors: string[];
  allowedWeaponTypes: string[];
  allowedWeaponWeights: string[];
};

export type ClassPermissions = {
  allowedArmors: string[];
  allowedWeaponTypes: string[];
  allowedWeaponWeights: string[];
};

export type EquipLegality =
  | { allowed: true }
  | { allowed: false; reason: string };

const ALLOWED: EquipLegality = { allowed: true };

const denied = (reason: string): EquipLegality => ({ allowed: false, reason });

const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

// permissions accumulate from both the subclass and its archetype
// (CharacterClass ctor calls updateAllowedItems with both raw datas)
export const getClassPermissions = (
  characterClass: ClassProficiencySource,
  archetypeClass: ClassProficiencySource,
): ClassPermissions => ({
  allowedArmors: union(
    characterClass.allowedArmors,
    archetypeClass.allowedArmors,
  ),
  allowedWeaponTypes: union(
    characterClass.allowedWeaponTypes,
    archetypeClass.allowedWeaponTypes,
  ),
  allowedWeaponWeights: union(
    characterClass.allowedWeaponWeights,
    archetypeClass.allowedWeaponWeights,
  ),
});

// Check order and message strings (typos included) match
// CharacterFeature.isWeaponAllowed. Only Blade/Axe/Bow/Club types are ever
// checked — Polearms and Crossbows pass the type gate unconditionally.
const WEAPON_TYPE_DENIALS: [type: string, reason: string][] = [
  ["Blade", "Blades can't be equipped by this Class."],
  ["Axe", "Axes Weapons can't be equipped by this Class."],
  ["Bow", "Bows can't be equipped by this Class."],
  ["Club", "Clubs Weapons can't be equipped by this Class."],
];

export const getWeaponLegality = (
  permissions: ClassPermissions,
  weapon: { weightCategory: string; weaponType: string },
): EquipLegality => {
  for (const weight of ["Heavy", "Medium", "Light"]) {
    if (
      weapon.weightCategory === weight &&
      !permissions.allowedWeaponWeights.includes(weight)
    ) {
      return denied(`${weight} Weapons can't be equipped by this Class.`);
    }
  }

  for (const [type, reason] of WEAPON_TYPE_DENIALS) {
    if (
      weapon.weaponType === type &&
      !permissions.allowedWeaponTypes.includes(type)
    ) {
      return denied(reason);
    }
  }

  return ALLOWED;
};

export const getArmorLegality = (
  permissions: ClassPermissions,
  armor: { weightCategory: string },
): EquipLegality => {
  for (const weight of ["Heavy", "Medium", "Light"]) {
    if (
      armor.weightCategory === weight &&
      !permissions.allowedArmors.includes(weight)
    ) {
      return denied(`${weight} Armor can't be equipped by this Class.`);
    }
  }

  return ALLOWED;
};

// Only weapons and armor are class-gated (Character.isItemLegalToEquip);
// shields, accessories, clothing and jewelry are equippable by any class.
export const getEquipLegality = (
  permissions: ClassPermissions,
  slotId: EquipmentSlotId,
  resolvedItem: { weightCategory: string; weaponType?: string },
): EquipLegality => {
  switch (slotId) {
    case "meleeWeapon":
    case "rangedWeapon":
      return getWeaponLegality(permissions, {
        weightCategory: resolvedItem.weightCategory,
        weaponType: resolvedItem.weaponType ?? "",
      });
    case "armor":
      return getArmorLegality(permissions, resolvedItem);
    default:
      return ALLOWED;
  }
};
