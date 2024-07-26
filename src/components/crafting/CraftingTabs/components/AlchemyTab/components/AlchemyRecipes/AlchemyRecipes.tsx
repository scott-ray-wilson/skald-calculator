import { ALCHEMY_RECIPE_LIST, CONSUMABLE_MAP } from "@/resources";
import { GenericList, GenericListItemProps } from "@/components/generic";
import { Selection } from "react-aria-components";
import { useAlchemyPanel } from "@/stores";

const RECIPE_SELECTION_LIST_ITEMS: GenericListItemProps[] =
  ALCHEMY_RECIPE_LIST.map(({ id, yields }) => {
    const potion = CONSUMABLE_MAP.get(yields[0]);

    if (!potion) throw new Error(`Missing Consumable for Recipe: ${id}`);

    return {
      id,
      title: potion.title,
      textValue: potion.title,
    };
  }).sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

export const AlchemyRecipes = () => {
  const { selectedRecipeId, setSelectedRecipeId, setSelectedReagentId } =
    useAlchemyPanel();

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      throw new Error(`Invalid Recipe Selection: ${selection}`);
    }

    setSelectedRecipeId(selection.values().next().value);
  };

  const handleClearPotionSelection = () => setSelectedReagentId(null);

  return (
    <GenericList
      aria-label={"Alchemy recipe selection list"}
      disallowEmptySelection
      selectionMode="single"
      shouldFocusWrap
      onFocus={handleClearPotionSelection}
      className={`flex-[3]`}
      containerClassName={`bg-brown md:overflow-y-auto`}
      selectedKeys={selectedRecipeId ? [selectedRecipeId] : []}
      onSelectionChange={handleSelectionChange}
      title={"Recipes"}
      items={RECIPE_SELECTION_LIST_ITEMS}
    />
  );
};
