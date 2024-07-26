import { ADDITION_ABILITY_MAP, COMBINED_ATTRIBUTE_MAP } from "@/resources";
import { Keyword } from "@/components/generic";

type AbilityDescriptionProps = {
  abilityId: string;
};

export const AdditionAbilityDescription = ({
  abilityId,
}: AbilityDescriptionProps) => {
  const ability = ADDITION_ABILITY_MAP.get(abilityId);

  if (!ability)
    throw new Error(`Missing Addition Ability for ID: ${abilityId}`);

  const { bonusAttributes, bonusMagnitude } = ability;

  return (
    <>
      {bonusAttributes.map((attributeId) => {
        const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

        if (!attribute)
          throw new Error(`Missing Attribute for ID: ${attributeId}`);

        return (
          <div key={attributeId}>
            <span className={`text-yellow`}>
              +{bonusMagnitude}
              {attribute.suffixCharacter}
            </span>{" "}
            <Keyword shouldOverride>{attribute.title}</Keyword>
          </div>
        );
      })}
    </>
  );
};
