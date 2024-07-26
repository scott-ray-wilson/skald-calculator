import { COMBINED_ATTRIBUTE_MAP } from "@/resources";
import { concatenateText } from "@/components/utils";

type EncumberanceDetailsProps = {
  attributeId: string;
};

export const EncumberanceDetails = ({
  attributeId,
}: EncumberanceDetailsProps) => {
  const attribute = COMBINED_ATTRIBUTE_MAP.get(attributeId);

  if (!attribute) throw new Error(`Missing Attribute for ID: ${attributeId}`);

  const {
    countArmorEncumberance,
    countHelmetEncumberance,
    countShoeEncumberance,
    countGloveEncumberance,
  } = attribute;

  const encumberedBy: string[] = [];

  if (countArmorEncumberance) encumberedBy.push("Armor");

  if (countHelmetEncumberance) encumberedBy.push("Headwear");

  if (countShoeEncumberance) encumberedBy.push("Footwear");
  if (countGloveEncumberance) encumberedBy.push("Gloves");

  if (!encumberedBy.length) return null;

  return (
    <p className={`text-yellow`}>
      Counts encumberance from {concatenateText(encumberedBy)}.
    </p>
  );
};
