import {
  AdventuringItemType,
  COMBINED_ITEM_MAP,
  CONSUMABLE_MAP,
  ConsumableType,
  FOOD_MAP,
  FoodType,
  RecipeType,
} from "@/resources";
import { Fragment } from "react";
import { Paragraph } from "@/components/generic";

type BasicItemDescriptionProps = { itemId: string };

/* Catch all for non-complex items */

export const BasicItemDescription = ({ itemId }: BasicItemDescriptionProps) => {
  const item = COMBINED_ITEM_MAP.get(itemId);

  if (!item) throw new Error(`Missing Item for ID: ${itemId}`);

  let category: string;
  let title = item.title;
  let yieldedItem: FoodType | ConsumableType | undefined;

  const { weight, value, description } = item;

  switch (item.container) {
    case "adventuringItems":
      category = (item as AdventuringItemType).light ? "Light" : "Adventuring";
      break;
    case "foodRecipes":
      category = "Book";

      yieldedItem = FOOD_MAP.get((item as RecipeType).yields[0]);

      if (!yieldedItem)
        throw new Error(`Missing Yielded Item for Recipe: ${itemId}`);

      title = `Recipe: ${yieldedItem.title}`;
      break;
    case "alchemyRecipes":
      category = "Book";

      yieldedItem = CONSUMABLE_MAP.get((item as RecipeType).yields[0]);

      if (!yieldedItem)
        throw new Error(`Missing Yielded Item for Recipe: ${itemId}`);
      title = `Recipe: ${yieldedItem.title}`;
      break;
    case "miscItems":
      category = "Misc";
      break;
    case "keys":
      category = "Key";
      break;
    case "books":
      category = "Book";
      break;
    case "trinkets":
      category = "Trinket";
      break;
    case "clothing":
      category = "Clothing";
      break;
    default:
      category = "????";
  }

  return (
    <>
      <div className={`flex flex-col`}>
        <span className={`text-lg uppercase text-blue`}>{title}</span>
        <span className={"-mt-1 leading-5 text-light-gray"}>[{category}]</span>
      </div>
      <div className={`grid w-fit grid-cols-2 gap-x-4`}>
        {[
          { title: "Value", value: `${value ?? 5} GP` },
          { title: "Weight", value: `${weight.toFixed(2)} lb` },
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
    </>
  );
};
