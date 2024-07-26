import { create } from "zustand";
import { ALCHEMY_RECIPE_MAP } from "@/resources";

type AlchemyPanelState = {
  selectedRecipeId: string | null;
  setSelectedRecipeId: (recipeId: string) => void;

  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;

  selectedReagentId: string | null;
  setSelectedReagentId: (reagentId: string | null) => void;
};

const useAlchemyPanelStore = create<AlchemyPanelState>()((set, get) => ({
  ingredients: [],
  selectedRecipeId: null,
  selectedReagentId: null,
  setSelectedRecipeId: (selectedRecipeId) => {
    const recipe = ALCHEMY_RECIPE_MAP.get(selectedRecipeId);

    if (!recipe) throw new Error(`Invalid Recipe ID: ${selectedRecipeId}`);

    set({
      selectedRecipeId,
      selectedReagentId: null,
      ingredients: [...recipe.multiComponentList, ...recipe.componentList],
    });
  },
  setSelectedReagentId: (selectedPotionId) =>
    set({
      selectedReagentId: selectedPotionId,
    }),
  addIngredient: (ingredientId) =>
    set({
      selectedRecipeId: null,
      ingredients: [...new Set([ingredientId, ...get().ingredients])],
    }),
  removeIngredient: (ingredientId) =>
    set({
      selectedRecipeId: null,
      ingredients: get().ingredients.filter(
        (reagentId) => reagentId !== ingredientId,
      ),
    }),
  setIngredients: (ingredients) => set({ ingredients }),
}));

export const useAlchemyPanel = () => useAlchemyPanelStore((store) => store);
