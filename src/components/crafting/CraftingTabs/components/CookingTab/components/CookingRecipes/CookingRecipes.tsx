import { FOOD_MAP, FOOD_RECIPE_LIST } from "@/resources";
import { GenericList, GenericListItemProps } from "@/components/generic";
import { Selection } from "react-aria-components";
import { useCookingPanel } from "@/stores";

const RECIPE_SELECTION_LIST_ITEMS: GenericListItemProps[] =
  FOOD_RECIPE_LIST.map(({ id, yields }) => {
    const food = FOOD_MAP.get(yields[0]);

    if (!food) throw new Error(`Missing Food for Recipe: ${id}`);

    return {
      id,
      title: food.title,
      textValue: food.title,
    };
  }).sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

export const CookingRecipes = () => {
  const { selectedRecipeId, setSelectedRecipeId, setSelectedFoodId } =
    useCookingPanel();

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      throw new Error(`Invalid Recipe Selection: ${selection}`);
    }

    setSelectedRecipeId(selection.values().next().value);
  };

  const handleClearFoodSelection = () => setSelectedFoodId(null);

  return (
    <GenericList
      aria-label={"Food recipe selection list"}
      disallowEmptySelection
      selectionMode="single"
      shouldFocusWrap
      onFocus={handleClearFoodSelection}
      className={`flex-[3]`}
      containerClassName={`bg-brown md:overflow-y-auto`}
      selectedKeys={selectedRecipeId ? [selectedRecipeId] : []}
      onSelectionChange={handleSelectionChange}
      title={"Recipes"}
      items={RECIPE_SELECTION_LIST_ITEMS}
    />
  );
};
