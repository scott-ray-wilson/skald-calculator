import {
  AbilityType,
  ADDITION_ABILITY_MAP,
  ARCHETYPE_CLASS_MAP,
  ArchetypeClassType,
  ARMOR_BONUS_MAP,
  ArmorBonusType,
  AttributeType,
  COMBAT_MANEUVER_MAP,
  COMBINED_ATTRIBUTE_MAP,
  COMBINED_CONDITION_MAP,
  COMBINED_ENCHANTMENT_MAP,
  CONDITION_RESISTANCE_MAP,
  ConditionType,
  EnchantmentType,
  FoodType,
  KeywordType,
  RULES_TOOLTIP_MAP,
  RulesTooltipType,
  SPELL_MAP,
  TRIGGERED_ABILITY_MAP,
} from "@/resources";
import { useKeywordOverride } from "@/stores";
import { ReactNode, useEffect } from "react";
import {
  AdditionAbilityDescription,
  CombatManeuverDescription,
  ConditionDescription,
  CopyTextButton,
  Paragraph,
  SpellDescription,
  TriggeredAbilityDescription,
} from "@/components/generic";
import {
  ConsumableDescription,
  FoodDescription,
  ReagentDescription,
} from "@/components/items";

type KeywordContentProps = {
  keyword: KeywordType;
};

export const KeywordContent = ({
  keyword: { id, category },
}: KeywordContentProps) => {
  const { setKeywordOverride } = useKeywordOverride();

  useEffect(() => {
    return () => setKeywordOverride(null);
  }, [setKeywordOverride]);

  let keyword:
    | ArmorBonusType
    | ArchetypeClassType
    | AbilityType
    | ConditionType
    | RulesTooltipType
    | AttributeType
    | FoodType
    | EnchantmentType
    | undefined;

  let AdditionalComponents: ReactNode = null;

  switch (category) {
    case "Archetype":
      keyword = ARCHETYPE_CLASS_MAP.get(id);
      break;
    case "Passive Ability":
      keyword = ADDITION_ABILITY_MAP.get(id);

      if (keyword) {
        AdditionalComponents = <AdditionAbilityDescription abilityId={id} />;
      } else {
        keyword = ARMOR_BONUS_MAP.get(id) ?? CONDITION_RESISTANCE_MAP.get(id);
      }
      break;
    case "Triggered Ability":
      keyword = TRIGGERED_ABILITY_MAP.get(id);
      AdditionalComponents = <TriggeredAbilityDescription abilityId={id} />;
      break;
    case "Maneuver":
      keyword = COMBAT_MANEUVER_MAP.get(id);
      AdditionalComponents = <CombatManeuverDescription abilityId={id} />;
      break;
    case "Spell":
      keyword = SPELL_MAP.get(id);
      AdditionalComponents = <SpellDescription abilityId={id} />;
      break;
    case "Concept":
      keyword = RULES_TOOLTIP_MAP.get(id);
      break;
    case "Reagent":
      return <ReagentDescription shouldOverride reagentId={id} />;
    case "Consumable":
      return <ConsumableDescription shouldOverride consumableId={id} />;
    case "Food":
      return <FoodDescription shouldOverride foodId={id} />;
    case "Positive Condition":
    case "Negative Condition":
      keyword = COMBINED_CONDITION_MAP.get(id);
      AdditionalComponents = <ConditionDescription conditionId={id} />;
      break;
    case "Enchantment - weapon":
    case "Enchantment - general":
    case "Enchantment - jewelry":
    case "Enchantment - accessory":
    case "Enchantment - shield":
      keyword = COMBINED_ENCHANTMENT_MAP.get(id);
      break;
    default:
      keyword = COMBINED_ATTRIBUTE_MAP.get(id);
  }

  if (!keyword) throw new Error(`Invalid ID: ${id} for Category ${category}`);

  const { title, description } = keyword;

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`uppercase text-blue`}>{title}</span>
        <span
          className={`capitalize leading-[1] text-light-gray`}
        >{`[${category}]`}</span>
      </div>
      {AdditionalComponents}
      {description.split("\r\n").map((segment, index) => (
        <Paragraph
          shouldOverride
          ignoreIds={[id]}
          key={index}
          className={`text-yellow`}
        >
          {segment}
        </Paragraph>
      ))}
      <CopyTextButton>{id}</CopyTextButton>
    </>
  );
};
