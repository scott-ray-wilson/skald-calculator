import { Keyword, Paragraph } from "@/components/generic";
import { useDefenceAttributes } from "@/hooks";
import { EncumberanceDetails } from "@/components/calc";

type DefenceAttributeDescriptionProps = {
  attributeId: string;
};

export const DefenceAttributeDescription = ({
  attributeId,
}: DefenceAttributeDescriptionProps) => {
  const combat = useDefenceAttributes();

  const defenceAttribute = combat.get(attributeId);

  if (!defenceAttribute)
    throw new Error(`Missing Defence Attribute: ${attributeId}`);

  const {
    attribute: { description, title },
    modifyingAttributes,
    values: { ranks, bonus, total },
  } = defenceAttribute;

  return (
    <>
      <span className={"text-blue uppercase text-lg"}>{title}</span>
      <Paragraph ignoreIds={[attributeId]} className={"text-yellow"}>
        {description}
      </Paragraph>
      <EncumberanceDetails attributeId={attributeId} />
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
