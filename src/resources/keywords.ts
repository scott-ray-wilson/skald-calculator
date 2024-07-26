import {
  ADDITION_ABILITY_LIST,
  ARCHETYPE_CLASS_LIST,
  ARMOR_BONUS_LIST,
  COMBAT_ATTRIBUTE_LIST,
  COMBAT_MANEUVER_LIST,
  COMBINED_CONDITION_LIST,
  COMBINED_ENCHANTMENT_LIST,
  CONDITION_RESISTANCE_LIST,
  CONSUMABLE_LIST,
  DAMAGE_BONUS_LIST,
  DAMAGE_RESISTANCE_LIST,
  DEFENCE_ATTRIBUTE_LIST,
  FOOD_LIST,
  HIT_BONUS_LIST,
  MAGIC_ATTRIBUTE_LIST,
  MAGIC_SCHOOL_LIST,
  PRIMARY_ATTRIBUTE_LIST,
  REAGENT_LIST,
  RULES_TOOLTIP_LIST,
  SECONDARY_ATTRIBUTE_LIST,
  SECONDARY_COMBAT_ATTRIBUTE_LIST,
  SKILL_LIST,
  SPELL_LIST,
  TRIGGERED_ABILITY_LIST,
} from "@/resources/lists";

const ADDITION_ABILITY_KEYWORDS = new Map(
  ADDITION_ABILITY_LIST.map(({ id, title }) => [
    title.toLowerCase(),
    {
      id,
      category: "Passive Ability",
    },
  ]),
);

const ARCHETYPE_KEYWORDS = new Map(
  ARCHETYPE_CLASS_LIST.map(({ id, title }) => [
    title.toLowerCase(),
    {
      id,
      category: "Archetype",
    },
  ]),
);

const ENCHANTMENT_KEYWORDS = new Map(
  COMBINED_ENCHANTMENT_LIST.map(({ id, prefix, suffix, container }) => [
    prefix.toLowerCase() || suffix.toLowerCase(),
    {
      id,
      category: `Enchantment - ${container.split("Enchantment")[0]}`,
    },
  ]),
);

