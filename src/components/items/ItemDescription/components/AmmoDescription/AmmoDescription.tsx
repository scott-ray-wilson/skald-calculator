import { AMMO_MAP } from "@/resources";
import { Fragment } from "react";
import { CopyTextButton, Keyword } from "@/components/generic";

type AmmoDescriptionProps = { ammoId: string };

export const AmmoDescription = ({ ammoId }: AmmoDescriptionProps) => {
  const ammo = AMMO_MAP.get(ammoId);

  if (!ammo) throw new Error(`Invalid Weapon ID: ${ammoId}`);

  const { hitBonus, minDamage, maxDamage, value, title, crit, weight } = ammo;

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <span className={"-mt-1 leading-5 text-light-gray"}>
          [Ammo, Piercing]
        </span>
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
            value: `+${minDamage === maxDamage ? maxDamage : `${minDamage}-${maxDamage}`}`,
          },
          {
            title: "Crit.",
            value: `x${crit}`,
            isKeyword: true,
          },
          { title: "Value", value: `${value} GP` },
          {
            title: "Weight",
            value: `${weight.toFixed(2)} lb${weight > 1 ? "s" : ""}`,
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
      <CopyTextButton className={`mt-auto`}>{ammoId}</CopyTextButton>
    </>
  );
};
