import { COMBINED_ENCHANTMENT_MAP, COMBINED_ITEM_MAP } from "@/resources/maps";

// Stat fields shared by wearables (armor/shields/accessories/clothing) and
// damaging items (weapons/ammo). Parents are looked up across all items
// because variants reference bases within the same container family.
type ItemStatFields = {
  soak: number;
  encumberance: number;
  minDamage: number;
  maxDamage: number;
  hitBonus: number;
  crit: number;
  weight: number;
  weightCategory: string;
  weaponType: string;
  damageType: string[];
};

const getParentStatFields = (parentId: string) =>
  parentId
    ? (COMBINED_ITEM_MAP.get(parentId) as Partial<ItemStatFields> | undefined)
    : undefined;

const getEnchantment = (enchantmentId: string) =>
  enchantmentId ? COMBINED_ENCHANTMENT_MAP.get(enchantmentId) : undefined;

export type WearableStatsSource = {
  soak: number;
  encumberance: number;
  weightCategory: string;
  parent: string;
  enchantment: string;
};

export type ResolvedWearableStats = {
  soak: number;
  encumbrance: number;
  weightCategory: string;
};

// own + parent (single level) + enchantment deltas, floored at 0
// (ItemArmorBase.getSoak / getEncumbrance / getWeightCategory)
export const resolveWearableStats = (
  item: WearableStatsSource,
): ResolvedWearableStats => {
  const parent = getParentStatFields(item.parent);
  const enchantment = getEnchantment(item.enchantment);

  return {
    soak: Math.max(
      0,
      item.soak + (parent?.soak ?? 0) + (enchantment?.soak ?? 0),
    ),
    encumbrance: Math.max(
      0,
      item.encumberance +
        (parent?.encumberance ?? 0) +
        (enchantment?.encumberance ?? 0),
    ),
    weightCategory: item.weightCategory || parent?.weightCategory || "",
  };
};

export type DamagingStatsSource = {
  minDamage: number;
  maxDamage: number;
  hitBonus: number;
  crit: number;
  weightCategory: string;
  weaponType?: string;
  damageType: string[];
  parent: string;
  enchantment: string;
};

export type ResolvedDamagingStats = {
  minDamage: number;
  maxDamage: number;
  hitBonus: number;
  crit: number;
  weightCategory: string;
  weaponType: string;
  damageType: string[];
};

export const resolveDamagingStats = (
  item: DamagingStatsSource,
): ResolvedDamagingStats => {
  const parent = getParentStatFields(item.parent);
  const enchantment = getEnchantment(item.enchantment);

  // Damage/hit fold in parent and enchantment deltas only when a parent id is
  // set (ItemDamaging.getMinDamage et al. return early without one); crit has
  // no such gate (ItemDamaging.getCritMultiplier).
  const addDeltas = (own: number, parentValue = 0, enchantmentValue = 0) =>
    item.parent === "" ? own : own + parentValue + enchantmentValue;

  return {
    minDamage: addDeltas(
      item.minDamage,
      parent?.minDamage,
      enchantment?.minDamage,
    ),
    maxDamage: addDeltas(
      item.maxDamage,
      parent?.maxDamage,
      enchantment?.maxDamage,
    ),
    hitBonus: addDeltas(item.hitBonus, parent?.hitBonus, enchantment?.hitBonus),
    crit: item.crit + (parent?.crit ?? 0) + (enchantment?.crit ?? 0),
    weightCategory: item.weightCategory || parent?.weightCategory || "",
    weaponType: item.weaponType || parent?.weaponType || "",
    // own, then parent's and enchantment's, deduped in order
    // (ItemDamaging.getDamageTypes)
    damageType: [
      ...new Set([
        ...item.damageType,
        ...(parent?.damageType ?? []),
        ...(enchantment?.damageType ?? []),
      ]),
    ],
  };
};

// weight sums the parent's (Item.getWeight) — quality variants carry 0 with
// the real weight on the base item
export const resolveItemWeight = (item: {
  weight: number;
  parent: string;
}): number => item.weight + (getParentStatFields(item.parent)?.weight ?? 0);

// Inventory stat comparison: a shown item's stat against the item worn in the
// same slot. Higher wins for accuracy/damage/soak/crit; encumbrance is
// reversed (lower wins). Mirrors the game's Item.makeComparativeColorTag family
// (and its reversed variant) — equal stats are neutral and shown without a
// "Vs" suffix.
export type StatComparison = "better" | "worse" | "equal";

export const compareStat = (
  value: number,
  against: number,
  lowerIsBetter = false,
): StatComparison => {
  if (value === against) return "equal";

  const isBetter = lowerIsBetter ? value < against : value > against;

  return isBetter ? "better" : "worse";
};

// the enchantment multiplies the item's own value and adds its base price,
// rounded (Item.getValue); parents are not consulted
export const resolveItemValue = (item: {
  value: number;
  enchantment: string;
}): number => {
  const enchantment = getEnchantment(item.enchantment);

  if (!enchantment) return item.value;

  return Math.round(
    item.value * enchantment.valueMultiplier + enchantment.basePrice,
  );
};
