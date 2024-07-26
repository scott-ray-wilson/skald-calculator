import { COMBINED_ATTRIBUTE_MAP, PRIMARY_ATTRIBUTE_MAP } from "@/resources";
import { Keyword, Paragraph } from "@/components/generic";
import { usePartyLoadout } from "@/stores";

type PrimaryAttributeDescriptionProps = {
  attributeId: string;
};

export const PrimaryAttributeDescription = ({
  attributeId,
}: PrimaryAttributeDescriptionProps) => {
  const { title, description, influences } =
    PRIMARY_ATTRIBUTE_MAP.get(attributeId)!;

  const { selectedPartyMember } = usePartyLoadout();

  const ranks =
    selectedPartyMember.primaryAttributes.getAllocatedRanks(attributeId);
  const total =
    selectedPartyMember.primaryAttributes.getCalculatedRanks(attributeId);
  const abilities = selectedPartyMember.feats.getAttributeBonus(attributeId);
  const isMainAttribute =
    selectedPartyMember.getMainAttribute() === attributeId;

  return (
    <>
      <span className={"text-blue uppercase text-lg"}>{title}</span>
      <p className={"text-yellow"}>{description}</p>
      <div className={`flex w-40 flex-col`}>
        {[
          { label: "Ranks", value: ranks },
          { label: "Abilities", value: abilities },
          { label: "TOTAL", value: total },
        ]
          .filter(({ value }) => !!value)
          .map(({ label, value }) => (
            <div key={label} className={"w-full flex justify-between"}>
              <span className={"text-light-gray"}>{label}</span>
              <span className={"text-white"}>
                {label.match(/TOTAL|Ranks/) ? "" : "+"}
                {value}
              </span>
            </div>
          ))}
      </div>
      <Paragraph className={`text-yellow`}>
        {`This attribute influences: ${influences
          .map((attributeId) => {
            const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

            if (!attribute)
              throw new Error(`Missing Attribute: ${attributeId}`);

            return attribute.title;
          })
          .join(", ")}.`}
      </Paragraph>
      {isMainAttribute ? (
        <div className={`flex text-green whitespace-nowrap`}>
          <span className={`text-lime`}>-</span>
          <Keyword>Main Attribute</Keyword>
          <span className={`text-lime`}>-</span>
        </div>
      ) : null}
    </>
  );
};
