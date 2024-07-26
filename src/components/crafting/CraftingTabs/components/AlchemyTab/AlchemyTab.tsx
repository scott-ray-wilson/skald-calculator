import { DescriptionContainer, PanelContainer } from "@/components/generic";
import { useAlchemyPanel } from "@/stores";

import { REAGENT_MAP } from "@/resources";
import {
  AlchemyInventory,
  AlchemyRecipes,
  AlchemyWorkstation,
  RecipeDescription,
} from "@/components/crafting";
import { ConsumableDescription, ReagentDescription } from "@/components/items";

export const AlchemyTab = () => {
  const { selectedReagentId, selectedRecipeId } = useAlchemyPanel();

  return (
    <PanelContainer id={"alchemy"} title={"Crafting: Alchemist's Tools"}>
      <AlchemyRecipes />
      <div className={`flex flex-col gap-1 overflow-hidden`}>
        <AlchemyWorkstation />
        <AlchemyInventory />
      </div>
      <DescriptionContainer className={`flex-[3]`}>
        {selectedReagentId ? (
          REAGENT_MAP.has(selectedReagentId) ? (
            <ReagentDescription reagentId={selectedReagentId} />
          ) : (
            <ConsumableDescription consumableId={selectedReagentId} />
          )
        ) : selectedRecipeId ? (
          <RecipeDescription recipeId={selectedRecipeId} />
        ) : (
          <span className={`mt-4 text-yellow`}>
            Select a Recipe or Reagent Item!
          </span>
        )}
      </DescriptionContainer>
    </PanelContainer>
  );
};
