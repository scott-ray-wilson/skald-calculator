import { CopyTextButton, Paragraph } from "@/components/generic";
import { ALCHEMY_RECIPE_LIST, CONSUMABLE_MAP, REAGENT_MAP } from "@/resources";
import { Fragment } from "react";

export const ReagentDescription = ({
  reagentId,
  shouldOverride,
}: {
  reagentId: string;
  shouldOverride?: boolean;
}) => {
  const reagent = REAGENT_MAP.get(reagentId);

  if (!reagent) throw new Error(`Invalid Reagent ID: ${reagentId}`);

  const { value, title, weight, description } = reagent;

  const usedIn = ALCHEMY_RECIPE_LIST.filter(
    (recipe) =>
      recipe.componentList.includes(reagentId) ||
      recipe.multiComponentList.includes(reagentId as never),
  )
    .map((recipe) => {
      const consumable = CONSUMABLE_MAP.get(recipe.yields[0]);

      if (!consumable)
        throw new Error(`Missing Consumable for ID: ${recipe.yields[0]}`);

      return consumable.title;
    })
    .join(", ");

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <span className={"-mt-1 leading-5 text-light-gray"}>[Reagent]</span>
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
      {usedIn.length ? (
        <Paragraph
          shouldOverride={shouldOverride}
          className={`text-yellow`}
        >{`Used in: ${usedIn}`}</Paragraph>
      ) : null}
      <Paragraph
        shouldOverride={shouldOverride}
        ignoreIds={[reagentId]}
        className={`text-yellow`}
      >
        {description}
      </Paragraph>
      <CopyTextButton className={`mt-auto`}>{reagentId}</CopyTextButton>
    </>
  );
};
