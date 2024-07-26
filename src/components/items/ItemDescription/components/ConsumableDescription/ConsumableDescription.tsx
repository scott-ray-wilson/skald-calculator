import { getConditonsAndEffects, Paragraph } from "@/components/generic";
import { CONSUMABLE_MAP } from "@/resources";
import { Fragment } from "react";
import { ConditionsAndEffects } from "@/components/generic";

export const ConsumableDescription = ({
  consumableId,
  shouldOverride,
}: {
  consumableId: string;
  shouldOverride?: boolean;
}) => {
  const consumable = CONSUMABLE_MAP.get(consumableId);

  if (!consumable) throw new Error(`Invalid Consumable ID: ${consumableId}`);

  const { value, title, weight, description, useEffect } = consumable;

  const props = getConditonsAndEffects(useEffect);

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <span className={"-mt-1 leading-5 text-light-gray"}>[Consumable]</span>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          { title: "Value", value: `${value} GP` },
          { title: "Weight", value: `${weight.toFixed(2)} lb` },
        ].map(({ title, value }) => (
          <Fragment key={title}>
            <span className={"text-light-gray"}>{title}</span>
            <span className={`text-white`}>{value}</span>
          </Fragment>
        ))}
      </div>
      <Paragraph shouldOverride={shouldOverride} className={`text-yellow`}>
        {description}
      </Paragraph>
      <ConditionsAndEffects shouldOverride={shouldOverride} {...props} />
    </>
  );
};
