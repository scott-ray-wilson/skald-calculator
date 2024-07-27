import { CopyTextButton, Paragraph } from "@/components/generic";
import { FOOD_MAP, FOOD_RECIPE_LIST } from "@/resources";
import { Fragment } from "react";

export const FoodDescription = ({
  foodId,
  shouldOverride,
}: {
  foodId: string;
  shouldOverride?: boolean;
}) => {
  const food = FOOD_MAP.get(foodId);

  if (!food) throw new Error(`Invalid Food Item ID: ${foodId}`);

  const { value, title, foodValue, weight, description } = food;

  const usedIn = FOOD_RECIPE_LIST.filter(
    (recipe) =>
      recipe.componentList.includes(foodId) ||
      recipe.multiComponentList.includes(foodId),
  )
    .map((recipe) => {
      const food = FOOD_MAP.get(recipe.yields[0]);

      if (!food)
        throw new Error(`Missing Food Item for ID: ${recipe.yields[0]}`);

      return food.title;
    })
    .join(", ");

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <span className={"-mt-1 leading-5 text-light-gray"}>[Food]</span>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          { title: "Food Val.", value: foodValue },
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
        ignoreIds={[foodId]}
        className={`text-yellow`}
      >
        {description}
      </Paragraph>
      <CopyTextButton className={`mt-auto`}>{foodId}</CopyTextButton>
    </>
  );
};
