import Oven from "@/assets/sprites/props/OvenRed.png";
import { useCookingPanel } from "@/stores";
import { CraftingWorkstation } from "@/components/crafting";

export const CookingWorkstation = () => {
  const {
    ingredients,
    setIngredients,
    selectedFoodId,
    setSelectedFoodId,
    removeIngredient,
  } = useCookingPanel();

  const handleClearIngredients = () => setIngredients([]);

  return (
    <CraftingWorkstation
      selectedIngredientId={selectedFoodId}
      ingredients={ingredients}
      onSelectIngredient={setSelectedFoodId}
      onClearIngredients={handleClearIngredients}
      onRemoveIngredient={removeIngredient}
      workstationImagePath={Oven}
    />
  );
};
