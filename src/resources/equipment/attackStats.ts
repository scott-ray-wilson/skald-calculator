import { COMBINED_ITEM_MAP } from "@/resources/maps";
import { ResolvedDamagingStats } from "@/resources/equipment/resolveItemStats";

/*
 * The inventory sheet's To Hit and damage range are full character attack
 * stats, not weapon-card values (Character.printInventorySummary):
 *
 *   To Hit  = Melee/Ranged skill + weapon accuracy + usable-ammo accuracy
 *             + hidden weapon-type and weight hit attributes
 *             (Character.getAdjustedAttackSkill)
 *   Damage  = weapon range + usable-ammo range, both ends raised by the
 *             STR-rooted Melee Dmg. attribute (melee only) + the hidden
 *             general/type/weight damage attributes
 *             (Character.calculateWeaponAndUnarmedDamageBonus; the charge
 *             term only exists mid-combat)
 *
 * The hidden attributes are zero-base with no root ability, so feats,
 * background and conferred item passives are their entire value. Weapon type
 * "Crossbow" has no type attribute in either sum — crossbows only receive
 * the general and weight bonuses.
 */

const WEAPON_TYPE_HIT_ATTRIBUTE_IDS: Record<string, string> = {
  Axe: "ATT_HitWeaponAxes",
  Blade: "ATT_HitWeaponSwords",
  Bow: "ATT_HitWeaponBows",
  Club: "ATT_HitWeaponClubs",
  Polearm: "ATT_HitWeaponPolearms",
};

const WEAPON_WEIGHT_HIT_ATTRIBUTE_IDS: Record<string, string> = {
  Light: "ATT_HitWeaponLight",
  Medium: "ATT_HitWeaponMedium",
  Heavy: "ATT_HitWeaponHeavy",
};

const WEAPON_TYPE_DAMAGE_ATTRIBUTE_IDS: Record<string, string> = {
  Axe: "ATT_DmgWeaponAxes",
  Blade: "ATT_DmgWeaponSwords",
  Bow: "ATT_DmgWeaponBows",
  Club: "ATT_DmgWeaponClubs",
  Polearm: "ATT_DmgWeaponPolearms",
};

const WEAPON_WEIGHT_DAMAGE_ATTRIBUTE_IDS: Record<string, string> = {
  Light: "ATT_DmgWeaponLight",
  Medium: "ATT_DmgWeaponMedium",
  Heavy: "ATT_DmgWeaponHeavy",
};

export const MELEE_ATTACK_SKILL_ATTRIBUTE_ID = "ATT_Melee";
export const RANGED_ATTACK_SKILL_ATTRIBUTE_ID = "ATT_Ranged";
export const MELEE_DAMAGE_BONUS_ATTRIBUTE_ID = "ATT_DamageBonus";

type WeaponTypeAndWeight = Pick<
  ResolvedDamagingStats,
  "weaponType" | "weightCategory"
>;

const definedIds = (ids: (string | undefined)[]) =>
  ids.filter((id): id is string => id !== undefined);

// hit attribute ids for the wielded weapon; null = unarmed
export const getWeaponHitAttributeIds = (
  weapon: WeaponTypeAndWeight | null,
): string[] => {
  if (!weapon) return ["ATT_HitWeaponUnarmed"];

  return definedIds([
    WEAPON_TYPE_HIT_ATTRIBUTE_IDS[weapon.weaponType],
    WEAPON_WEIGHT_HIT_ATTRIBUTE_IDS[weapon.weightCategory],
  ]);
};

// damage attribute ids for the wielded weapon; unarmed strikes count as
// melee (Character.isWeaponRanged is false without a weapon)
export const getWeaponDamageAttributeIds = (
  weapon: WeaponTypeAndWeight | null,
  isRanged: boolean,
): string[] => {
  if (!weapon) return ["ATT_DmgGeneralMelee", "ATT_DmgGeneralUnarmed"];

  return definedIds([
    isRanged ? "ATT_DmgGeneralRanged" : "ATT_DmgGeneralMelee",
    WEAPON_TYPE_DAMAGE_ATTRIBUTE_IDS[weapon.weaponType],
    WEAPON_WEIGHT_DAMAGE_ATTRIBUTE_IDS[weapon.weightCategory],
  ]);
};

export type AmmoRequiringSource = { ammo?: string; parent: string };
export type AmmoTypeSource = { ammoType?: string };

// the ammo type a ranged weapon fires, falling back to the parent like the
// other stat fields; "" = the weapon needs no ammo
// (ItemRangedWeapon.getAmmoType)
export const resolveRequiredAmmoType = (
  weapon: AmmoRequiringSource,
): string => {
  if (weapon.ammo) return weapon.ammo;

  const parent = weapon.parent
    ? (COMBINED_ITEM_MAP.get(weapon.parent) as AmmoRequiringSource | undefined)
    : undefined;

  return parent?.ammo ?? "";
};

// equipped ammo only contributes accuracy and damage when the wielded weapon
// needs ammo and the types agree (Character.needsAmmo / hasAmmo)
export const getUsableAmmo = <T extends object>(
  weapon: AmmoRequiringSource,
  ammo: T | null,
): T | null => {
  const requiredAmmoType = resolveRequiredAmmoType(weapon);
  const ammoType =
    ammo && "ammoType" in ammo
      ? (ammo as AmmoTypeSource).ammoType
      : undefined;

  if (!requiredAmmoType || ammoType !== requiredAmmoType) return null;

  return ammo;
};
