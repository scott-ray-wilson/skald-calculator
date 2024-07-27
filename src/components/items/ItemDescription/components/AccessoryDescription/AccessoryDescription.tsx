import {
  ACCESSORY_ENCHANTMENT_LIST,
  ACCESSORY_MAP,
  GENERAL_ENCHANTMENT_LIST,
} from "@/resources";
import { Fragment } from "react";
import { CopyTextButton, Keyword, Paragraph } from "@/components/generic";

type AccessoryDescriptionProps = { accessoryId: string };

export const AccessoryDescription = ({
  accessoryId,
}: AccessoryDescriptionProps) => {
  const accessory = ACCESSORY_MAP.get(accessoryId);

  if (!accessory) throw new Error(`Invalid Accessory ID: ${accessoryId}`);

  const {
    description,
    enchantment,
    value,
    soak,
    encumberance,
    title,
    weight,
    slot,
    imagePath,
    modelPath,
    conferredAbilities,
  } = accessory;

  let slotTitle: string;
  switch (slot) {
    case "Head":
      slotTitle = `Headwear`;
      break;
    case "Feet":
      slotTitle = "Footwear";
      break;
    case "Hands":
      slotTitle = "Glove";
      break;
    default:
      throw new Error("Unhandled Slot Type");
  }

  const potentialEnchantments = [
    ...GENERAL_ENCHANTMENT_LIST,
    ...ACCESSORY_ENCHANTMENT_LIST,
  ].filter((ench) => ench.applicableItems.includes(accessoryId));

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>
          {title}
          {/* helps differentiate items with the same name */}
          {!imagePath && modelPath !== title
            ? ` (${modelPath.split(/(?=[A-Z0-9])/).join(" ")})`
            : ""}
        </span>
        <div className={`-mt-1 flex gap-1`}>
          <span className={"leading-5 text-light-gray"}>[{slotTitle}]</span>
          {enchantment || conferredAbilities.length ? (
            <span className={"leading-5 text-light-gray"}>[Enchanted]</span>
          ) : null}
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          { title: "Soak", value: soak, isKeyword: true },
          { title: "Enc.", value: encumberance, isKeyword: true },
          { title: "Value", value: `${value} GP` },
          { title: "Weight", value: `${weight.toFixed(2)} lb` },
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
      {potentialEnchantments.length ? (
        <Paragraph
          className={`text-yellow`}
        >{`Possible Enchantments: ${potentialEnchantments.map((enchantment) => enchantment.suffix || enchantment.prefix).join(", ")}`}</Paragraph>
      ) : null}
      <CopyTextButton className={`mt-auto`}>{accessoryId}</CopyTextButton>
    </>
  );
};
