import { Keyword } from "@/components/generic";
import { usePartyLoadout } from "@/stores";
import { useSecondaryAttributes } from "@/hooks";

type SecondaryAttributeDescriptionProps = {
  attributeId: string;
};

export const SecondaryAttributeDescription = ({
  attributeId,
}: SecondaryAttributeDescriptionProps) => {
  const secondaryAttributes = useSecondaryAttributes();
  const { selectedPartyMember } = usePartyLoadout();

  const secondaryAttribute = secondaryAttributes.get(attributeId);

  if (!secondaryAttribute)
    throw new Error(`Missing Secondary Attribute: ${attributeId}`);

  const {
    attribute: { description, title },
    modifyingAttributes,
    values: { ranks, bonus, mainAttribute, total, level },
  } = secondaryAttribute;

  return (
    <>
      <span className={"text-blue uppercase text-lg"}>{title}</span>
      <p className={"text-yellow"}>{description}</p>
      <div className={`flex w-40 flex-col`}>
        {[
          { label: "Ranks", value: ranks, isKeyword: false },
          { label: "Abilities", value: bonus, isKeyword: false },
          ...modifyingAttributes.map((attribute) => {
            return {
              label: attribute.title,
              value: attribute.modifyingValue,
              isKeyword: true,
            };
          }),
          {
            label: selectedPartyMember.getMainAttribute().replace("ATT_", ""),
            isKeyword: true,
            value: mainAttribute,
          },
          { label: "Level", value: level, isKeyword: false },
          { label: "TOTAL", value: total, isKeyword: false },
        ]
          .filter(({ value }) => value > 0)
          .map(({ label, value, isKeyword }) => (
            <div key={label} className={"w-full flex justify-between"}>
              {isKeyword ? (
                <Keyword>{label}</Keyword>
              ) : (
                <span className={"text-light-gray"}>{label}</span>
              )}
              <span className={"text-white"}>
                {label.match(/TOTAL|Ranks/) ? "" : "+"}
                {value}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};
