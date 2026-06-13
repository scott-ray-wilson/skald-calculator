import {
  ACCESSORY_ENCHANTMENT_LIST,
  ACCESSORY_LIST,
  ARMOR_ENCHANTMENT_LIST,
  ARMOR_LIST,
  GENERAL_ENCHANTMENT_LIST,
  JEWELRY_ENCHANTMENT_LIST,
  JEWELRY_LIST,
  MELEE_WEAPON_LIST,
  RANGED_WEAPON_LIST,
  SHIELD_ENCHANTMENT_LIST,
  SHIELD_LIST,
  WEAPON_ENCHANTMENT_LIST,
} from "@/resources/lists";

/*
 * The game does not roll enchantments at runtime: on startup it generates a
 * concrete item for every enchantment x applicable base item and appends it
 * to the item containers (MagicItemMaker.createMagicItems). Generated ids are
 * `baseId + enchantmentId-minus-"ECH_"`, so they are real, stable in-game
 * item ids and safe to reference from shared builds.
 */

const APPLICABLE_ENCHANTMENT_LIST = [
  ...ACCESSORY_ENCHANTMENT_LIST,
  ...ARMOR_ENCHANTMENT_LIST,
  ...GENERAL_ENCHANTMENT_LIST,
  ...JEWELRY_ENCHANTMENT_LIST,
  ...SHIELD_ENCHANTMENT_LIST,
  ...WEAPON_ENCHANTMENT_LIST,
];

type EnchantableItem = {
  id: string;
  title: string;
  enchantment: string;
};

type Enchantment = (typeof APPLICABLE_ENCHANTMENT_LIST)[number];

// In-game display names compose the enchantment affixes around the base
// title (Item.getName)
const composeEnchantedTitle = (title: string, enchantment: Enchantment) =>
  [enchantment.prefix, title, enchantment.suffix]
    .filter((part) => part !== "")
    .join(" ");

const generateEnchantedItems = <T extends EnchantableItem>(
  baseList: T[],
): T[] => {
  const baseItemMap = new Map(baseList.map((item) => [item.id, item]));

  return APPLICABLE_ENCHANTMENT_LIST.flatMap((enchantment) =>
    enchantment.applicableItems.flatMap((baseItemId) => {
      const baseItem = baseItemMap.get(baseItemId);

      if (!baseItem) return [];

      const enchantedItem: T = {
        ...baseItem,
        id: baseItem.id + enchantment.id.slice(4),
        title: composeEnchantedTitle(baseItem.title, enchantment),
        enchantment: enchantment.id,
      };

      return [enchantedItem];
    }),
  );
};

// the game only generates enchanted variants for these six containers
export const ENCHANTED_MELEE_WEAPON_LIST =
  generateEnchantedItems(MELEE_WEAPON_LIST);
export const ENCHANTED_RANGED_WEAPON_LIST =
  generateEnchantedItems(RANGED_WEAPON_LIST);
export const ENCHANTED_SHIELD_LIST = generateEnchantedItems(SHIELD_LIST);
export const ENCHANTED_ARMOR_LIST = generateEnchantedItems(ARMOR_LIST);
export const ENCHANTED_ACCESSORY_LIST = generateEnchantedItems(ACCESSORY_LIST);
export const ENCHANTED_JEWELRY_LIST = generateEnchantedItems(JEWELRY_LIST);
