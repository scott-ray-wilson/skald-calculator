import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { useCookingPanel } from "@/stores";
import {
  CookingInventory,
  CookingRecipes,
  CookingWorkstation,
  RecipeDescription,
} from "@/components/crafting";
import { FoodDescription } from "@/components/items";

export const CookingTab = () => {
  const { selectedFoodId, selectedRecipeId } = useCookingPanel();

  return (
    <PanelContainer id={"cooking"} title={"Crafting: Oven"}>
      <CookingRecipes />
      <div className={`flex flex-col gap-1 overflow-hidden`}>
        <CookingWorkstation />
        <CookingInventory />
      </div>
      <DescriptionContainer className={`flex-[3]`}>
        {selectedFoodId ? (
          <FoodDescription foodId={selectedFoodId} />
        ) : selectedRecipeId ? (
          <RecipeDescription recipeId={selectedRecipeId} />
        ) : (
          <span className={`mt-4 text-yellow`}>
            Select a Recipe or Food Item!
          </span>
        )}
      </DescriptionContainer>
    </PanelContainer>
  );
};
