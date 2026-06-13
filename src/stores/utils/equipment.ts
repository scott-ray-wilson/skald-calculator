import { EquipmentSchemaType, PartyMemberSchemaType } from "@/schemas/types";
import {
  ClassPermissions,
  DamagingStatsSource,
  EQUIPMENT_SLOT_IDS,
  EQUIPPABLE_ITEM_MAP,
  EquipLegality,
  EquipmentSlotId,
  EquippableItemType,
  WearableStatsSource,
  getClassPermissions,
  getEquipLegality,
  resolveDamagingStats,
  resolveWearableStats,
} from "@/resources";
import { getPartyMemberState } from "@/stores/utils/getPartyMemberState";

// item equipped in a slot, or null when the stored id is unknown or belongs
// to a different slot (defensive against stale ids in imported builds)
export const getEquippedItem = (
  equipment: EquipmentSchemaType | undefined,
  slotId: EquipmentSlotId,
): EquippableItemType | null => {
  const itemId = equipment?.[slotId];

  if (!itemId) return null;

  const entry = EQUIPPABLE_ITEM_MAP.get(itemId);

  if (!entry || entry.slotId !== slotId) return null;

  return entry.item;
};

export const getEquippedItemList = (
  equipment: EquipmentSchemaType | undefined,
): EquippableItemType[] =>
  EQUIPMENT_SLOT_IDS.map((slotId) => getEquippedItem(equipment, slotId)).filter(
    (item): item is EquippableItemType => item !== null,
  );

// class legality for an item in a slot; only weapons and armor are gated, and
// their weight/type must be resolved through parent/enchantment first
export const getSlotLegality = (
  permissions: ClassPermissions,
  slotId: EquipmentSlotId,
  item: EquippableItemType,
): EquipLegality => {
  if (slotId === "meleeWeapon" || slotId === "rangedWeapon") {
    const { weightCategory, weaponType } = resolveDamagingStats(
      item as DamagingStatsSource,
    );

    return getEquipLegality(permissions, slotId, { weightCategory, weaponType });
  }

  if (slotId === "armor") {
    const { weightCategory } = resolveWearableStats(
      item as WearableStatsSource,
    );

    return getEquipLegality(permissions, slotId, { weightCategory });
  }

  return { allowed: true };
};

export const getPartyMemberPermissions = (
  partyMember: PartyMemberSchemaType,
): ClassPermissions => {
  const { class: characterClass, archetypeClass } =
    getPartyMemberState(partyMember);

  return getClassPermissions(characterClass, archetypeClass);
};

// item physically sitting in a slot together with its class legality —
// illegal gear stays worn (shown on a red tile) but contributes nothing
export type WornItem = {
  item: EquippableItemType;
  legality: EquipLegality;
};

export const getWornItem = (
  partyMember: PartyMemberSchemaType,
  slotId: EquipmentSlotId,
): WornItem | null => {
  const item = getEquippedItem(partyMember.equipment, slotId);

  if (!item) return null;

  return {
    item,
    legality: getSlotLegality(
      getPartyMemberPermissions(partyMember),
      slotId,
      item,
    ),
  };
};

// the gear that actually contributes stats: worn AND legal for the class
export const getActiveItem = (
  partyMember: PartyMemberSchemaType,
  slotId: EquipmentSlotId,
): EquippableItemType | null => {
  const worn = getWornItem(partyMember, slotId);

  return worn?.legality.allowed ? worn.item : null;
};

export const getActiveItemList = (
  partyMember: PartyMemberSchemaType,
): EquippableItemType[] =>
  EQUIPMENT_SLOT_IDS.map((slotId) => getActiveItem(partyMember, slotId)).filter(
    (item): item is EquippableItemType => item !== null,
  );

// drops unknown and wrong-slot ids from imported builds; class-illegal gear
// is kept — unlike the game, it stays worn here and is just rendered inert
export const pruneStaleEquipment = (
  equipment: EquipmentSchemaType | undefined,
): EquipmentSchemaType => {
  const pruned: EquipmentSchemaType = {};

  EQUIPMENT_SLOT_IDS.forEach((slotId) => {
    const item = getEquippedItem(equipment, slotId);

    if (item) pruned[slotId] = item.id;
  });

  return pruned;
};
