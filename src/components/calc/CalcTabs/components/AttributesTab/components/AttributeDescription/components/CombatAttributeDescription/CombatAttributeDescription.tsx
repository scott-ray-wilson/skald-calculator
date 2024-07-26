import { Keyword, Paragraph } from "@/components/generic";
import { useCombatAttributes } from "@/hooks";

type CombatAttributeDescriptionProps = {
  attributeId: string;
};

export const CombatAttributeDescription = ({
  attributeId,
}: CombatAttributeDescriptionProps) => {
  const combat = useCombatAttributes();

  const combatAttribute = combat.get(attributeId);

  if (!combatAttribute)
    throw new Error(`Missing Combat Attribute: ${attributeId}`);

  const {
    attribute: { description, title },
    modifyingAttributes,
    values: { ranks, bonus, total },
  } = combatAttribute;

  return (
    <>
      <span className={"text-blue uppercase text-lg"}>{title}</span>
      <Paragraph ignoreIds={[attributeId]} className={"text-yellow"}>
        {description}
      </Paragraph>
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
