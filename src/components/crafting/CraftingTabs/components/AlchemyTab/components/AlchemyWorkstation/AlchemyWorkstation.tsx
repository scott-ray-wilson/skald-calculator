import AlchemyTools from "@/assets/sprites/props/AlchemistTools.png";
import { useAlchemyPanel } from "@/stores";
import { CraftingWorkstation } from "@/components/crafting";

export const AlchemyWorkstation = () => {
  const {
    ingredients,
    setIngredients,
    setSelectedReagentId,
    removeIngredient,
    selectedReagentId,
  } = useAlchemyPanel();

  const handleClearIngredients = () => setIngredients([]);

  return (
    <CraftingWorkstation
      selectedIngredientId={selectedReagentId}
      workstationImagePath={AlchemyTools}
      ingredients={ingredients}
      onClearIngredients={handleClearIngredients}
      onRemoveIngredient={removeIngredient}
      onSelectIngredient={setSelectedReagentId}
    />
  );
};