const ARMOR_BONUS_KEYWORDS = new Map(
  ARMOR_BONUS_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const COMBAT_ATTRIBUTE_KEYWORDS = new Map(
  COMBAT_ATTRIBUTE_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const COMBAT_MANEUVER_KEYWORDS = new Map(
  COMBAT_MANEUVER_LIST.map(({ title, id }) => [
    title.toLowerCase(),
    {
      id,
      category: "Maneuver",
    },
  ]),
);

const CONDITION_KEYWORDS = new Map(
  COMBINED_CONDITION_LIST.map(({ id, title, isAdvantage }) => [
    title.toLowerCase(),
    {
      id,
      category: title.startsWith("#")
        ? "Concept"
        : `${isAdvantage ? "Positive" : "Negative"} Condition`,
    },
  ]),
);

const CONDITION_RESISTANCE_KEYWORDS = new Map(
  CONDITION_RESISTANCE_LIST.map(({ id, title }) => [
    title.toLowerCase(),
    {
      id,
      category: "Passive Ability",
    },
  ]),
);

const CONSUMABLE_KEYWORDS = new Map(
  CONSUMABLE_LIST.map(({ id, title }) => [
    title.toLowerCase(),
    {
      id,
      category: "Consumable",
    },
  ]),
);

const DAMAGE_BONUS_KEYWORDS = new Map(
  DAMAGE_BONUS_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const DAMAGE_RESISTANCE_KEYWORDS = new Map(
  DAMAGE_RESISTANCE_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const DEFENCE_ATTRIBUTE_KEYWORDS = new Map(
  DEFENCE_ATTRIBUTE_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const FOOD_KEYWORDS = new Map(
  FOOD_LIST.map(({ id, title }) => [
    title.toLowerCase(),
    {
      id,
      category: `Food`,
    },
  ]),
);

const HIT_BONUS_KEYWORDS = new Map(
  HIT_BONUS_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const MAGIC_ATTRIBUTE_KEYWORDS = new Map(
  MAGIC_ATTRIBUTE_LIST.map(({ title, id, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const MAGIC_SCHOOLS_KEYWORDS = new Map(
  MAGIC_SCHOOL_LIST.map(({ title, id, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const PRIMARY_ATTRIBUTE_KEYWORDS = new Map(
  PRIMARY_ATTRIBUTE_LIST.map(({ title, id, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const REAGENT_KEYWORDS = new Map(
  REAGENT_LIST.map(({ title, id }) => [
    title.toLowerCase(),
    {
      id,
      category: `Reagent`,
    },
  ]),
);

const RULES_KEYWORDS = new Map(
  RULES_TOOLTIP_LIST.flatMap(({ id, keywords, title }) =>
    keywords.split(",").map((keyword) => [
      keyword.toLowerCase() || title.toLowerCase(),
      {
        id,
        category: "Concept",
      },
    ]),
  ),
);

const SECONDARY_ATTRIBUTE_KEYWORDS = new Map(
  SECONDARY_ATTRIBUTE_LIST.map(({ title, id, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const SECONDARY_COMBAT_ATTRIBUTE_KEYWORDS = new Map(
  SECONDARY_COMBAT_ATTRIBUTE_LIST.map(({ id, title, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const SKILL_KEYWORDS = new Map(
  SKILL_LIST.map(({ title, id, attributeType }) => [
    title.toLowerCase(),
    {
      id,
      category: `Attribute - ${attributeType}`,
    },
  ]),
);

const SPELL_KEYWORDS = new Map(
  SPELL_LIST.map(({ title, id }) => [
    title.toLowerCase(),
    {
      id,
      category: "Spell",
    },
  ]),
);

const TRIGGERED_ABILITY_KEYWORDS = new Map(
  TRIGGERED_ABILITY_LIST.map(({ title, id }) => [
    title.toLowerCase(),
    {
      id,
      category: "Triggered Ability",
    },
  ]),
);

export const KEYWORD_MAP = new Map([
  ...ADDITION_ABILITY_KEYWORDS,
  ...ARCHETYPE_KEYWORDS,
  ...ARMOR_BONUS_KEYWORDS,
  ...COMBAT_ATTRIBUTE_KEYWORDS,
  ...COMBAT_MANEUVER_KEYWORDS,
  ...CONDITION_KEYWORDS,
  ...CONDITION_RESISTANCE_KEYWORDS,
  ...CONSUMABLE_KEYWORDS,
  ...DAMAGE_BONUS_KEYWORDS,
  ...DAMAGE_RESISTANCE_KEYWORDS,
  ...DEFENCE_ATTRIBUTE_KEYWORDS,
  ...ENCHANTMENT_KEYWORDS,
  ...FOOD_KEYWORDS,
  ...HIT_BONUS_KEYWORDS,
  ...MAGIC_ATTRIBUTE_KEYWORDS,
  ...MAGIC_SCHOOLS_KEYWORDS,
  ...PRIMARY_ATTRIBUTE_KEYWORDS,
  ...REAGENT_KEYWORDS,
  ...RULES_KEYWORDS,
  ...SECONDARY_ATTRIBUTE_KEYWORDS,
  ...SECONDARY_COMBAT_ATTRIBUTE_KEYWORDS,
  ...SKILL_KEYWORDS,
  ...SPELL_KEYWORDS,
  ...TRIGGERED_ABILITY_KEYWORDS,
]);

export const KEYWORD_REGEX = new RegExp(
  `(${[...KEYWORD_MAP.keys()]
    .sort((a, b) => b.length - a.length)
    .map(
      (keyword) =>
        `(?<=^|\\s|\\+)${keyword.toLowerCase()}${keyword.toLowerCase().endsWith(".") ? "" : "\\b"}`,
    )
    .join("|")})`,
  "gi",
);
