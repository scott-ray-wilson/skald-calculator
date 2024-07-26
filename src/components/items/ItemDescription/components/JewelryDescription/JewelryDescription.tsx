import {
  COMBINED_ENCHANTMENT_MAP,
  GENERAL_ENCHANTMENT_LIST,
  JEWELRY_ENCHANTMENT_LIST,
  JEWELRY_MAP,
} from "@/resources";
import { Fragment } from "react";
import { Paragraph } from "@/components/generic";

type JewelryDescriptionProps = { jewelryId: string };

export const JewelryDescription = ({ jewelryId }: JewelryDescriptionProps) => {
  const shield = JEWELRY_MAP.get(jewelryId);

  if (!shield) throw new Error(`Invalid Jewelry ID: ${jewelryId}`);

  const {
    description,
    parent,
    value,
    slotJewelry,
    title,
    weight,
    enchantment,
    conferredAbilities,
    unique,
  } = shield;

  const parentJewelry = JEWELRY_MAP.get(parent);

  const potentialEnchantments = [
    ...GENERAL_ENCHANTMENT_LIST,
    ...JEWELRY_ENCHANTMENT_LIST,
  ].filter(
    ({ applicableItems }) =>
      applicableItems.includes(jewelryId) || applicableItems.includes(parent),
  );

  const totalWeight = weight + (parentJewelry?.weight || 0);

  const enchantmentInfo = enchantment
    ? COMBINED_ENCHANTMENT_MAP.get(enchantment)
    : null;

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <div className={`-mt-1 flex flex-wrap gap-x-1`}>
          <span className={"leading-5 text-light-gray"}>
            [{slotJewelry === "Finger" ? "Ring" : "Necklace"}]
          </span>
          {enchantment || unique || conferredAbilities.length ? (
            <span className={"leading-5 text-light-gray"}>[Enchanted]</span>
          ) : null}
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          {
            title: "Value",
            value: `${value * (enchantmentInfo?.valueMultiplier ?? 1) + (enchantmentInfo?.basePrice ?? 0)} GP`,
          },
          {
            title: "Weight",
            value: `${totalWeight.toFixed(2)} lb${totalWeight > 1 ? "s" : ""}`,
          },
        ].map(({ title, value }) => (
          <Fragment key={title}>
            <span className={"text-light-gray"}>{title}</span>
            <span className={`text-white`}>{value}</span>
          </Fragment>
        ))}
      </div>
      {description ? (
        <Paragraph className={`text-yellow`}>{description}</Paragraph>
      ) : null}
      {enchantmentInfo ? (
        <Paragraph className={`text-yellow`}>
          {enchantmentInfo.description}
        </Paragraph>
      ) : null}
      {potentialEnchantments.length ? (
        <Paragraph
          className={`text-yellow`}
        >{`Possible Enchantments: ${potentialEnchantments.map((enchantment) => enchantment.prefix || enchantment.suffix).join(", ")}`}</Paragraph>
      ) : null}
    </>
  );
};
