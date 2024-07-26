import { useCookingPanel } from "@/stores";
import { FOOD_LIST } from "@/resources";
import { InventoryList } from "@/components/generic";

export const CookingInventory = () => {
  const { ingredients, addIngredient, setSelectedFoodId, selectedFoodId } =
    useCookingPanel();

  return (
    <InventoryList
      selectedInventoryId={selectedFoodId}
      onSelectItem={setSelectedFoodId}
      onItemAction={addIngredient}
      excludeItems={ingredients}
      inventory={FOOD_LIST}
    />
  );
};
