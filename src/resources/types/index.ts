import {
  ADDITION_ABILITY_MAP,
  ARCHETYPE_CLASS_MAP,
  ARMOR_BONUS_MAP,
  BACKGROUND_MAP,
  CHARACTER_MAP,
  CLASS_MAP,
  COMBAT_MANEUVER_MAP,
  COMBINED_ABILITY_MAP,
  COMBINED_ATTRIBUTE_MAP,
  COMBINED_CONDITION_MAP,
  COMBINED_ENCHANTMENT_MAP,
  COMBINED_ITEM_MAP,
  COMBINED_RECIPE_MAP,
  CONSUMABLE_MAP,
  FEAT_MAP,
  FOOD_MAP,
  RULES_TOOLTIP_MAP,
  SPELL_MAP,
  TRIGGERED_ABILITY_MAP,
} from "@/resources/maps";
import { ADVENTURING_ITEM_LIST, KEYWORD_MAP } from "@/resources";

type MapValueType<A> = A extends Map<unknown, infer V> ? V : never;

// Data Types
export type AdditionAbilityType = MapValueType<typeof ADDITION_ABILITY_MAP>;
export type AbilityType = MapValueType<typeof COMBINED_ABILITY_MAP>;
export type ArmorBonusType = MapValueType<typeof ARMOR_BONUS_MAP>;
export type ArchetypeClassType = MapValueType<typeof ARCHETYPE_CLASS_MAP>;
export type AttributeType = MapValueType<typeof COMBINED_ATTRIBUTE_MAP>;
export type BackgroundType = MapValueType<typeof BACKGROUND_MAP>;
export type CharacterType = MapValueType<typeof CHARACTER_MAP>;
export type ClassType = MapValueType<typeof CLASS_MAP>;
export type ConditionType = MapValueType<typeof COMBINED_CONDITION_MAP>;
export type FeatType = MapValueType<typeof FEAT_MAP>;
export type FoodType = MapValueType<typeof FOOD_MAP>;
export type ConsumableType = MapValueType<typeof CONSUMABLE_MAP>;
export type RecipeType = MapValueType<typeof COMBINED_RECIPE_MAP>;
export type EnchantmentType = MapValueType<typeof COMBINED_ENCHANTMENT_MAP>;
export type ItemType = MapValueType<typeof COMBINED_ITEM_MAP>;
export type KeywordType = MapValueType<typeof KEYWORD_MAP>;
export type RulesTooltipType = MapValueType<typeof RULES_TOOLTIP_MAP>;
export type SpellType = MapValueType<typeof SPELL_MAP>;
export type CombatManeuverType = MapValueType<typeof COMBAT_MANEUVER_MAP>;
export type TriggeredAbilityType = MapValueType<typeof TRIGGERED_ABILITY_MAP>;
export type AdventuringItemType = (typeof ADVENTURING_ITEM_LIST)[number];
