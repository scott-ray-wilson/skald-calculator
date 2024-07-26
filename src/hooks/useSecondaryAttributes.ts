import {
  MAGIC_ATTRIBUTE_MAP,
  PRIMARY_ATTRIBUTE_LIST,
  SECONDARY_ATTRIBUTE_LIST,
} from "@/resources";
import { usePartyLoadout } from "@/stores";

const LEVEL_UP_PROP_MAP = new Map<string, "levelUpHP" | "levelUpSP">([
  ["ATT_Vitality", "levelUpHP"],
  ["ATT_Attunement", "levelUpSP"],
]);

export const useSecondaryAttributes = () => {
  const { selectedPartyMember } = usePartyLoadout();

  return new Map(
    SECONDARY_ATTRIBUTE_LIST.concat(
      MAGIC_ATTRIBUTE_MAP.get("ATT_Attunement")!,
    ).map((attribute) => {
      const { id, startingValue, rootFactorPercentage } = attribute;
      const backgroundBonus = selectedPartyMember.getBackgroundBonus(id);
      const featBonus = selectedPartyMember.feats.getAttributeBonus(id);

      // TODO: determine where the base 5 on wounds come from
      const ranks = attribute.ranks * 5;
      let total = startingValue + backgroundBonus + ranks + featBonus;

      let level = 0;
      if (LEVEL_UP_PROP_MAP.has(id)) {
        level =
          (selectedPartyMember.getArchetypeClass()[LEVEL_UP_PROP_MAP.get(id)!] +
            selectedPartyMember.getClass()[LEVEL_UP_PROP_MAP.get(id)!]) *
          selectedPartyMember.getLevel();
      }

      total += level;

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

      let mainAttribute = 0;
      if (id === "ATT_Attunement") {
        mainAttribute +=
          selectedPartyMember.primaryAttributes.getCalculatedRanks(
            selectedPartyMember.getMainAttribute(),
          ) *
          (rootFactorPercentage / 100);
      }

      total += mainAttribute;

      return [
        id,
        {
          attribute,
          modifyingAttributes,
          values: {
            bonus: backgroundBonus + featBonus,
            ranks,
            level,
            mainAttribute,
            total,
          },
        },
      ];
    }),
  );
};
