import {
  DEFENCE_ATTRIBUTE_LIST,
  PRIMARY_ATTRIBUTE_LIST,
  getEncumbranceAttributeModifier,
} from "@/resources";
import { useEquipmentPanel, usePartyLoadout } from "@/stores";

export const useDefenceAttributes = () => {
  const { selectedPartyMember } = usePartyLoadout();
  const { wieldedSlotId } = useEquipmentPanel();

  const encumbranceValues =
    selectedPartyMember.equipment.getEncumbranceValues();

  return new Map(
    DEFENCE_ATTRIBUTE_LIST.map((attribute) => {
      const { id, startingValue, rootFactorPercentage } = attribute;
      const backgroundBonus = selectedPartyMember.getBackgroundBonus(id);
      const featBonus = selectedPartyMember.feats.getAttributeBonus(id);
      const encumbrance = getEncumbranceAttributeModifier(
        attribute,
        encumbranceValues,
      );

      let equipment = selectedPartyMember.equipment.getAttributeBonus(id);

      // the shield (suppressed while wielding a two-hander) and unarmored
      // mastery feed Dodge outside the passive-ability chain
      if (id === "ATT_Dodge") {
        equipment +=
          selectedPartyMember.equipment.getShieldDodgeBonus(wieldedSlotId) +
          selectedPartyMember.equipment.getUnarmoredDodgeBonus();
      }

      const ranks = attribute.ranks;
      let total =
        startingValue +
        backgroundBonus +
        featBonus +
        ranks +
        equipment +
        encumbrance;

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
            bonus: featBonus + backgroundBonus,
            equipment,
            encumbrance,
            ranks,
            total,
          },
        },
      ];
    }),
  );
};
