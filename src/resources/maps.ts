import { generateMap } from "@/resources/utils";
import {
  ACCESSORY_LIST,
  ADDITION_ABILITY_LIST,
  ALCHEMY_RECIPE_LIST,
  AMMO_LIST,
  ARCHETYPE_CLASS_LIST,
  ARMOR_BONUS_LIST,
  ARMOR_LIST,
  BACKGROUND_LIST,
  CHARACTER_LIST,
  CLASS_LIST,
  CLERIC_FEAT_LIST,
  COMBAT_ATTRIBUTE_LIST,
  COMBAT_MANEUVER_LIST,
  COMBINED_ABILITY_LIST,
  COMBINED_ATTRIBUTES_LIST,
  COMBINED_CONDITION_LIST,
  COMBINED_EFFECT_LIST,
  COMBINED_ENCHANTMENT_LIST,
  COMBINED_ITEM_LIST,
  COMBINED_WEAPON_LIST,
  CONDITION_RESISTANCE_LIST,
  CONSUMABLE_LIST,
  DEFENCE_ATTRIBUTE_LIST,
  FOOD_LIST,
  FOOD_RECIPE_LIST,
  JEWELRY_LIST,
  MAGIC_ATTRIBUTE_LIST,
  MAGIC_SCHOOL_LIST,
  MAGOS_FEAT_LIST,
  MONSTER_LIST,
  PLAYER_PORTRAIT_LIST,
  PRIMARY_ATTRIBUTE_LIST,
  REAGENT_LIST,
  ROGUE_FEAT_LIST,
  RULES_TOOLTIP_LIST,
  SECONDARY_ATTRIBUTE_LIST,
  SHIELD_LIST,
  SKILL_LIST,
  SPELL_LIST,
  TRIGGERED_ABILITY_LIST,
  WANDERER_FEAT_LIST,
  WARRIOR_FEAT_LIST,
} from "@/resources/lists";
import BackgroundImage from "@/assets/sprites/portraits/Background.png";
import KatPortrait from "@/assets/sprites/portraits/Kat.png";
import DriinaPortrait from "@/assets/sprites/portraits/Driina.png";
import IagoPortrait from "@/assets/sprites/portraits/Iago.png";
import IbenPortrait from "@/assets/sprites/portraits/Iben.png";
import EmblaPortrait from "@/assets/sprites/portraits/Embla.png";
import RolandPortrait from "@/assets/sprites/portraits/Roland.png";

// Attributes
export const ARMOR_BONUS_MAP = generateMap(ARMOR_BONUS_LIST);
export const COMBAT_ATTRIBUTE_MAP = generateMap(COMBAT_ATTRIBUTE_LIST);
export const COMBINED_ATTRIBUTE_MAP = generateMap(COMBINED_ATTRIBUTES_LIST);
export const COMBINED_CONDITION_MAP = generateMap(COMBINED_CONDITION_LIST);
export const CONDITION_RESISTANCE_MAP = generateMap(CONDITION_RESISTANCE_LIST);
export const DEFENCE_ATTRIBUTE_MAP = generateMap(DEFENCE_ATTRIBUTE_LIST);
export const MAGIC_ATTRIBUTE_MAP = generateMap(MAGIC_ATTRIBUTE_LIST);
export const MAGIC_SCHOOL_MAP = generateMap(MAGIC_SCHOOL_LIST);
export const PRIMARY_ATTRIBUTE_MAP = generateMap(PRIMARY_ATTRIBUTE_LIST);
export const SECONDARY_ATTRIBUTE_MAP = generateMap(SECONDARY_ATTRIBUTE_LIST);

// Abilities
export const ADDITION_ABILITY_MAP = generateMap(ADDITION_ABILITY_LIST);
export const COMBAT_MANEUVER_MAP = generateMap(COMBAT_MANEUVER_LIST);
export const COMBINED_ABILITY_MAP = generateMap(COMBINED_ABILITY_LIST);
export const SPELL_MAP = generateMap(SPELL_LIST);
export const TRIGGERED_ABILITY_MAP = generateMap(TRIGGERED_ABILITY_LIST);

// Classes
export const ARCHETYPE_CLASS_MAP = generateMap(ARCHETYPE_CLASS_LIST);
export const CLASS_MAP = generateMap(CLASS_LIST);

// Backgrounds
export const BACKGROUND_MAP = generateMap(BACKGROUND_LIST);

// Characters
export const CHARACTER_MAP = generateMap(CHARACTER_LIST);
export const MONSTER_MAP = generateMap(MONSTER_LIST);

// Effects
export const COMBINED_EFFECT_MAP = generateMap(COMBINED_EFFECT_LIST);

// Feats
export const FEAT_MAP = generateMap([
  ...CLERIC_FEAT_LIST,
  ...MAGOS_FEAT_LIST,
  ...WANDERER_FEAT_LIST,
  ...WARRIOR_FEAT_LIST,
  ...ROGUE_FEAT_LIST,
]);

// RECIPES
export const FOOD_RECIPE_MAP = generateMap(FOOD_RECIPE_LIST);
export const ALCHEMY_RECIPE_MAP = generateMap(ALCHEMY_RECIPE_LIST);
export const COMBINED_RECIPE_MAP = generateMap([
  ...FOOD_RECIPE_LIST,
  ...ALCHEMY_RECIPE_LIST,
]);

// ITEMS
export const ACCESSORY_MAP = generateMap(ACCESSORY_LIST);
export const AMMO_MAP = generateMap(AMMO_LIST);
export const ARMOR_MAP = generateMap(ARMOR_LIST);
export const COMBINED_ITEM_MAP = generateMap(COMBINED_ITEM_LIST);
export const COMBINED_WEAPON_MAP = generateMap(COMBINED_WEAPON_LIST);
export const CONSUMABLE_MAP = generateMap(CONSUMABLE_LIST);
export const FOOD_MAP = generateMap(FOOD_LIST);
export const JEWELRY_MAP = generateMap(JEWELRY_LIST);
export const REAGENT_MAP = generateMap(REAGENT_LIST);
export const SHIELD_MAP = generateMap(SHIELD_LIST);

// ENCHANTMENT
export const COMBINED_ENCHANTMENT_MAP = generateMap(COMBINED_ENCHANTMENT_LIST);

// Skills
export const SKILL_MAP = generateMap(SKILL_LIST);

// Tooltips
export const RULES_TOOLTIP_MAP = generateMap(RULES_TOOLTIP_LIST);

// Portraits
const PLAYER_PORTRAIT_MAP = new Map(
  PLAYER_PORTRAIT_LIST.map(({ portrait, id }) => [id, portrait]),
);

export const PORTRAIT_MAP = new Map([
  [undefined, BackgroundImage],
  ["custom", PLAYER_PORTRAIT_LIST[0].portrait],
  ["CHA_Kat", KatPortrait],
  ["CHA_Driina", DriinaPortrait],
  ["CHA_Roland", DriinaPortrait],
  ["CHA_Iago", IagoPortrait],
  ["CHA_Iben", IbenPortrait],
  ["CHA_Embla", EmblaPortrait],
  ["CHA_Roland", RolandPortrait],
  ...PLAYER_PORTRAIT_MAP,
]);
