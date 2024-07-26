import {
  ARMOR_ENCHANTMENT_LIST,
  COMBINED_ENCHANTMENT_MAP,
  GENERAL_ENCHANTMENT_LIST,
  SHIELD_MAP,
} from "@/resources";
import { Fragment } from "react";
import { Keyword, Paragraph } from "@/components/generic";

type ShieldDescriptionProps = { shieldId: string };

export const ShieldDescription = ({ shieldId }: ShieldDescriptionProps) => {
  const shield = SHIELD_MAP.get(shieldId);

  if (!shield) throw new Error(`Invalid Shield ID: ${shieldId}`);

  const {
    weightCategory,
    description,
    soak,
    parent,
    value,
    encumberance,
    title,
    weight,
    enchantment,
    conferredAbilities,
    unique,
  } = shield;

  const parentShield = SHIELD_MAP.get(parent);

  const potentialEnchantments = [
    ...GENERAL_ENCHANTMENT_LIST,
    ...ARMOR_ENCHANTMENT_LIST,
  ].filter(
    ({ applicableItems }) =>
      applicableItems.includes(shieldId) || applicableItems.includes(parent),
  );

  const totalWeight = weight + (parentShield?.weight || 0);

  const enchantmentInfo = enchantment
    ? COMBINED_ENCHANTMENT_MAP.get(enchantment)
    : null;

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <div className={`-mt-1 flex flex-wrap gap-x-1`}>
          <span className={"leading-5 text-light-gray"}>
            [{weightCategory || parentShield?.weightCategory} Armor]
          </span>
          {enchantment || unique || conferredAbilities.length ? (
            <span className={"leading-5 text-light-gray"}>[Enchanted]</span>
          ) : null}
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          {
            title: "Dodge",
            value: `+${soak + (parentShield?.soak ?? 0)}`,
            isKeyword: true,
          },
          {
            title: "Enc.",
            value: encumberance + (parentShield?.encumberance ?? 0),
            isKeyword: true,
          },
          {
            title: "Value",
            value: `${value * (enchantmentInfo?.valueMultiplier ?? 1) + (enchantmentInfo?.basePrice ?? 0)} GP`,
          },
          {
            title: "Weight",
            value: `${totalWeight.toFixed(2)} lb${totalWeight > 1 ? "s" : ""}`,
          },
        ].map(({ title, value, isKeyword }) => (
          <Fragment key={title}>
            {isKeyword ? (
              <Keyword>{title}</Keyword>
            ) : (
              <span className={"text-light-gray"}>{title}</span>
            )}
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
