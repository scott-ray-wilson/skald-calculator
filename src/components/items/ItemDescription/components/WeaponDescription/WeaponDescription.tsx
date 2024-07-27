import {
  COMBINED_WEAPON_MAP,
  GENERAL_ENCHANTMENT_LIST,
  WEAPON_ENCHANTMENT_LIST,
} from "@/resources";
import { Fragment } from "react";
import { CopyTextButton, Keyword, Paragraph } from "@/components/generic";

type WeaponDescriptionProps = { weaponId: string };

export const WeaponDescription = ({ weaponId }: WeaponDescriptionProps) => {
  const weapon = COMBINED_WEAPON_MAP.get(weaponId);

  if (!weapon) throw new Error(`Invalid Weapon ID: ${weaponId}`);

  const {
    weaponType,
    weightCategory,
    description,
    hitBonus,
    minDamage,
    maxDamage,
    parent,
    value,
    container,
    title,
    crit,
    weight,
    enchantment,
    conferredAbilities,
    unique,
    damageType,
  } = weapon;

  const parentWeapon = COMBINED_WEAPON_MAP.get(parent);

  const potentialEnchantments = [
    ...GENERAL_ENCHANTMENT_LIST,
    ...WEAPON_ENCHANTMENT_LIST,
  ].filter(
    ({ applicableItems }) =>
      applicableItems.includes(weaponId) || applicableItems.includes(parent),
  );

  const totalWeight = weight || parentWeapon?.weight || 0;
  const totalCrit = crit + (parentWeapon?.crit ?? 0);
  const totalMinDamage = minDamage + (parentWeapon?.minDamage ?? 0);
  const totalMaxDamage = maxDamage + (parentWeapon?.maxDamage ?? 0);

  const subTitle: string[] = [
    ...new Set([
      container === "meleeWeapons" ? "Melee" : "Ranged",
      `${parentWeapon?.weightCategory ?? weightCategory} ${parentWeapon?.weaponType ?? weaponType}`,
      ...(parentWeapon?.damageType ?? []),
      ...damageType,
    ]),
  ];

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <div className={`-mt-1 flex flex-wrap gap-x-1`}>
          <span className={"leading-5 text-light-gray"}>
            [{subTitle.join(", ")}]
          </span>
          {enchantment || unique || conferredAbilities.length ? (
            <span className={"leading-5 text-light-gray"}>[Enchanted]</span>
          ) : null}
        </div>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          {
            title: "Accuracy",
            value: hitBonus >= 0 ? `+${hitBonus}` : hitBonus,
            isKeyword: true,
          },
          {
            title: "Damage",
            value: `${container === "ammoContainer" ? "+" : ""}${totalMinDamage === totalMaxDamage ? totalMaxDamage : `${totalMinDamage}-${totalMaxDamage}`}`,
          },
          {
            title: "Crit.",
            value: `x${totalCrit === 0 ? totalCrit : totalCrit.toFixed(1)}`,
            isKeyword: true,
          },
          { title: "Value", value: `${value} GP` },
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
      <Paragraph className={`text-yellow`}>{description}</Paragraph>
      {potentialEnchantments.length ? (
        <Paragraph
          className={`text-yellow`}
        >{`Possible Enchantments: ${potentialEnchantments.map((enchantment) => enchantment.prefix || enchantment.suffix).join(", ")}`}</Paragraph>
      ) : null}
      <CopyTextButton className={`mt-auto`}>{weaponId}</CopyTextButton>
    </>
  );
};
