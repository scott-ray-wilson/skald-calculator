import { BackgroundType } from "@/resources/types";
import { ADDITION_ABILITY_MAP, COMBINED_ATTRIBUTE_MAP } from "@/resources/maps";

export const getBackgroundAbilities = (background: BackgroundType) =>
  background.abilityList.map((abilityId) => {
    const ability = ADDITION_ABILITY_MAP.get(abilityId);

    if (!ability) throw new Error(`Missing Addition Ability: ${abilityId}`);

    const bonusAttributes = ability.bonusAttributes.map((attributeId) => {
      const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

      if (!attribute) throw new Error(`Missing Attribute: ${attributeId}`);

      return attribute;
    });

    return { ...ability, bonusAttributes };
  });
