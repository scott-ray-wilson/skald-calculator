import {
  ADDITION_ABILITY_MAP,
  COMBAT_MANEUVER_MAP,
  COMBINED_CONDITION_MAP,
  COMBINED_ENCHANTMENT_MAP,
  SPELL_MAP,
  TRIGGERED_ABILITY_MAP,
} from "@/resources/maps";

type MapValue<M> = M extends Map<unknown, infer V> ? V : never;

type AdditionAbility = MapValue<typeof ADDITION_ABILITY_MAP>;
type Condition = MapValue<typeof COMBINED_CONDITION_MAP>;
type CombatManeuver = MapValue<typeof COMBAT_MANEUVER_MAP>;
type TriggeredAbility = MapValue<typeof TRIGGERED_ABILITY_MAP>;
type Spell = MapValue<typeof SPELL_MAP>;

export type ConferringItem = {
  conferredAbilities: string[];
  conferredConditions: string[];
  conferredSpells: string[];
  enchantment: string;
};

// an item confers its own ids plus its enchantment's; parents are NOT
// consulted (Item.getConferredAbilities)
const collectConferredIds = (
  items: ConferringItem[],
  key: "conferredAbilities" | "conferredConditions" | "conferredSpells",
) =>
  items.flatMap((item) => {
    const enchantment = item.enchantment
      ? COMBINED_ENCHANTMENT_MAP.get(item.enchantment)
      : undefined;

    return [...item[key], ...(enchantment?.[key] ?? [])];
  });

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

// Duplicates are preserved: passive abilities and conditions from items stack
// per instance, even identical ones from two different items
// (AbilityContainerPassive.allowDuplicatedItemComponents).
export const getConferredPassiveAbilities = (
  items: ConferringItem[],
): AdditionAbility[] =>
  collectConferredIds(items, "conferredAbilities")
    .map((id) => ADDITION_ABILITY_MAP.get(id))
    .filter(isDefined);

export const getConferredConditions = (items: ConferringItem[]): Condition[] =>
  collectConferredIds(items, "conferredConditions")
    .map((id) => COMBINED_CONDITION_MAP.get(id))
    .filter(isDefined);

// Active maneuvers, triggered abilities and spells dedupe by id
// (CharacterComponentContainer.allowDuplicatedItemComponents default).
export const getConferredAuxiliaryComponents = (
  items: ConferringItem[],
): {
  maneuvers: CombatManeuver[];
  triggeredAbilities: TriggeredAbility[];
  spells: Spell[];
} => {
  const abilityIds = [
    ...new Set(collectConferredIds(items, "conferredAbilities")),
  ];
  const spellIds = [...new Set(collectConferredIds(items, "conferredSpells"))];

  return {
    maneuvers: abilityIds
      .map((id) => COMBAT_MANEUVER_MAP.get(id))
      .filter(isDefined),
    triggeredAbilities: abilityIds
      .map((id) => TRIGGERED_ABILITY_MAP.get(id))
      .filter(isDefined),
    spells: spellIds.map((id) => SPELL_MAP.get(id)).filter(isDefined),
  };
};

// structural param types: several modifier arrays are empty across the whole
// extract, so their JSON-inferred element type is never
export const getPassiveAbilityAttributeModifier = (
  ability: {
    bonusMagnitude: number;
    bonusAttributes: string[];
    penaltyMagnitude: number;
    penaltyAttributes: string[];
  },
  attributeId: string,
) =>
  (ability.bonusAttributes.includes(attributeId)
    ? ability.bonusMagnitude
    : 0) -
  (ability.penaltyAttributes.includes(attributeId)
    ? ability.penaltyMagnitude
    : 0);

export const getConditionAttributeModifier = (
  condition: {
    primaryMagnitude: number;
    primaryAffectedAttributes: string[];
    secondaryMagnitude: number;
    secondaryAffectedAttributes: string[];
  },
  attributeId: string,
) =>
  (condition.primaryAffectedAttributes.includes(attributeId)
    ? condition.primaryMagnitude
    : 0) +
  (condition.secondaryAffectedAttributes.includes(attributeId)
    ? condition.secondaryMagnitude
    : 0);

// combined ability + condition modifier an equipment loadout grants an
// attribute (the abilityBonus/conditionBonus terms of the game's attribute
// formula that stem from items)
export const getEquipmentAttributeBonus = (
  items: ConferringItem[],
  attributeId: string,
) =>
  getConferredPassiveAbilities(items).reduce(
    (total, ability) =>
      total + getPassiveAbilityAttributeModifier(ability, attributeId),
    0,
  ) +
  getConferredConditions(items).reduce(
    (total, condition) =>
      total + getConditionAttributeModifier(condition, attributeId),
    0,
  );
