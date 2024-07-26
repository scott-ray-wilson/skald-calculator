import { create } from "zustand";
import { FOOD_RECIPE_MAP } from "@/resources";

type CookingPanelState = {
  selectedRecipeId: string | null;
  setSelectedRecipeId: (recipeId: string) => void;

  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;

  selectedFoodId: string | null;
  setSelectedFoodId: (foodId: string | null) => void;
};

const useCookingPanelStore = create<CookingPanelState>()((set, get) => ({
  ingredients: [],
  selectedRecipeId: null,
  selectedFoodId: null,
  showDescriptionId: null,
  setSelectedRecipeId: (selectedRecipeId) => {
    const recipe = FOOD_RECIPE_MAP.get(selectedRecipeId);

    if (!recipe) throw new Error(`Invalid Recipe ID: ${selectedRecipeId}`);

    set({
      selectedRecipeId,
      selectedFoodId: null,
      ingredients: [...recipe.multiComponentList, ...recipe.componentList],
    });
  },
  setSelectedFoodId: (selectedFoodId) =>
    set({
      selectedFoodId,
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
        (foodId) => foodId !== ingredientId,
      ),
    }),
  setIngredients: (ingredients) => set({ ingredients }),
}));

export const useCookingPanel = () => useCookingPanelStore((store) => store);
