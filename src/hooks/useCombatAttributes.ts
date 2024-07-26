import { COMBAT_ATTRIBUTE_LIST, PRIMARY_ATTRIBUTE_LIST } from "@/resources";
import { usePartyLoadout } from "@/stores";

export const useCombatAttributes = () => {
  const { selectedPartyMember } = usePartyLoadout();

  return new Map(
    COMBAT_ATTRIBUTE_LIST.map((attribute) => {
      const { id, startingValue, rootFactorPercentage } = attribute;
      const backgroundBonus = selectedPartyMember.getBackgroundBonus(id);
      const featBonus = selectedPartyMember.feats.getAttributeBonus(id);

      const ranks = attribute.ranks;
      let total = startingValue + backgroundBonus + ranks + featBonus;

      const modifyingAttributes = PRIMARY_ATTRIBUTE_LIST.filter((attribute) =>
        attribute.influences.includes(id),
      ).map((modifyingAttribute) => {
        const value =
          selectedPartyMember.primaryAttributes.getCalculatedRanks(
            modifyingAttribute.id,
          ) *
          (rootFactorPercentage / 100);
        total += value;

        return { ...modifyingAttribute, modifyingValue: value };
      });

      return [
        id,
        {
          attribute,
          modifyingAttributes,
          values: {
            bonus: backgroundBonus + featBonus,
            ranks,
            total,
          },
        },
      ];
    }),
  );
};
